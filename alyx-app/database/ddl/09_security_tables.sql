-- ============================================================
-- ALYX-APP :: TABLES DE SÉCURITÉ / HABILITATIONS
-- app_role, user_role, role_screen_access, user_role_assignment
-- PostgreSQL 14+
-- ============================================================

-- -------------------------------------------------------
-- 1. APP_ROLE — Rôles applicatifs
-- -------------------------------------------------------
CREATE TABLE app_role (
    role_id             BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_app_role PRIMARY KEY,
    role_name           VARCHAR(50)     NOT NULL,
    role_description    VARCHAR(255),
    role_type           VARCHAR(20)     NOT NULL DEFAULT 'CUSTOM',
    is_active           CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT uk_app_role_name  UNIQUE (role_name),
    CONSTRAINT ck_app_role_type  CHECK (role_type IN ('SYSTEM', 'CUSTOM')),
    CONSTRAINT ck_app_role_active CHECK (is_active IN ('Y', 'N'))
);

CREATE INDEX idx_app_role_name   ON app_role (role_name);
CREATE INDEX idx_app_role_active ON app_role (is_active);

CREATE TRIGGER trg_app_role_upd
    BEFORE UPDATE ON app_role
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  app_role                  IS 'Rôles applicatifs granulaires (profils fonctionnels).';
COMMENT ON COLUMN app_role.role_name        IS 'Identifiant unique. Convention: ROLE_<NOM> (ex: ROLE_TRADER)';
COMMENT ON COLUMN app_role.role_type        IS 'SYSTEM=rôle natif non supprimable, CUSTOM=rôle créé par admin';

-- -------------------------------------------------------
-- 2. USER_ROLE — Rôles simples (menu legacy)
-- -------------------------------------------------------
CREATE TABLE user_role (
    role_id             BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_user_role PRIMARY KEY,
    role_name           VARCHAR(50)     NOT NULL,
    role_description    VARCHAR(100)    NOT NULL,
    is_active           CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT uk_user_role_name  UNIQUE (role_name),
    CONSTRAINT ck_user_role_active CHECK (is_active IN ('Y', 'N'))
);

CREATE TRIGGER trg_user_role_upd
    BEFORE UPDATE ON user_role
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE user_role IS 'Table de rôles utilisateur simplifiée pour la navigation par menu.';

-- -------------------------------------------------------
-- 3. ROLE_SCREEN_ACCESS — Accès par rôle à chaque écran
-- -------------------------------------------------------
CREATE TABLE role_screen_access (
    access_id       BIGINT          GENERATED ALWAYS AS IDENTITY
                                    CONSTRAINT pk_role_screen_access PRIMARY KEY,
    role_id         BIGINT          NOT NULL,
    screen_id       BIGINT          NOT NULL,
    access_level    VARCHAR(20)     NOT NULL DEFAULT 'READ',
    is_active       CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    CONSTRAINT fk_rsa_role   FOREIGN KEY (role_id)   REFERENCES app_role(role_id)  ON DELETE CASCADE,
    CONSTRAINT fk_rsa_screen FOREIGN KEY (screen_id) REFERENCES ui_screen(screen_id) ON DELETE CASCADE,
    CONSTRAINT uk_rsa_role_screen UNIQUE (role_id, screen_id),
    CONSTRAINT ck_rsa_access_level CHECK (access_level IN ('READ', 'WRITE', 'DELETE', 'FULL')),
    CONSTRAINT ck_rsa_active        CHECK (is_active IN ('Y', 'N'))
);

CREATE INDEX idx_rsa_role   ON role_screen_access (role_id);
CREATE INDEX idx_rsa_screen ON role_screen_access (screen_id);
CREATE INDEX idx_rsa_active ON role_screen_access (is_active);

CREATE TRIGGER trg_role_screen_access_upd
    BEFORE UPDATE ON role_screen_access
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  role_screen_access             IS 'Matrice d''habilitation rôle×écran.';
COMMENT ON COLUMN role_screen_access.access_level IS 'READ=lecture seule, WRITE=R+écriture, DELETE=R+W+suppression, FULL=tous droits';

