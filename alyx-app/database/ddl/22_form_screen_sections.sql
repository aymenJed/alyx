-- ============================================================
-- ALYX-APP :: MIGRATION 22 — Écran FORM avec sections
-- Illustre la configuration d'un formulaire avec sections
-- repliables (GROUP), layout 4 colonnes (grid_col_span=3),
-- pour correspondre au nouveau rendu FormGenerator.
--
-- PostgreSQL 14+  |  Idempotent
-- ============================================================

BEGIN;

-- ============================================================
-- EXEMPLE : Écran FORM « Fiche Bond / Obligation »
-- Reproduit la structure de la capture d'écran de référence
-- ============================================================

DO $$
DECLARE
    scr_id BIGINT;
BEGIN

-- ── 1. Écran ────────────────────────────────────────────────
INSERT INTO ui_screen (
    code, title, description, template_type, api_base_url,
    composition_layout, action_layout, has_navigation_bar,
    is_active, created_at, updated_at, created_by, updated_by
)
VALUES (
    'SCR_BOND_FORM',
    'Fiche Bond',
    'Saisie et consultation d''une obligation / bond',
    'FORM',
    '/api/v1/bonds',
    'LABEL_ON_TOP',   -- labels au-dessus des champs
    'TOP',
    'N',
    'Y', NOW(), NOW(), 'system', 'system'
)
ON CONFLICT (code) DO UPDATE
    SET title              = EXCLUDED.title,
        description        = EXCLUDED.description,
        composition_layout = EXCLUDED.composition_layout,
        updated_at         = NOW(),
        updated_by         = 'migration_22';

SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_BOND_FORM';

-- ── 2. Composants ───────────────────────────────────────────
--
-- Règles de layout (grid_col_span) :
--   3  → 1 champ sur 4  (layout 4 colonnes, comme la capture)
--   6  → 1 champ sur 2  (demi-largeur)
--  12  → pleine largeur
--
-- component_type = 'GROUP' → séparateur de section repliable
--   Le label du GROUP est l'intitulé de la section
--   field_key doit être unique
--
-- display_order : incrément de 10 pour laisser de la place

DELETE FROM ui_component WHERE screen_id = scr_id;

INSERT INTO ui_component (
    screen_id, field_key, label, component_type,
    placeholder, default_value,
    is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span,
    options_source, options_json, format_pattern,
    created_at, updated_at, created_by, updated_by
) VALUES

-- ═══════════════════════════════════════════
--  SECTION 1 : Informations générales
-- ═══════════════════════════════════════════
(scr_id, 'sec_general',    'Informations générales', 'GROUP',  NULL,NULL, 'N','N','Y','N','N','N',  10,12, NULL,NULL,NULL, NOW(),NOW(),'system','system'),

