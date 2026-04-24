-- ============================================================
-- ALYX-APP :: MIGRATION 23 — Module Administration de la sécurité
-- Reproduit la structure Carthago (A.1 → A.4)
--
-- Sections :
--   A.1.1  Gestion des Utilisateurs   → SCR_UTILISATEURS  (GRID)
--   A.1.2  Gestion des Groupes        → SCR_GROUPES       (GRID)
--   A.2.1  Option Régionale           → SCR_OPTION_REGIONALE (GRID)
--   A.2.2  Profils Organisationnels   → SCR_PROFILS_ORG   (GRID)
--   A.2.3  Menu Utilisateurs          → SCR_MENU_UTILISATEURS (GRID)
--   A.2.4  Profils Groupes            → SCR_PROFILS_GROUPES (GRID)
--   A.3    Gestion Mot de Passe       → SCR_MOT_DE_PASSE  (FORM)
--   A.4    Charger sécurité / Cache   → SCR_CHARGER_SECURITE (FORM)
--
-- PostgreSQL 14+  |  Idempotent
-- ============================================================

BEGIN;

-- ============================================================
-- PARTIE 0 : TABLES MÉTIER MANQUANTES
-- ============================================================

-- Groupes/rôles de sécurité
CREATE TABLE IF NOT EXISTS app_group (
    group_id        BIGINT       GENERATED ALWAYS AS IDENTITY
                                 CONSTRAINT pk_app_group PRIMARY KEY,
    group_name      VARCHAR(100) NOT NULL,
    group_code      VARCHAR(50)  NOT NULL,
    parent_group_id BIGINT       REFERENCES app_group(group_id) ON DELETE SET NULL,
    description     VARCHAR(500),
    is_active       CHAR(1)      NOT NULL DEFAULT 'Y',
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    CONSTRAINT uk_app_group_code  UNIQUE (group_code),
    CONSTRAINT ck_app_group_active CHECK (is_active IN ('Y','N'))
);
CREATE INDEX IF NOT EXISTS idx_app_group_code   ON app_group (group_code);
CREATE INDEX IF NOT EXISTS idx_app_group_parent ON app_group (parent_group_id);

-- Options régionales (locale / format)
CREATE TABLE IF NOT EXISTS app_option_regionale (
    option_id           BIGINT       GENERATED ALWAYS AS IDENTITY
                                     CONSTRAINT pk_app_option_regionale PRIMARY KEY,
    nom                 VARCHAR(100) NOT NULL,
    langue              VARCHAR(10)  NOT NULL DEFAULT 'fr',
    format_nombre       VARCHAR(50)  DEFAULT '#,##0.##',
    format_date         VARCHAR(30)  DEFAULT 'dd/MM/yyyy',
    symbole_decimal     CHAR(1)      DEFAULT ',',
    symbole_groupement  CHAR(1)      DEFAULT '.',
    format_horaire      VARCHAR(20)  DEFAULT 'HH:mm:ss',
    timezone            VARCHAR(50)  DEFAULT 'Africa/Tunis',
    is_active           CHAR(1)      NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT ck_app_option_active CHECK (is_active IN ('Y','N'))
);

-- Profils organisationnels
CREATE TABLE IF NOT EXISTS app_profil_organisationnel (
    profil_id           BIGINT       GENERATED ALWAYS AS IDENTITY
                                     CONSTRAINT pk_app_profil_org PRIMARY KEY,
    nom_profil          VARCHAR(100) NOT NULL,
    organization_unit   VARCHAR(100),
    main_entity         VARCHAR(100),
    description         VARCHAR(500),
    is_active           CHAR(1)      NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT ck_app_profil_active CHECK (is_active IN ('Y','N'))
);

-- Profils groupes (habilitation + conditions de connexion)
CREATE TABLE IF NOT EXISTS app_profil_groupe (
    pg_id                   BIGINT      GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_app_profil_groupe PRIMARY KEY,
    nom_profil              VARCHAR(100) NOT NULL,
    group_id                BIGINT       REFERENCES app_group(group_id) ON DELETE SET NULL,
    profil_org_id           BIGINT       REFERENCES app_profil_organisationnel(profil_id) ON DELETE SET NULL,
    option_regionale_id     BIGINT       REFERENCES app_option_regionale(option_id) ON DELETE SET NULL,
    condition_connexion     VARCHAR(200),
    habilitation            VARCHAR(100),
    is_active               CHAR(1)      NOT NULL DEFAULT 'Y',
    created_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    created_by              VARCHAR(50),
    updated_by              VARCHAR(50),
    CONSTRAINT ck_pg_active CHECK (is_active IN ('Y','N'))
);

