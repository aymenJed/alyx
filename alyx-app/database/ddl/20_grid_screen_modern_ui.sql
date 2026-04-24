-- ============================================================
-- ALYX-APP :: MIGRATION 20 — Support UI Grille Moderne
-- Objectif : aligner le schéma DB sur les entités JPA et fournir
--            des exemples complets pour le nouveau rendu GRID.
--
-- PostgreSQL 14+  |  Idempotent (DO $$ ... IF NOT EXISTS ...)
-- ============================================================

BEGIN;

-- ============================================================
-- PARTIE 1 — COMPLÉTION DES COLONNES MANQUANTES
-- ============================================================

-- ── 1.1  UI_SCREEN : colonnes absentes du DDL d'origine ─────

ALTER TABLE ui_screen
    ADD COLUMN IF NOT EXISTS caption               VARCHAR(200),
    ADD COLUMN IF NOT EXISTS width                 BIGINT,
    ADD COLUMN IF NOT EXISTS height                BIGINT,
    ADD COLUMN IF NOT EXISTS refresh_time          INTEGER,
    ADD COLUMN IF NOT EXISTS server_cache          CHAR(1)  NOT NULL DEFAULT 'N',
    ADD COLUMN IF NOT EXISTS client_cache          CHAR(1)  NOT NULL DEFAULT 'N',
    ADD COLUMN IF NOT EXISTS maximized             CHAR(1)  NOT NULL DEFAULT 'N',
    -- Propriétés EntityInputView
    ADD COLUMN IF NOT EXISTS entity_class          VARCHAR(500),
    ADD COLUMN IF NOT EXISTS criteria              VARCHAR(1000),
    ADD COLUMN IF NOT EXISTS order_by              VARCHAR(500),
    ADD COLUMN IF NOT EXISTS composition_layout    VARCHAR(20)  NOT NULL DEFAULT 'LABEL_ON_LEFT',
    ADD COLUMN IF NOT EXISTS action_layout         VARCHAR(10)  NOT NULL DEFAULT 'TOP',
    ADD COLUMN IF NOT EXISTS auto_save_time        INTEGER,
    ADD COLUMN IF NOT EXISTS has_navigation_bar    CHAR(1)  NOT NULL DEFAULT 'Y',
    -- Propriétés SplitView
    ADD COLUMN IF NOT EXISTS is_split_view         CHAR(1)  NOT NULL DEFAULT 'N',
    ADD COLUMN IF NOT EXISTS size_share            VARCHAR(10),
    ADD COLUMN IF NOT EXISTS orientation           VARCHAR(15),
    -- Propriétés GridView
    ADD COLUMN IF NOT EXISTS page_size             INTEGER  NOT NULL DEFAULT 20,
    ADD COLUMN IF NOT EXISTS checkbox_selection    CHAR(1)  NOT NULL DEFAULT 'N',
    ADD COLUMN IF NOT EXISTS word_wrap             CHAR(1)  NOT NULL DEFAULT 'N',
    ADD COLUMN IF NOT EXISTS row_height            INTEGER,
    ADD COLUMN IF NOT EXISTS disable_report_button CHAR(1)  NOT NULL DEFAULT 'N',
    ADD COLUMN IF NOT EXISTS action_renderer       VARCHAR(10) NOT NULL DEFAULT 'BUTTON',
    -- Divers
    ADD COLUMN IF NOT EXISTS cgp_reference         VARCHAR(100),
    ADD COLUMN IF NOT EXISTS weight                BIGINT;

-- Élargir le CHECK template_type pour inclure tous les types supportés
ALTER TABLE ui_screen DROP CONSTRAINT IF EXISTS ck_ui_screen_template;
ALTER TABLE ui_screen ADD CONSTRAINT ck_ui_screen_template
    CHECK (template_type IN (
        'GRID', 'FORM', 'MASTER_DETAIL', 'ANALYTICS',
        'TREE', 'CHART', 'TAB', 'SPLIT'
    ));


-- ── 1.2  UI_COMPONENT : colonnes absentes du DDL d'origine ──