-- Ligne 1 — 4 champs × col-span-3
(scr_id, 'titre',          'Titre',           'TEXT',   NULL,NULL,  'Y','N','Y','Y','N','N',  20, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'codeIsin',       'Code ISIN',       'TEXT',   NULL,NULL,  'N','N','Y','Y','Y','N',  30, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'marche',         'Marché',          'SELECT', NULL,NULL,  'Y','N','Y','N','Y','N',  40, 3,
    NULL,
    '{"options":[
        {"value":"BRVM",  "label":"BRVM — Bourse Régionale"},
        {"value":"OTC",   "label":"OTC — Gré à gré"},
        {"value":"COTE",  "label":"C-O|CÔTE TITRE DE CRÉANCE"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'natureTitre',    'Nature de Titre', 'SELECT', NULL,NULL,  'N','N','Y','N','N','N',  50, 3,
    NULL,
    '{"options":[
        {"value":"EMPRUNT_OBL",  "label":"Emprunt Obligataire"},
        {"value":"BON_TRESOR",   "label":"Bon du Trésor"},
        {"value":"BILLET",       "label":"Billet de Trésorerie"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),

-- Ligne 2
(scr_id, 'libelleCourtv',  'Libellé court',   'TEXT',   NULL,NULL,  'N','N','Y','N','N','N',  60, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'libelleLong',    'Libellé long',    'TEXT',   NULL,NULL,  'Y','N','Y','N','N','N',  70, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'emetteur',       'Emetteur',        'AUTOCOMPLETE', NULL,NULL, 'N','N','Y','N','Y','N', 80, 3,
    '/api/v1/ref/emetteurs',NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'teneurRegistre', 'Teneur du Registre','AUTOCOMPLETE',NULL,NULL,'N','N','Y','N','N','N', 90, 3,
    '/api/v1/ref/teneurs',NULL,NULL, NOW(),NOW(),'system','system'),

-- ═══════════════════════════════════════════
--  SECTION 2 : Autres caractéristiques
-- ═══════════════════════════════════════════
(scr_id, 'sec_autres',     'Autres caractéristiques','GROUP',NULL,NULL,'N','N','Y','N','N','N', 100,12, NULL,NULL,NULL, NOW(),NOW(),'system','system'),

(scr_id, 'place',          'Place',           'SELECT', NULL,NULL,  'Y','N','Y','N','N','N', 110, 3,
    NULL,
    '{"options":[
        {"value":"BVMT","label":"BVMT|BOURSE DES VALEURS MOBILIÈRES DE TUNIS"},
        {"value":"BRVM","label":"BRVM|BOURSE RÉGIONALE DES VALEURS MOBILIÈRES"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'depositaireCentral','Dépositaire central','SELECT',NULL,NULL,'Y','N','Y','N','N','N',120,3,
    '/api/v1/ref/depositaires',NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'garant',         'Garant',          'AUTOCOMPLETE',NULL,NULL,'N','N','Y','N','N','N',130,3,
    '/api/v1/ref/garants',NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'typeTitreCmf',   'Type de titre CMF','SELECT',NULL,NULL,  'N','N','Y','N','N','N', 140, 3,
    '/api/v1/ref/types-cmf',NULL,NULL, NOW(),NOW(),'system','system'),

(scr_id, 'secteurEco',     'Secteur économique','SELECT',NULL,NULL, 'N','N','Y','N','N','N', 150, 3,
    '/api/v1/ref/secteurs',NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'natureTitre2',   'Nature du titre', 'SELECT', NULL,NULL,  'N','N','Y','N','N','N', 160, 3,
    '/api/v1/ref/natures',NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'modeEnregistrement','Mode d''enregistrement','SELECT',NULL,NULL,'Y','N','Y','N','N','N',170,3,
    NULL,
    '{"options":[
        {"value":"DÉMATÉRIALISÉ","label":"Dématérialisé"},
        {"value":"PAPIER",       "label":"Papier"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'codeValeur',     'Code Valeur',     'TEXT',   NULL,NULL,  'N','Y','Y','N','N','N', 180, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),

-- ═══════════════════════════════════════════
--  SECTION 3 : Données de cotation
-- ═══════════════════════════════════════════
(scr_id, 'sec_cotation',   'Données de cotation','GROUP',NULL,NULL, 'N','N','Y','N','N','N', 200,12, NULL,NULL,NULL, NOW(),NOW(),'system','system'),

(scr_id, 'montantNominal', 'Montant nominal', 'AMOUNT', NULL,NULL,  'Y','N','Y','N','N','N', 210, 3, NULL,NULL,'FCFA', NOW(),NOW(),'system','system'),
(scr_id, 'nbTitres',       'Nombre Total de Titres','NUMBER',NULL,NULL,'N','N','Y','N','N','N',220,3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'modeCotation',   'Mode de cotation','SELECT', NULL,NULL,  'Y','N','Y','N','N','N', 230, 3,
    NULL,
    '{"options":[
        {"value":"PPC","label":"Pourcentage Pied de Coupon"},
        {"value":"PIED","label":"Pied de Coupon"},
        {"value":"PLEIN","label":"Plein Coupon"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'dateDeclaFcra',  'Date 1ère déclaration FCRA','DATE',NULL,NULL,'N','N','Y','N','N','N',240,3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),

(scr_id, 'dateEmission',   'Date d''émission', 'DATE', NULL,NULL,   'Y','N','Y','Y','N','N', 250, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'dateJouissance',  'Date de jouissance','DATE',NULL,NULL,  'N','N','Y','N','N','N', 260, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'dateEcheance',   'Date d''échéance', 'DATE', NULL,NULL,   'Y','N','Y','Y','N','N', 270, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'typeCotation',   'Type de cotation','SELECT', NULL,NULL,  'N','N','Y','N','N','N', 280, 3,
    NULL,
    '{"options":[
        {"value":"FIXING","label":"FIXING"},
        {"value":"CONTINU","label":"Continu"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),

(scr_id, 'baseJour',       'Base de jour',    'SELECT', NULL,NULL,  'Y','N','Y','N','N','N', 290, 3,
    NULL,
    '{"options":[
        {"value":"365","label":"365/366 jours"},
        {"value":"360","label":"360 jours"},
        {"value":"30_360","label":"30/360"}
    ]}'::jsonb,
    NULL, NOW(),NOW(),'system','system'),
(scr_id, 'devise',         'Devise',          'SELECT', NULL,NULL,  'Y','N','Y','N','Y','N', 300, 3,
    '/api/v1/ref/devises',NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'cote',           'Coté',            'CHECKBOX',NULL,NULL, 'N','N','Y','N','N','N', 310, 3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),

-- ═══════════════════════════════════════════
--  SECTION 4 : Date Souscription
-- ═══════════════════════════════════════════
(scr_id, 'sec_souscription','Date Souscription','GROUP',NULL,NULL,  'N','N','Y','N','N','N', 400,12, NULL,NULL,NULL, NOW(),NOW(),'system','system'),

(scr_id, 'dateDebutSouscription','Date Début Souscription','DATE',NULL,NULL,'Y','N','Y','N','N','N',410,3, NULL,NULL,NULL, NOW(),NOW(),'system','system'),
(scr_id, 'dateFinSouscription',  'Date Fin Souscription',  'DATE',NULL,NULL,'Y','N','Y','N','N','N',420,3, NULL,NULL,NULL, NOW(),NOW(),'system','system');

-- ── 3. Actions ─────────────────────────────────────────────
DELETE FROM ui_action WHERE screen_id = scr_id;

INSERT INTO ui_action (
    screen_id, code, label, action_type, renderer,
    http_method, endpoint,
    is_enabled, require_validation, with_confirmation, confirmation_msg,
    color, display_order, created_at, updated_at, created_by, updated_by
) VALUES
(scr_id, 'save',    'Enregistrer',  'MAIN','BUTTON', 'POST', '/api/v1/bonds',          'Y','Y','N', NULL,      'indigo',1,NOW(),NOW(),'system','system'),
(scr_id, 'valider', 'Valider',      'MAIN','BUTTON', 'POST', '/api/v1/bonds/{id}/valider','Y','Y','Y','Valider ce bond ?','green',2,NOW(),NOW(),'system','system'),
(scr_id, 'annuler_op','Annuler Op.','MAIN','BUTTON', 'POST', '/api/v1/bonds/{id}/annuler','Y','N','Y','Annuler cette opération ?','red',3,NOW(),NOW(),'system','system'),
(scr_id, 'imprimer','Imprimer',     'MAIN','BUTTON', 'GET',  '/api/v1/bonds/{id}/print','Y','N','N', NULL,      'gray',  4,NOW(),NOW(),'system','system');

RAISE NOTICE 'SCR_BOND_FORM créé / mis à jour (screen_id = %)', scr_id;
END $$;


-- ============================================================
-- ADAPTER LES ÉCRANS FORM EXISTANTS
-- Met à jour les champs pour un layout 4 colonnes par défaut
-- (grid_col_span = 3) si actuellement à 6 (demi-largeur)
-- ============================================================

-- Passer les champs couramment mono-ligne à col-span-3
-- (le designer peut les ajuster individuellement via l'UI admin)
UPDATE ui_component
SET    grid_col_span = 3,
       updated_at    = NOW(),
       updated_by    = 'migration_22'
WHERE  grid_col_span  = 6
  AND  component_type NOT IN ('TEXTAREA','GROUP','SEPARATOR','RELATION_MANY')
  AND  screen_id IN (
           SELECT screen_id FROM ui_screen WHERE template_type = 'FORM'
       );

-- Garder les TEXTAREA en demi-largeur (6) ou pleine (12)
UPDATE ui_component
SET    grid_col_span = 6,
       updated_at    = NOW(),
       updated_by    = 'migration_22'
WHERE  component_type = 'TEXTAREA'
  AND  grid_col_span  < 6
  AND  screen_id IN (
           SELECT screen_id FROM ui_screen WHERE template_type = 'FORM'
       );


-- ============================================================
-- VÉRIFICATION
-- ============================================================

SELECT
    s.code,
    s.title,
    COUNT(c.component_id)                                                     AS total,
    COUNT(c.component_id) FILTER (WHERE c.component_type = 'GROUP')          AS sections,
    COUNT(c.component_id) FILTER (WHERE c.grid_col_span  = 3)                AS cols_4,
    COUNT(c.component_id) FILTER (WHERE c.grid_col_span  = 6)                AS cols_2,
    COUNT(c.component_id) FILTER (WHERE c.grid_col_span  = 12)               AS cols_full,
    COUNT(a.action_id)                                                        AS nb_actions
FROM ui_screen s
LEFT JOIN ui_component c ON c.screen_id = s.screen_id
LEFT JOIN ui_action    a ON a.screen_id = s.screen_id
WHERE s.template_type = 'FORM'
GROUP BY s.screen_id, s.code, s.title
ORDER BY s.code;

COMMIT;