-- Menu utilisateurs (associations user ↔ menu cases)
CREATE TABLE IF NOT EXISTS app_user_menu (
    user_menu_id    BIGINT  GENERATED ALWAYS AS IDENTITY
                            CONSTRAINT pk_app_user_menu PRIMARY KEY,
    user_id         BIGINT  NOT NULL REFERENCES app_user(user_id)  ON DELETE CASCADE,
    menu_id         BIGINT  NOT NULL REFERENCES app_menu(menu_id)  ON DELETE CASCADE,
    is_enabled      CHAR(1) NOT NULL DEFAULT 'Y',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    CONSTRAINT uk_app_user_menu UNIQUE (user_id, menu_id),
    CONSTRAINT ck_aum_enabled  CHECK (is_enabled IN ('Y','N'))
);
CREATE INDEX IF NOT EXISTS idx_aum_user ON app_user_menu (user_id);
CREATE INDEX IF NOT EXISTS idx_aum_menu ON app_user_menu (menu_id);

-- Lier les utilisateurs aux groupes
CREATE TABLE IF NOT EXISTS app_user_group (
    ug_id       BIGINT  GENERATED ALWAYS AS IDENTITY
                        CONSTRAINT pk_app_user_group PRIMARY KEY,
    user_id     BIGINT  NOT NULL REFERENCES app_user(user_id)  ON DELETE CASCADE,
    group_id    BIGINT  NOT NULL REFERENCES app_group(group_id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50),
    updated_by  VARCHAR(50),
    CONSTRAINT uk_app_user_group UNIQUE (user_id, group_id)
);

-- ============================================================
-- PARTIE 1 : ÉCRANS UI
-- ============================================================

-- ── A.1.1 Gestion des Utilisateurs ──────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_UTILISATEURS',
    'Gestion des Utilisateurs',
    'Création, modification et désactivation des comptes utilisateurs',
    'GRID',
    '/api/v1/admin/utilisateurs',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title              = EXCLUDED.title,
        description        = EXCLUDED.description,
        template_type      = EXCLUDED.template_type,
        api_base_url       = EXCLUDED.api_base_url,
        updated_at         = NOW(),
        updated_by         = 'migration_23';