ALTER TABLE ui_component
    ADD COLUMN IF NOT EXISTS fire_on_change          CHAR(1)  NOT NULL DEFAULT 'N',
    -- Expressions dynamiques
    ADD COLUMN IF NOT EXISTS visibility_exp          VARCHAR(500),
    ADD COLUMN IF NOT EXISTS readonly_exp            VARCHAR(500),
    ADD COLUMN IF NOT EXISTS require_exp             VARCHAR(500),
    ADD COLUMN IF NOT EXISTS label_exp               VARCHAR(500),
    ADD COLUMN IF NOT EXISTS on_fire_on_change_exp   VARCHAR(1000),
    ADD COLUMN IF NOT EXISTS dynamic_list_data_exp   VARCHAR(1000),
    -- Layout
    ADD COLUMN IF NOT EXISTS col_span                INTEGER,
    ADD COLUMN IF NOT EXISTS row_span                INTEGER,
    -- Validation numérique
    ADD COLUMN IF NOT EXISTS max_length              INTEGER,
    ADD COLUMN IF NOT EXISTS min_value               DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS max_value               DOUBLE PRECISION,
    -- Relations
    ADD COLUMN IF NOT EXISTS related_entity          VARCHAR(500),
    ADD COLUMN IF NOT EXISTS display_field           VARCHAR(100),
    -- Rendu
    ADD COLUMN IF NOT EXISTS date_only               CHAR(1)  NOT NULL DEFAULT 'Y',
    ADD COLUMN IF NOT EXISTS case_transform          VARCHAR(10),
    ADD COLUMN IF NOT EXISTS nb_lines                INTEGER,
    ADD COLUMN IF NOT EXISTS weight                  BIGINT;

-- Élargir le CHECK component_type
ALTER TABLE ui_component DROP CONSTRAINT IF EXISTS ck_ui_comp_type;
ALTER TABLE ui_component ADD CONSTRAINT ck_ui_comp_type
    CHECK (component_type IN (
        'TEXT', 'NUMBER', 'AMOUNT', 'CURRENCY', 'EMAIL', 'PASSWORD',
        'SELECT', 'MULTISELECT', 'AUTOCOMPLETE',
        'DATE', 'DATETIME', 'TIME',
        'CHECKBOX', 'RADIO', 'SWITCH',
        'TEXTAREA', 'FILE', 'IMAGE',
        'BADGE', 'LINK', 'PROGRESS',
        'GROUP', 'SEPARATOR',
        'RELATION_ONE', 'RELATION_MANY'
    ));


-- ── 1.3  UI_ACTION — nouvelle table ─────────────────────────

