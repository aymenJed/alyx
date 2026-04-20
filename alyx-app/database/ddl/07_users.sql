-- ============================================================
-- 07_users.sql — Table des utilisateurs Alyx
-- ============================================================
CREATE TABLE IF NOT EXISTS app_user (
    user_id     BIGINT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username    VARCHAR(50)     NOT NULL,
    password    VARCHAR(255)    NOT NULL,       -- BCrypt hash strength=12
    full_name   VARCHAR(100)    NOT NULL,
    email       VARCHAR(150),
    roles       VARCHAR(200)    NOT NULL DEFAULT 'ROLE_USER',  -- comma-separated
    is_active   CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50),
    updated_by  VARCHAR(50),
    CONSTRAINT uk_app_user_username UNIQUE (username),
    CONSTRAINT ck_app_user_active   CHECK (is_active IN ('Y', 'N'))
);

CREATE TRIGGER trg_app_user_updated_at
    BEFORE UPDATE ON app_user
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  app_user            IS 'Comptes utilisateurs de l''application. Authentification JWT.';
COMMENT ON COLUMN app_user.username   IS 'Identifiant de connexion unique';
COMMENT ON COLUMN app_user.password   IS 'Hash BCrypt strength=12. Jamais stocké en clair.';
COMMENT ON COLUMN app_user.roles      IS 'Rôles séparés par virgule: ROLE_ADMIN,ROLE_USER';
COMMENT ON COLUMN app_user.is_active  IS 'Y=actif, N=désactivé (soft delete)';
COMMENT ON COLUMN app_user.created_by IS 'Utilisateur ayant créé le compte (audit JPA)';
COMMENT ON COLUMN app_user.updated_by IS 'Dernier utilisateur ayant modifié le compte (audit JPA)';

-- ============================================================
-- Utilisateurs de démonstration
-- Passwords: admin/admin123 | trader+analyste/user123  (BCrypt strength=12)
-- ============================================================
INSERT INTO app_user (username, password, full_name, email, roles) VALUES
(
    'admin',
    '$2a$12$pKlsIrYiZeRyHIbpoyaAi.WjWQuW076Qwg.TJLT4CULdo9aSJ7gK.',
    'Administrateur Système',
    'admin@alyx.umoa',
    'ROLE_ADMIN,ROLE_USER'
),
(
    'trader',
    '$2a$12$jeBXNE6Y4Cmk3.6CrLSR9OhTtkJnNF30hVGZjhCm1WzIvGpfpkN02',
    'Trader BRVM',
    'trader@alyx.umoa',
    'ROLE_USER'
),
(
    'analyste',
    '$2a$12$jeBXNE6Y4Cmk3.6CrLSR9OhTtkJnNF30hVGZjhCm1WzIvGpfpkN02',
    'Analyste Financier',
    'analyste@alyx.umoa',
    'ROLE_USER'
),
(
    'gestionnaire',
    '$2a$12$jeBXNE6Y4Cmk3.6CrLSR9OhTtkJnNF30hVGZjhCm1WzIvGpfpkN02',
    'Gestionnaire de Portefeuille',
    'gestionnaire@alyx.umoa',
    'ROLE_USER'
)
ON CONFLICT (username) DO NOTHING;