-- ── A.1.2 Gestion des Groupes ───────────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_GROUPES',
    'Gestion des Groupes',
    'Création et gestion des groupes / rôles applicatifs',
    'GRID',
    '/api/v1/admin/groupes',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title       = EXCLUDED.title,
        description = EXCLUDED.description,
        api_base_url= EXCLUDED.api_base_url,
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.2.1 Option Régionale ──────────────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_OPTION_REGIONALE',
    'Option Régionale',
    'Paramétrage des formats régionaux (langue, date, nombre)',
    'GRID',
    '/api/v1/admin/options-regionales',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title       = EXCLUDED.title,
        description = EXCLUDED.description,
        api_base_url= EXCLUDED.api_base_url,
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.2.2 Profils Organisationnels ──────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_PROFILS_ORG',
    'Profils Organisationnels',
    'Définition des profils d''organisation hiérarchique',
    'GRID',
    '/api/v1/admin/profils-org',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title       = EXCLUDED.title,
        description = EXCLUDED.description,
        api_base_url= EXCLUDED.api_base_url,
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.2.3 Menu Utilisateurs ─────────────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_MENU_UTILISATEURS',
    'Menu Utilisateurs',
    'Attribution des cas d''utilisation (menus) aux utilisateurs',
    'GRID',
    '/api/v1/admin/menu-utilisateurs',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title       = EXCLUDED.title,
        description = EXCLUDED.description,
        api_base_url= EXCLUDED.api_base_url,
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.2.4 Profils Groupes ───────────────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_PROFILS_GROUPES',
    'Gestion des Profils Groupes',
    'Paramétrage des conditions de connexion, habilitations et profils par groupe',
    'GRID',
    '/api/v1/admin/profils-groupes',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title       = EXCLUDED.title,
        description = EXCLUDED.description,
        api_base_url= EXCLUDED.api_base_url,
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.3 Gestion Mot de Passe ────────────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_MOT_DE_PASSE',
    'Gestion Mot de Passe',
    'Réinitialisation et changement du mot de passe utilisateur',
    'FORM',
    '/api/v1/admin/mot-de-passe',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title       = EXCLUDED.title,
        description = EXCLUDED.description,
        api_base_url= EXCLUDED.api_base_url,
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.4 Charger sécurité / Vider Cache ─────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
) VALUES (
    'SCR_CHARGER_SECURITE',
    'Charger sécurité / Vider Cache',
    'Rechargement du cache de sécurité et vidage du cache applicatif',
    'FORM',
    '/api/v1/admin/cache',
    'LABEL_ON_TOP', 'TOP', 'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title       = EXCLUDED.title,
        description = EXCLUDED.description,
        api_base_url= EXCLUDED.api_base_url,
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ============================================================
-- PARTIE 2 : COMPOSANTS UI
-- ============================================================

DO $$
DECLARE
    scr_id BIGINT;
BEGIN

-- ── A.1.1 : SCR_UTILISATEURS ─────────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_UTILISATEURS';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'userId',      'ID',              'NUMBER',   NULL,NULL,'N','Y','N','Y','N','N',  10,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'login',       'Login',           'TEXT',     'Identifiant',NULL,'Y','N','Y','Y','Y','Y',  20,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nom',         'Nom',             'TEXT',     NULL,NULL,'Y','N','Y','Y','Y','Y',  30,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'prenom',      'Prénom',          'TEXT',     NULL,NULL,'Y','N','Y','Y','Y','Y',  40,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'email',       'Email',           'TEXT',     NULL,NULL,'Y','N','Y','N','Y','Y',  50,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'groupeRole',  'Groupe / Rôle',   'SELECT',   NULL,NULL,'Y','N','Y','N','Y','Y',  60,3,
    '/api/v1/admin/groupes',NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'motDePasse',  'Mot de passe',    'PASSWORD', NULL,NULL,'Y','N','N','N','N','N',  70,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'isActive',    'Actif',           'BADGE',    NULL,'Y','N','N','Y','N','Y','Y',   80,3,
    NULL,'{"options":[{"value":"Y","label":"Actif","color":"green"},{"value":"N","label":"Inactif","color":"red"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'createdAt',   'Date création',   'DATE',     NULL,NULL,'N','Y','Y','Y','N','Y',  90,3,NULL,NULL,NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'new',      'Nouveau',   'MAIN','BUTTON','POST','/api/v1/admin/utilisateurs',      'Y','N','N',NULL,          'indigo',1,NOW(),NOW(),'system','system'),
(scr_id,'edit',     'Modifier',  'GRID','BUTTON','PUT', '/api/v1/admin/utilisateurs/{id}', 'Y','Y','N',NULL,          'blue',  2,NOW(),NOW(),'system','system'),
(scr_id,'activate', 'Activer',   'GRID','BUTTON','POST','/api/v1/admin/utilisateurs/{id}/activate','Y','N','Y','Activer ce compte ?','green',3,NOW(),NOW(),'system','system'),
(scr_id,'deactivate','Désactiver','GRID','BUTTON','POST','/api/v1/admin/utilisateurs/{id}/deactivate','Y','N','Y','Désactiver ce compte ?','amber',4,NOW(),NOW(),'system','system'),
(scr_id,'resetPwd', 'Réinit. MDP','GRID','BUTTON','POST','/api/v1/admin/utilisateurs/{id}/reset-password','Y','N','Y','Réinitialiser le mot de passe ?','orange',5,NOW(),NOW(),'system','system'),
(scr_id,'delete',   'Supprimer', 'GRID','BUTTON','DELETE','/api/v1/admin/utilisateurs/{id}','Y','N','Y','Supprimer cet utilisateur ?','red',6,NOW(),NOW(),'system','system');

-- ── A.1.2 : SCR_GROUPES ──────────────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_GROUPES';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'groupId',       'ID',                'NUMBER',NULL,NULL,'N','Y','N','Y','N','N',  10,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'groupCode',     'Code',              'TEXT',  'CODE_GROUPE',NULL,'Y','N','Y','Y','Y','Y',20,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'groupName',     'Nom Groupe / Rôle', 'TEXT',  NULL,NULL,'Y','N','Y','Y','Y','Y',  30,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'groupeParent',  'Groupe parent',     'SELECT',NULL,NULL,'N','N','Y','N','Y','Y',  40,3,
    '/api/v1/admin/groupes',NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'description',   'Description',       'TEXT',  NULL,NULL,'N','N','Y','N','N','Y',  50,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'isActive',      'Actif',             'BADGE', NULL,'Y','N','N','Y','N','Y','Y',   60,3,
    NULL,'{"options":[{"value":"Y","label":"Actif","color":"green"},{"value":"N","label":"Inactif","color":"red"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'new',    'Nouveau',   'MAIN','BUTTON','POST',  '/api/v1/admin/groupes',      'Y','N','N',NULL,                 'indigo',1,NOW(),NOW(),'system','system'),
(scr_id,'edit',   'Modifier',  'GRID','BUTTON','PUT',   '/api/v1/admin/groupes/{id}', 'Y','Y','N',NULL,                 'blue',  2,NOW(),NOW(),'system','system'),
(scr_id,'delete', 'Supprimer', 'GRID','BUTTON','DELETE','/api/v1/admin/groupes/{id}', 'Y','N','Y','Supprimer ce groupe ?','red',3,NOW(),NOW(),'system','system');

-- ── A.2.1 : SCR_OPTION_REGIONALE ─────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_OPTION_REGIONALE';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'optionId',         'ID',                    'NUMBER',NULL,NULL,'N','Y','N','N','N','N',   10,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nom',              'Nom',                   'TEXT',  NULL,NULL,'Y','N','Y','Y','Y','Y',   20,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'langue',           'Langue',                'SELECT',NULL,'fr','Y','N','Y','N','Y','Y',   30,3,
    NULL,'{"options":[{"value":"fr","label":"Français"},{"value":"en","label":"English"},{"value":"ar","label":"العربية"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'formatNombre',     'Format Nombre',         'TEXT',  '#,##0.##','#,##0.##','N','N','Y','N','N','Y',  40,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'formatDate',       'Format Date',           'SELECT',NULL,'dd/MM/yyyy','N','N','Y','N','N','Y',50,3,
    NULL,'{"options":[{"value":"dd/MM/yyyy","label":"JJ/MM/AAAA"},{"value":"MM/dd/yyyy","label":"MM/JJ/AAAA"},{"value":"yyyy-MM-dd","label":"AAAA-MM-JJ"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'symboleDecimal',   'Symbole Décimal',       'SELECT',NULL,',','N','N','Y','N','N','Y',   60,3,
    NULL,'{"options":[{"value":",","label":", (virgule)"},{"value":".","label":". (point)"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'symboleGroupement','Symbole Regroupement',  'SELECT',NULL,'.','N','N','Y','N','N','Y',   70,3,
    NULL,'{"options":[{"value":".","label":". (point)"},{"value":",","label":", (virgule)"},{"value":" ","label":"(espace)"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'formatHoraire',    'Format Horaire',        'SELECT',NULL,'HH:mm:ss','N','N','Y','N','N','Y',80,3,
    NULL,'{"options":[{"value":"HH:mm:ss","label":"HH:mm:ss (24h)"},{"value":"hh:mm:ss a","label":"hh:mm:ss AM/PM"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'timezone',         'Fuseau horaire',        'SELECT',NULL,'Africa/Tunis','N','N','Y','N','N','Y',90,3,
    NULL,'{"options":[{"value":"Africa/Tunis","label":"Tunis (UTC+1)"},{"value":"Africa/Abidjan","label":"Abidjan (UTC)"},{"value":"Europe/Paris","label":"Paris (UTC+1/+2)"},{"value":"UTC","label":"UTC"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'isActive',         'Actif',                 'BADGE', NULL,'Y','N','N','Y','N','Y','Y',  100,3,
    NULL,'{"options":[{"value":"Y","label":"Actif","color":"green"},{"value":"N","label":"Inactif","color":"red"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'new',   'Nouveau',   'MAIN','BUTTON','POST',  '/api/v1/admin/options-regionales',      'Y','N','N',NULL,                         'indigo',1,NOW(),NOW(),'system','system'),
(scr_id,'edit',  'Modifier',  'GRID','BUTTON','PUT',   '/api/v1/admin/options-regionales/{id}', 'Y','Y','N',NULL,                         'blue',  2,NOW(),NOW(),'system','system'),
(scr_id,'delete','Supprimer', 'GRID','BUTTON','DELETE','/api/v1/admin/options-regionales/{id}', 'Y','N','Y','Supprimer cette option régionale ?','red',3,NOW(),NOW(),'system','system');

-- ── A.2.2 : SCR_PROFILS_ORG ──────────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_PROFILS_ORG';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'profilId',        'ID',                     'NUMBER',NULL,NULL,'N','Y','N','N','N','N',  10,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nomProfil',       'Nom Profil',             'TEXT',  NULL,NULL,'Y','N','Y','Y','Y','Y',  20,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'organizationUnit','Organization Unit',      'TEXT',  NULL,NULL,'N','N','Y','Y','Y','Y',  30,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'mainEntity',      'Main Entity',            'TEXT',  NULL,NULL,'N','N','Y','N','Y','Y',  40,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'description',     'Description',            'TEXT',  NULL,NULL,'N','N','Y','N','N','Y',  50,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'isActive',        'Actif',                  'BADGE', NULL,'Y','N','N','Y','N','Y','Y',   60,3,
    NULL,'{"options":[{"value":"Y","label":"Actif","color":"green"},{"value":"N","label":"Inactif","color":"red"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'new',   'Nouveau',   'MAIN','BUTTON','POST',  '/api/v1/admin/profils-org',      'Y','N','N',NULL,                            'indigo',1,NOW(),NOW(),'system','system'),
(scr_id,'edit',  'Modifier',  'GRID','BUTTON','PUT',   '/api/v1/admin/profils-org/{id}', 'Y','Y','N',NULL,                            'blue',  2,NOW(),NOW(),'system','system'),
(scr_id,'delete','Supprimer', 'GRID','BUTTON','DELETE','/api/v1/admin/profils-org/{id}', 'Y','N','Y','Supprimer ce profil organisationnel ?','red',3,NOW(),NOW(),'system','system');

-- ── A.2.3 : SCR_MENU_UTILISATEURS ────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_MENU_UTILISATEURS';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'userId',      'ID Utilisateur', 'NUMBER', NULL,NULL,'N','Y','N','N','N','N',  10,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'login',       'Identifiant',    'TEXT',   NULL,NULL,'Y','Y','Y','Y','Y','Y',  20,6,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'menuCode',    'Code Menu',      'TEXT',   NULL,NULL,'N','Y','Y','Y','Y','Y',  30,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'menuLabel',   'Libellé Menu',   'TEXT',   NULL,NULL,'N','Y','Y','N','N','Y',  40,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'menuPath',    'Chemin',         'TEXT',   NULL,NULL,'N','Y','Y','N','N','Y',  50,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'isEnabled',   'Activé',         'BADGE',  NULL,'Y','N','N','Y','N','Y','Y',   60,3,
    NULL,'{"options":[{"value":"Y","label":"Activé","color":"green"},{"value":"N","label":"Désactivé","color":"slate"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'enable',  'Activer',   'GRID','BUTTON','POST','/api/v1/admin/menu-utilisateurs/{userId}/enable/{menuId}',  'Y','N','N',NULL,'green',1,NOW(),NOW(),'system','system'),
(scr_id,'disable', 'Désactiver','GRID','BUTTON','POST','/api/v1/admin/menu-utilisateurs/{userId}/disable/{menuId}', 'Y','N','N',NULL,'amber',2,NOW(),NOW(),'system','system'),
(scr_id,'saveAll', 'Enregistrer tout','MAIN','BUTTON','POST','/api/v1/admin/menu-utilisateurs/save',              'Y','N','N',NULL,'indigo',3,NOW(),NOW(),'system','system');

-- ── A.2.4 : SCR_PROFILS_GROUPES ──────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_PROFILS_GROUPES';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'pgId',              'ID',                    'NUMBER',NULL,NULL,'N','Y','N','N','N','N',   10,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nomProfil',         'Nom Profil',            'TEXT',  NULL,NULL,'Y','N','Y','Y','Y','Y',   20,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'groupe',            'Groupe',                'SELECT',NULL,NULL,'Y','N','Y','N','Y','Y',   30,3,
    '/api/v1/admin/groupes',NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'conditionConnexion','Condition connexion',   'TEXT',  NULL,NULL,'N','N','Y','N','N','Y',   40,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'isActive',          'Actif',                 'BADGE', NULL,'Y','N','N','Y','N','Y','Y',    50,3,
    NULL,'{"options":[{"value":"Y","label":"Actif","color":"green"},{"value":"N","label":"Inactif","color":"red"}]}'::jsonb,
    NULL,NOW(),NOW(),'system','system'),