CREATE TABLE IF NOT EXISTS ui_action (
    action_id           BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_ui_action PRIMARY KEY,
    screen_id           BIGINT          NOT NULL,
    code                VARCHAR(50)     NOT NULL,
    label               VARCHAR(200)    NOT NULL,
    icon                VARCHAR(100),
    -- MAIN (barre d'actions) | GRID (ligne de tableau) | SUBVIEW
    action_type         VARCHAR(20)     NOT NULL DEFAULT 'MAIN',
    -- BUTTON | LINK | IMAGE
    renderer            VARCHAR(10)     NOT NULL DEFAULT 'BUTTON',
    http_method         VARCHAR(10),
    endpoint            VARCHAR(500),
    is_enabled          CHAR(1)         NOT NULL DEFAULT 'Y',
    require_validation  CHAR(1)         NOT NULL DEFAULT 'N',
    require_selection   CHAR(1)         NOT NULL DEFAULT 'N',
    with_confirmation   CHAR(1)         NOT NULL DEFAULT 'N',
    confirmation_msg    VARCHAR(500),
    end_action          CHAR(1)         NOT NULL DEFAULT 'N',
    condition_exp       VARCHAR(500),
    -- Couleur : indigo | blue | green | amber | orange | red | purple | gray
    color               VARCHAR(30),
    display_order       INTEGER         NOT NULL DEFAULT 0,
    group_code          VARCHAR(50),
    -- Raccourci clavier
    kb_ctrl             CHAR(1)         NOT NULL DEFAULT 'N',
    kb_alt              CHAR(1)         NOT NULL DEFAULT 'N',
    kb_shift            CHAR(1)         NOT NULL DEFAULT 'N',
    kb_key              VARCHAR(10),
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT fk_ui_action_screen  FOREIGN KEY (screen_id)
                                    REFERENCES ui_screen(screen_id) ON DELETE CASCADE,
    CONSTRAINT ck_ui_action_type    CHECK (action_type IN ('MAIN', 'GRID', 'SUBVIEW')),
    CONSTRAINT ck_ui_action_rend    CHECK (renderer    IN ('BUTTON', 'LINK', 'IMAGE'))
);

CREATE INDEX IF NOT EXISTS idx_ui_action_screen ON ui_action (screen_id);
CREATE INDEX IF NOT EXISTS idx_ui_action_order  ON ui_action (screen_id, display_order);

COMMENT ON TABLE  ui_action              IS 'Actions configurables par écran (barre principale + lignes de grille).';
COMMENT ON COLUMN ui_action.action_type  IS 'MAIN=barre d''actions | GRID=action de ligne | SUBVIEW=sous-vue';
COMMENT ON COLUMN ui_action.color        IS 'indigo|blue|green|amber|orange|red|purple|gray — correspond aux classes Tailwind du frontend';
COMMENT ON COLUMN ui_action.endpoint     IS 'URL relative appelée (supports {id} comme paramètre de ligne)';


-- ── 1.4  UI_COLUMN — nouvelle table ─────────────────────────

CREATE TABLE IF NOT EXISTS ui_column (
    column_id           BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_ui_column PRIMARY KEY,
    screen_id           BIGINT          NOT NULL,
    field_name          VARCHAR(100)    NOT NULL,
    label               VARCHAR(200)    NOT NULL,
    width               INTEGER,
    column_align        VARCHAR(10)     NOT NULL DEFAULT 'LEFT',
    is_sortable         CHAR(1)         NOT NULL DEFAULT 'Y',
    is_filterable       CHAR(1)         NOT NULL DEFAULT 'N',
    is_editable         CHAR(1)         NOT NULL DEFAULT 'N',
    is_visible          CHAR(1)         NOT NULL DEFAULT 'Y',
    visibility_exp      VARCHAR(500),
    label_exp           VARCHAR(500),
    format_pattern      VARCHAR(100),
    action_code         VARCHAR(50),
    display_order       INTEGER         NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT fk_ui_col_screen   FOREIGN KEY (screen_id)
                                  REFERENCES ui_screen(screen_id) ON DELETE CASCADE,
    CONSTRAINT ck_ui_col_align    CHECK (column_align IN ('LEFT', 'CENTER', 'RIGHT'))
);

CREATE INDEX IF NOT EXISTS idx_ui_column_screen ON ui_column (screen_id);
CREATE INDEX IF NOT EXISTS idx_ui_column_order  ON ui_column (screen_id, display_order);

COMMENT ON TABLE  ui_column             IS 'Colonnes dédiées au template GRID (définition indépendante de UI_COMPONENT).';
COMMENT ON COLUMN ui_column.field_name  IS 'Attribut JSON renvoyé par l''API. Ex: nom, montant, statut';
COMMENT ON COLUMN ui_column.format_pattern IS 'FCFA|XOF|%|DATE — formatage côté frontend';


-- ============================================================
-- PARTIE 2 — EXEMPLE COMPLET : Écran GRID « Clients »
-- Illustre les filtres, colonnes et actions du nouveau rendu
-- ============================================================

DO $$
DECLARE
    scr_id BIGINT;
BEGIN

-- ── 2.1  Écran ───────────────────────────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    page_size, order_by, disable_report_button, action_renderer,
    is_active, created_at, updated_at, created_by, updated_by
)
VALUES (
    'SCR_CLIENTS',
    'Gestion des Clients',
    'Recherche et gestion du portefeuille client',
    'GRID',
    '/api/v1/clients',
    20, 'nom ASC', 'N', 'BUTTON',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title                 = EXCLUDED.title,
        description           = EXCLUDED.description,
        api_base_url          = EXCLUDED.api_base_url,
        page_size             = EXCLUDED.page_size,
        order_by              = EXCLUDED.order_by,
        disable_report_button = EXCLUDED.disable_report_button,
        updated_at            = NOW(),
        updated_by            = 'migration_20';

SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_CLIENTS';

-- ── 2.2  Composants : filtres + colonnes grille ──────────────
--
-- Règles :
--   is_filterable = 'Y'   → apparaît dans le panneau de filtres (haut d'écran)
--   is_grid_column = 'Y'  → apparaît comme colonne dans le tableau
--   Les deux à 'Y'        → champ à la fois filtrable ET visible en colonne
--   is_grid_column = 'N'  → champ formulaire uniquement (modal de saisie)

DELETE FROM ui_component WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type, placeholder,
    is_required, is_readonly, is_visible,
    is_filterable, is_grid_column, is_sortable,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES

-- ── Champs de filtre (is_filterable='Y', is_grid_column='N') ──
(scr_id, 'nom',    'Nom client',    'TEXT',   'Filtrer par nom…',   'N','N','Y', 'Y','N','Y',  1, 6, NULL, NULL, NULL, NOW(),NOW(),'system','system'),
(scr_id, 'statut', 'Statut',        'SELECT', NULL,                 'N','N','Y', 'Y','N','Y',  2, 6,
    NULL,
    '{"options":[
        {"value":"ACTIF",   "label":"Actif",    "color":"green"},
        {"value":"INACTIF", "label":"Inactif",  "color":"gray"},
        {"value":"SUSPENDU","label":"Suspendu", "color":"amber"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'typeClient', 'Type client', 'SELECT', NULL, 'N','N','Y', 'Y','N','Y', 3, 6,
    NULL,
    '{"options":[
        {"value":"PARTICULIER","label":"Particulier"},
        {"value":"ENTREPRISE", "label":"Entreprise"},
        {"value":"INSTITUTION","label":"Institution"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'dateCreation', 'Date création', 'DATE', NULL, 'N','N','Y', 'Y','N','Y', 4, 6, NULL, NULL, NULL, NOW(),NOW(),'system','system'),

-- ── Colonnes du tableau (is_filterable='N', is_grid_column='Y') ──
(scr_id, 'id',           'ID',               'NUMBER', NULL, 'N','Y','N', 'N','Y','Y',  5, 1,  NULL, NULL, NULL,   NOW(),NOW(),'system','system'),
(scr_id, 'code',         'Code',             'TEXT',   NULL, 'N','Y','Y', 'N','Y','Y',  6, 3,  NULL, NULL, NULL,   NOW(),NOW(),'system','system'),
(scr_id, 'nom',          'Nom',              'TEXT',   NULL, 'Y','N','Y', 'N','Y','Y',  7, 6,  NULL, NULL, NULL,   NOW(),NOW(),'system','system'),
(scr_id, 'typeClient',   'Type',             'BADGE',  NULL, 'N','N','Y', 'N','Y','Y',  8, 3,
    NULL,
    '{"options":[
        {"value":"PARTICULIER","label":"Particulier","color":"blue"},
        {"value":"ENTREPRISE", "label":"Entreprise", "color":"indigo"},
        {"value":"INSTITUTION","label":"Institution","color":"purple"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'telephone',    'Téléphone',        'TEXT',   NULL, 'N','N','Y', 'N','Y','N',  9, 4,  NULL, NULL, NULL,   NOW(),NOW(),'system','system'),
(scr_id, 'email',        'Email',            'EMAIL',  NULL, 'N','N','Y', 'N','Y','N', 10, 6,  NULL, NULL, NULL,   NOW(),NOW(),'system','system'),
(scr_id, 'statut',       'Statut',           'BADGE',  NULL, 'N','N','Y', 'N','Y','Y', 11, 3,
    NULL,
    '{"options":[
        {"value":"ACTIF",   "label":"Actif",    "color":"green"},
        {"value":"INACTIF", "label":"Inactif",  "color":"gray"},
        {"value":"SUSPENDU","label":"Suspendu", "color":"amber"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'encours',      'Encours (FCFA)',   'AMOUNT', NULL, 'N','N','Y', 'N','Y','Y', 12, 4,  NULL, NULL, 'FCFA', NOW(),NOW(),'system','system'),
(scr_id, 'dateCreation', 'Créé le',          'DATE',   NULL, 'N','Y','Y', 'N','Y','Y', 13, 3,  NULL, NULL, NULL,   NOW(),NOW(),'system','system'),

-- ── Champs formulaire (modal de saisie, ni filtre ni colonne) ─
(scr_id, 'adresse',      'Adresse',          'TEXTAREA', 'Adresse complète…', 'N','N','Y', 'N','N','N', 14, 12, NULL, NULL, NULL, NOW(),NOW(),'system','system'),
(scr_id, 'commentaire',  'Commentaire',      'TEXTAREA', NULL, 'N','N','Y', 'N','N','N', 15, 12, NULL, NULL, NULL, NOW(),NOW(),'system','system');

-- ── 2.3  Actions ─────────────────────────────────────────────
--
-- action_type = 'MAIN'  → barre d'actions au-dessus du tableau
-- action_type = 'GRID'  → actions sur la ligne (visibles au hover)
--
-- Couleurs disponibles : indigo | blue | green | amber | orange | red | purple | gray

DELETE FROM ui_action WHERE screen_id = scr_id;

INSERT INTO ui_action (
    screen_id, code, label, icon, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_selection, with_confirmation, confirmation_msg,
    color, display_order,
    created_at, updated_at, created_by, updated_by
) VALUES

-- Actions MAIN (barre supérieure)
(scr_id, 'new',     'Nouveau',          'plus',       'MAIN','BUTTON', NULL,   NULL,                   'Y','N','N', NULL,                            'indigo', 1, NOW(),NOW(),'system','system'),
(scr_id, 'export',  'Exporter',         'download',   'MAIN','BUTTON', 'GET',  '/api/v1/clients/export','Y','N','N', NULL,                            'gray',   2, NOW(),NOW(),'system','system'),
(scr_id, 'refresh', 'Actualiser',       'refresh',    'MAIN','BUTTON', NULL,   NULL,                   'Y','N','N', NULL,                            'gray',   3, NOW(),NOW(),'system','system'),

-- Actions GRID (ligne du tableau, visibles au hover)
(scr_id, 'edit',   'Modifier',         'pencil',     'GRID','BUTTON', NULL,   NULL,                   'Y','Y','N', NULL,                            'amber',  1, NOW(),NOW(),'system','system'),
(scr_id, 'toggle', 'Activer/Suspend.', 'power',      'GRID','BUTTON', 'PATCH','/api/v1/clients/{id}/toggle', 'Y','Y','Y', 'Changer le statut de ce client ?', 'blue', 2, NOW(),NOW(),'system','system'),
(scr_id, 'delete', 'Supprimer',        'trash',      'GRID','BUTTON', 'DELETE',NULL,                  'Y','Y','Y', 'Supprimer définitivement ce client ?', 'red', 3, NOW(),NOW(),'system','system');

RAISE NOTICE 'SCR_CLIENTS créé / mis à jour (screen_id = %)', scr_id;
END $$;


-- ============================================================
-- PARTIE 3 — MIGRATION DES ÉCRANS EXISTANTS
-- Active les filtres sur les colonnes les plus utiles
-- ============================================================

-- Activer is_filterable sur les champs texte/date souvent filtrés
-- dans tous les écrans GRID existants.
-- Adaptez cette liste à vos écrans réels.

UPDATE ui_component
SET    is_filterable = 'Y',
       updated_at    = NOW(),
       updated_by    = 'migration_20'
WHERE  field_key IN ('nom', 'code', 'libelle', 'label', 'statut', 'type',
                     'dateCreation', 'dateValeur', 'dateDebut', 'dateFin',
                     'reference', 'numero', 'username', 'email',
                     'roleName', 'isActive')
  AND  screen_id IN (
           SELECT screen_id FROM ui_screen WHERE template_type = 'GRID'
       )
  AND  is_filterable = 'N';

-- Activer is_sortable sur les colonnes grille si pas déjà fait
UPDATE ui_component
SET    is_sortable = 'Y',
       updated_at  = NOW(),
       updated_by  = 'migration_20'
WHERE  is_grid_column = 'Y'
  AND  is_sortable    = 'N'
  AND  component_type NOT IN ('BADGE', 'IMAGE', 'FILE', 'LINK', 'PROGRESS', 'SEPARATOR', 'GROUP')
  AND  screen_id IN (
           SELECT screen_id FROM ui_screen WHERE template_type IN ('GRID', 'MASTER_DETAIL')
       );

-- ── Migrer grid_config JSON → UI_ACTION (pour SCR_UTILISATEURS) ──
-- Si les actions existent déjà dans ui_action, ne pas dupliquer.

DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_UTILISATEURS';
    IF scr_id IS NULL THEN RETURN; END IF;
    IF EXISTS (SELECT 1 FROM ui_action WHERE screen_id = scr_id) THEN RETURN; END IF;

    INSERT INTO ui_action (
        screen_id, code, label, action_type, renderer,
        is_enabled, require_selection, with_confirmation, confirmation_msg,
        color, display_order, created_at, updated_at, created_by, updated_by
    ) VALUES
    (scr_id, 'new',    'Nouveau',           'MAIN','BUTTON','Y','N','N', NULL,                                'indigo',1,NOW(),NOW(),'migration_20','migration_20'),
    (scr_id, 'edit',   'Modifier',          'GRID','BUTTON','Y','Y','N', NULL,                                'amber', 1,NOW(),NOW(),'migration_20','migration_20'),
    (scr_id, 'toggle', 'Activer/Désactiver','GRID','BUTTON','Y','Y','Y', 'Changer le statut de cet utilisateur ?','blue',2,NOW(),NOW(),'migration_20','migration_20'),
    (scr_id, 'delete', 'Supprimer',         'GRID','BUTTON','Y','Y','Y', 'Supprimer définitivement cet utilisateur ?','red',3,NOW(),NOW(),'migration_20','migration_20');

    RAISE NOTICE 'Actions insérées pour SCR_UTILISATEURS';
END $$;

-- Même migration pour SCR_ROLES
DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_ROLES';
    IF scr_id IS NULL THEN RETURN; END IF;
    IF EXISTS (SELECT 1 FROM ui_action WHERE screen_id = scr_id) THEN RETURN; END IF;

    INSERT INTO ui_action (
        screen_id, code, label, action_type, renderer,
        is_enabled, require_selection, with_confirmation, confirmation_msg,
        color, display_order, created_at, updated_at, created_by, updated_by
    ) VALUES
    (scr_id, 'new',    'Nouveau',   'MAIN','BUTTON','Y','N','N', NULL,                           'indigo',1,NOW(),NOW(),'migration_20','migration_20'),
    (scr_id, 'edit',   'Modifier',  'GRID','BUTTON','Y','Y','N', NULL,                           'amber', 1,NOW(),NOW(),'migration_20','migration_20'),
    (scr_id, 'delete', 'Supprimer', 'GRID','BUTTON','Y','Y','Y', 'Supprimer ce rôle définitivement ?','red',2,NOW(),NOW(),'migration_20','migration_20');

    RAISE NOTICE 'Actions insérées pour SCR_ROLES';
END $$;


-- ============================================================
-- PARTIE 4 — VÉRIFICATION
-- ============================================================

SELECT
    s.code,
    s.title,
    s.template_type,
    COUNT(DISTINCT c.component_id)                                       AS nb_composants,
    COUNT(DISTINCT c.component_id) FILTER (WHERE c.is_filterable = 'Y') AS nb_filtres,
    COUNT(DISTINCT c.component_id) FILTER (WHERE c.is_grid_column = 'Y')AS nb_colonnes,
    COUNT(DISTINCT a.action_id)                                          AS nb_actions,
    COUNT(DISTINCT a.action_id) FILTER (WHERE a.action_type = 'MAIN')   AS actions_main,
    COUNT(DISTINCT a.action_id) FILTER (WHERE a.action_type = 'GRID')   AS actions_ligne
FROM ui_screen s
LEFT JOIN ui_component c ON c.screen_id = s.screen_id
LEFT JOIN ui_action    a ON a.screen_id = s.screen_id
WHERE s.template_type IN ('GRID', 'MASTER_DETAIL')
GROUP BY s.screen_id, s.code, s.title, s.template_type
ORDER BY s.code;

COMMIT;