-- -------------------------------------------------------
-- 4. USER_ROLE_ASSIGNMENT — Affectation utilisateur→rôle
-- -------------------------------------------------------
CREATE TABLE user_role_assignment (
    assignment_id   BIGINT          GENERATED ALWAYS AS IDENTITY
                                    CONSTRAINT pk_user_role_assignment PRIMARY KEY,
    user_id         BIGINT          NOT NULL,
    role_id         BIGINT          NOT NULL,
    assigned_by     VARCHAR(100),
    assigned_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    CONSTRAINT fk_ura_user FOREIGN KEY (user_id) REFERENCES app_user(user_id)  ON DELETE CASCADE,
    CONSTRAINT fk_ura_role FOREIGN KEY (role_id) REFERENCES app_role(role_id)  ON DELETE CASCADE,
    CONSTRAINT uk_ura_user_role UNIQUE (user_id, role_id)
);

CREATE INDEX idx_ura_user ON user_role_assignment (user_id);
CREATE INDEX idx_ura_role ON user_role_assignment (role_id);

CREATE TRIGGER trg_user_role_assignment_upd
    BEFORE UPDATE ON user_role_assignment
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  user_role_assignment             IS 'Affectation des rôles aux utilisateurs avec traçabilité.';
COMMENT ON COLUMN user_role_assignment.assigned_by IS 'Administrateur ayant effectué l''affectation (domaine métier)';
COMMENT ON COLUMN user_role_assignment.assigned_at IS 'Date d''affectation du rôle (domaine métier)';

-- ============================================================
-- DONNÉES EXEMPLES
-- ============================================================

-- Rôles système
INSERT INTO app_role (role_name, role_description, role_type) VALUES
    ('ROLE_ADMIN',        'Administrateur système — accès complet',            'SYSTEM'),
    ('ROLE_USER',         'Utilisateur standard — consultation uniquement',    'SYSTEM'),
    ('ROLE_TRADER',       'Trader — saisie et validation des opérations',      'CUSTOM'),
    ('ROLE_ANALYSTE',     'Analyste — accès aux tableaux de bord et rapports', 'CUSTOM'),
    ('ROLE_GESTIONNAIRE', 'Gestionnaire de portefeuille — gestion des comptes','CUSTOM')
ON CONFLICT (role_name) DO NOTHING;

-- Rôles user_role (navigation legacy)
INSERT INTO user_role (role_name, role_description) VALUES
    ('ROLE_ADMIN',    'Administrateur'),
    ('ROLE_USER',     'Utilisateur standard'),
    ('ROLE_TRADER',   'Trader BRVM'),
    ('ROLE_ANALYSTE', 'Analyste Financier')
ON CONFLICT (role_name) DO NOTHING;

-- Accès écrans pour ROLE_ADMIN
INSERT INTO role_screen_access (role_id, screen_id, access_level)
SELECT r.role_id, s.screen_id, 'FULL'
FROM app_role r
CROSS JOIN ui_screen s
WHERE r.role_name = 'ROLE_ADMIN'
ON CONFLICT (role_id, screen_id) DO NOTHING;

-- Accès écrans pour ROLE_USER (lecture)
INSERT INTO role_screen_access (role_id, screen_id, access_level)
SELECT r.role_id, s.screen_id, 'READ'
FROM app_role r
CROSS JOIN ui_screen s
WHERE r.role_name = 'ROLE_USER'
  AND s.code IN ('SCR_DASHBOARD_MARCHE', 'SCR_OBLIGATIONS', 'SCR_ACTIONS_BRVM')
ON CONFLICT (role_id, screen_id) DO NOTHING;

-- Accès écrans pour ROLE_TRADER
INSERT INTO role_screen_access (role_id, screen_id, access_level)
SELECT r.role_id, s.screen_id, 'WRITE'
FROM app_role r
CROSS JOIN ui_screen s
WHERE r.role_name = 'ROLE_TRADER'
  AND s.code IN ('SCR_DASHBOARD_MARCHE', 'SCR_OBLIGATIONS', 'SCR_ACTIONS_BRVM')
ON CONFLICT (role_id, screen_id) DO NOTHING;

-- Affectation rôles aux utilisateurs démo
INSERT INTO user_role_assignment (user_id, role_id, assigned_by)
SELECT u.user_id, r.role_id, 'system'
FROM app_user u, app_role r
WHERE (u.username = 'admin'        AND r.role_name IN ('ROLE_ADMIN', 'ROLE_USER'))
   OR (u.username = 'trader'       AND r.role_name IN ('ROLE_TRADER', 'ROLE_USER'))
   OR (u.username = 'analyste'     AND r.role_name IN ('ROLE_ANALYSTE', 'ROLE_USER'))
   OR (u.username = 'gestionnaire' AND r.role_name IN ('ROLE_GESTIONNAIRE', 'ROLE_USER'))
ON CONFLICT (user_id, role_id) DO NOTHING;