(scr_id,'profilOrg',         'Profil Organisation',   'SELECT',NULL,NULL,'N','N','Y','N','Y','Y',   60,3,
    '/api/v1/admin/profils-org',NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'optionRegionale',   'Option Régionale',      'SELECT',NULL,NULL,'N','N','Y','N','Y','Y',   70,3,
    '/api/v1/admin/options-regionales',NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'habilitation',      'Habilitation',          'TEXT',  NULL,NULL,'N','N','Y','N','Y','Y',   80,3,NULL,NULL,NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'new',   'Nouveau',   'MAIN','BUTTON','POST',  '/api/v1/admin/profils-groupes',      'Y','N','N',NULL,                         'indigo',1,NOW(),NOW(),'system','system'),
(scr_id,'edit',  'Modifier',  'GRID','BUTTON','PUT',   '/api/v1/admin/profils-groupes/{id}', 'Y','Y','N',NULL,                         'blue',  2,NOW(),NOW(),'system','system'),
(scr_id,'delete','Supprimer', 'GRID','BUTTON','DELETE','/api/v1/admin/profils-groupes/{id}', 'Y','N','Y','Supprimer ce profil groupe ?','red',3,NOW(),NOW(),'system','system');

-- ── A.3 : SCR_MOT_DE_PASSE ───────────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_MOT_DE_PASSE';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
-- Section identification
(scr_id,'sec_id',       'Identification',         'GROUP',    NULL,NULL,'N','N','Y','N','N','N',  10,12,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nomUtilisateur','Nom utilisateur',        'AUTOCOMPLETE',NULL,NULL,'Y','N','Y','N','N','N', 20,6,
    '/api/v1/admin/utilisateurs/search',NULL,NULL,NOW(),NOW(),'system','system'),

-- Section mot de passe
(scr_id,'sec_pwd',      'Nouveau mot de passe',   'GROUP',    NULL,NULL,'N','N','Y','N','N','N',  30,12,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nouveauMdp',   'Nouveau mot de passe',   'PASSWORD', NULL,NULL,'Y','N','Y','N','N','N',  40,6,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'confirmerMdp', 'Confirmer nouveau MDP',  'PASSWORD', NULL,NULL,'Y','N','Y','N','N','N',  50,6,NULL,NULL,NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'changer','Changer',  'MAIN','BUTTON','POST','/api/v1/admin/mot-de-passe/changer',      'Y','Y','Y','Changer le mot de passe ?','indigo',1,NOW(),NOW(),'system','system'),
(scr_id,'reinit', 'Réinitialiser','MAIN','BUTTON','POST','/api/v1/admin/mot-de-passe/reinitialiser','Y','N','Y','Réinitialiser au mot de passe par défaut ?','amber',2,NOW(),NOW(),'system','system');

-- ── A.4 : SCR_CHARGER_SECURITE ───────────────────────────────
SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_CHARGER_SECURITE';
DELETE FROM ui_component WHERE screen_id = scr_id;
DELETE FROM ui_action    WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'sec_cache',     'Gestion du cache',       'GROUP',NULL,NULL,'N','N','Y','N','N','N',10,12,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'cacheStatus',   'Statut du cache',        'TEXT', NULL,NULL,'N','Y','Y','N','N','N',20,6,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'lastReloadDate','Dernier rechargement',   'DATE', NULL,NULL,'N','Y','Y','N','N','N',30,6,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nbUsersLoaded', 'Utilisateurs chargés',   'NUMBER',NULL,NULL,'N','Y','Y','N','N','N',40,3,NULL,NULL,NULL,NOW(),NOW(),'system','system'),
(scr_id,'nbGroupsLoaded','Groupes chargés',        'NUMBER',NULL,NULL,'N','Y','Y','N','N','N',50,3,NULL,NULL,NULL,NOW(),NOW(),'system','system');

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id,'charger', 'Charger sécurité', 'MAIN','BUTTON','POST','/api/v1/admin/cache/charger-securite','Y','N','Y','Recharger le cache de sécurité ?','indigo',1,NOW(),NOW(),'system','system'),
(scr_id,'vider',   'Vider le cache',   'MAIN','BUTTON','POST','/api/v1/admin/cache/vider',           'Y','N','Y','Vider entièrement le cache applicatif ?','red',   2,NOW(),NOW(),'system','system');

RAISE NOTICE 'Composants UI créés pour tous les écrans d''administration';
END $$;

-- ============================================================
-- PARTIE 3 : RESTRUCTURATION DU MENU ADMINISTRATION
-- ============================================================

-- Supprimer l'ancien sous-arbre Administration pour tout reconstruire proprement
DELETE FROM app_menu WHERE code IN (
    'MNU_ADMIN_ACCES',
    'MNU_UTILISATEURS_ADMIN', 'MNU_GROUPES',
    'MNU_ADMIN_PARAMS',
    'MNU_OPTION_REGIONALE', 'MNU_PROFILS_ORG',
    'MNU_MENU_UTILISATEURS', 'MNU_PROFILS_GROUPES',
    'MNU_MOT_DE_PASSE',
    'MNU_CHARGER_SECURITE'
);

-- Rétablir le menu Administration si absent
INSERT INTO app_menu (
    code, label, icon, route, screen_code, display_order,
    is_active, role_required,
    created_at, updated_at, created_by, updated_by
) VALUES (
    'MNU_ADMINISTRATION', 'Administration de la sécurité',
    'shield-check', NULL, NULL, 99,
    'Y', 'ROLE_ADMIN',
    NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET label        = EXCLUDED.label,
        icon         = EXCLUDED.icon,
        display_order= EXCLUDED.display_order,
        updated_at   = NOW(),
        updated_by   = 'migration_23';

-- ── A.1 : Gestion de l'accès (groupe) ───────────────────────
INSERT INTO app_menu (
    code, label, icon, route, screen_code, display_order,
    is_active, role_required, parent_id,
    created_at, updated_at, created_by, updated_by
) VALUES (
    'MNU_ADMIN_ACCES', 'Gestion de l''accès',
    'users', NULL, NULL, 1,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
    NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET label      = EXCLUDED.label,
        parent_id  = (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
        updated_at = NOW(),
        updated_by = 'migration_23';

INSERT INTO app_menu (
    code, label, icon, route, screen_code, display_order,
    is_active, role_required, parent_id,
    created_at, updated_at, created_by, updated_by
) VALUES
(
    'MNU_UTILISATEURS', 'Gestion des Utilisateurs',
    'user', '/admin/utilisateurs', 'SCR_UTILISATEURS', 1,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_ACCES'),
    NOW(), NOW(), 'system', 'system'
),
(
    'MNU_GROUPES', 'Gestion des Groupes',
    'user-group', '/admin/groupes', 'SCR_GROUPES', 2,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_ACCES'),
    NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET label      = EXCLUDED.label,
        icon       = EXCLUDED.icon,
        route      = EXCLUDED.route,
        screen_code= EXCLUDED.screen_code,
        parent_id  = (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_ACCES'),
        updated_at = NOW(),
        updated_by = 'migration_23';

-- ── A.2 : Paramètres de sécurité (groupe) ───────────────────
INSERT INTO app_menu (
    code, label, icon, route, screen_code, display_order,
    is_active, role_required, parent_id,
    created_at, updated_at, created_by, updated_by
) VALUES (
    'MNU_ADMIN_PARAMS', 'Paramètres de sécurité',
    'cog-6-tooth', NULL, NULL, 2,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
    NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET label      = EXCLUDED.label,
        parent_id  = (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
        updated_at = NOW(),
        updated_by = 'migration_23';

INSERT INTO app_menu (
    code, label, icon, route, screen_code, display_order,
    is_active, role_required, parent_id,
    created_at, updated_at, created_by, updated_by
) VALUES
(
    'MNU_OPTION_REGIONALE', 'Option Régionale',
    'globe-alt', '/admin/options-regionales', 'SCR_OPTION_REGIONALE', 1,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_PARAMS'),
    NOW(), NOW(), 'system', 'system'
),
(
    'MNU_PROFILS_ORG', 'Profils Organisationnels',
    'building-office', '/admin/profils-org', 'SCR_PROFILS_ORG', 2,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_PARAMS'),
    NOW(), NOW(), 'system', 'system'
),
(
    'MNU_MENU_UTILISATEURS', 'Menu Utilisateurs',
    'squares-2x2', '/admin/menu-utilisateurs', 'SCR_MENU_UTILISATEURS', 3,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_PARAMS'),
    NOW(), NOW(), 'system', 'system'
),
(
    'MNU_PROFILS_GROUPES', 'Profils Groupes',
    'identification', '/admin/profils-groupes', 'SCR_PROFILS_GROUPES', 4,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_PARAMS'),
    NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET label       = EXCLUDED.label,
        icon        = EXCLUDED.icon,
        route       = EXCLUDED.route,
        screen_code = EXCLUDED.screen_code,
        parent_id   = (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMIN_PARAMS'),
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.3 : Gestion Mot de Passe ──────────────────────────────
INSERT INTO app_menu (
    code, label, icon, route, screen_code, display_order,
    is_active, role_required, parent_id,
    created_at, updated_at, created_by, updated_by
) VALUES (
    'MNU_MOT_DE_PASSE', 'Gestion Mot de Passe',
    'key', '/admin/mot-de-passe', 'SCR_MOT_DE_PASSE', 3,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
    NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET label       = EXCLUDED.label,
        icon        = EXCLUDED.icon,
        route       = EXCLUDED.route,
        screen_code = EXCLUDED.screen_code,
        parent_id   = (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ── A.4 : Charger sécurité / Vider Cache ────────────────────
INSERT INTO app_menu (
    code, label, icon, route, screen_code, display_order,
    is_active, role_required, parent_id,
    created_at, updated_at, created_by, updated_by
) VALUES (
    'MNU_CHARGER_SECURITE', 'Charger sécurité / Vider Cache',
    'arrow-path', '/admin/cache', 'SCR_CHARGER_SECURITE', 4,
    'Y', 'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
    NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET label       = EXCLUDED.label,
        icon        = EXCLUDED.icon,
        route       = EXCLUDED.route,
        screen_code = EXCLUDED.screen_code,
        parent_id   = (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
        updated_at  = NOW(),
        updated_by  = 'migration_23';

-- ============================================================
-- PARTIE 4 : DONNÉES DE RÉFÉRENCE
-- ============================================================

-- Groupes de base
INSERT INTO app_group (group_code, group_name, description, is_active) VALUES
    ('GRP_ADMIN',       'Administrateurs',         'Accès complet à toutes les fonctionnalités', 'Y'),
    ('GRP_TRADERS',     'Traders',                 'Saisie et validation des transactions',      'Y'),
    ('GRP_ANALYSTES',   'Analystes Financiers',    'Consultation et analyse des données',        'Y'),
    ('GRP_GESTIONNAIRE','Gestionnaires',            'Gestion du référentiel et des comptes',      'Y'),
    ('GRP_READONLY',    'Lecture seule',            'Consultation uniquement',                    'Y')
ON CONFLICT (group_code) DO NOTHING;

-- Option régionale par défaut
INSERT INTO app_option_regionale (
    nom, langue, format_nombre, format_date,
    symbole_decimal, symbole_groupement, format_horaire, timezone, is_active
) VALUES
    ('France / Tunisie', 'fr', '#,##0.##', 'dd/MM/yyyy', ',', '.', 'HH:mm:ss', 'Africa/Tunis',  'Y'),
    ('International',    'en', '#,##0.##', 'MM/dd/yyyy', '.', ',', 'HH:mm:ss', 'UTC',           'Y'),
    ('Afrique BRVM',     'fr', '#,##0.##', 'dd/MM/yyyy', ',', '.', 'HH:mm:ss', 'Africa/Abidjan','Y')
ON CONFLICT DO NOTHING;

-- Profil organisationnel par défaut
INSERT INTO app_profil_organisationnel (nom_profil, organization_unit, main_entity, is_active) VALUES
    ('Siège Social',     'SIEGE',   'ENTITY_PRINCIPALE', 'Y'),
    ('Direction Générale','DG',     'ENTITY_PRINCIPALE', 'Y'),
    ('Département IT',   'DSI',     'ENTITY_PRINCIPALE', 'Y')
ON CONFLICT DO NOTHING;

-- ============================================================
-- PARTIE 5 : ROUTES ANGULAR (référence)
-- Les routes Angular doivent référencer ces URL :
--   /admin/utilisateurs      → SCR_UTILISATEURS
--   /admin/groupes           → SCR_GROUPES
--   /admin/options-regionales→ SCR_OPTION_REGIONALE
--   /admin/profils-org       → SCR_PROFILS_ORG
--   /admin/menu-utilisateurs → SCR_MENU_UTILISATEURS
--   /admin/profils-groupes   → SCR_PROFILS_GROUPES
--   /admin/mot-de-passe      → SCR_MOT_DE_PASSE
--   /admin/cache             → SCR_CHARGER_SECURITE
-- ============================================================

-- ============================================================
-- PARTIE 6 : VÉRIFICATION
-- ============================================================

SELECT
    s.code,
    s.title,
    s.template_type,
    COUNT(DISTINCT c.component_id) AS nb_champs,
    COUNT(DISTINCT a.action_id)    AS nb_actions
FROM ui_screen s
LEFT JOIN ui_component c ON c.screen_id = s.screen_id
LEFT JOIN ui_action    a ON a.screen_id = s.screen_id
WHERE s.code IN (
    'SCR_UTILISATEURS','SCR_GROUPES',
    'SCR_OPTION_REGIONALE','SCR_PROFILS_ORG',
    'SCR_MENU_UTILISATEURS','SCR_PROFILS_GROUPES',
    'SCR_MOT_DE_PASSE','SCR_CHARGER_SECURITE'
)
GROUP BY s.screen_id, s.code, s.title, s.template_type
ORDER BY s.code;

WITH RECURSIVE tree AS (
    SELECT menu_id, code, label, parent_id, display_order, 0 AS lvl
    FROM   app_menu WHERE parent_id IS NULL AND code = 'MNU_ADMINISTRATION'
    UNION ALL
    SELECT m.menu_id, m.code, m.label, m.parent_id, m.display_order, t.lvl+1
    FROM   app_menu m JOIN tree t ON m.parent_id = t.menu_id
)
SELECT REPEAT('  ', lvl) || label AS menu, code FROM tree ORDER BY lvl, display_order;

COMMIT;
