-- ============================================================
-- ALYX-APP :: DONNÉES DE RÉFÉRENCE (SEED)
-- Contexte Marchés Financiers UMOA / BRVM
-- PostgreSQL 14+ — syntaxe JSONB (cast ::jsonb)
-- ============================================================

-- ============================================================
-- 1. ÉCRANS (UI_SCREEN)
-- ============================================================

-- [1] Gestion des Obligations (MASTER_DETAIL)
INSERT INTO ui_screen (code, title, description, template_type, api_base_url,
    permissions, grid_config)
VALUES (
    'SCR_OBLIGATIONS',
    'Marché des Obligations',
    'Gestion et suivi des obligations émises sur le marché UMOA/BRVM',
    'MASTER_DETAIL',
    '/api/v1/marche/obligations',
    '{"read":["ROLE_USER"],"write":["ROLE_TRADER","ROLE_ADMIN"],"delete":["ROLE_ADMIN"]}'::jsonb,
    '{"pageSize":20,"defaultSort":"dateEmission","defaultSortDir":"desc",
      "actions":[
        {"key":"view","label":"Détails","icon":"eye","color":"blue"},
        {"key":"edit","label":"Modifier","icon":"pencil","color":"amber"},
        {"key":"delete","label":"Supprimer","icon":"trash","color":"red","confirmRequired":true}
      ],
      "exportFormats":["CSV","EXCEL","PDF"]}'::jsonb
);

-- [2] Gestion des Actions BRVM (GRID)
INSERT INTO ui_screen (code, title, description, template_type, api_base_url,
    permissions, grid_config)
VALUES (
    'SCR_ACTIONS_BRVM',
    'Actions BRVM',
    'Cours et historique des actions cotées à la Bourse Régionale des Valeurs Mobilières',
    'GRID',
    '/api/v1/marche/actions',
    '{"read":["ROLE_USER"],"write":["ROLE_ADMIN"],"delete":["ROLE_ADMIN"]}'::jsonb,
    '{"pageSize":30,"defaultSort":"dateCotation","defaultSortDir":"desc",
      "actions":[{"key":"historique","label":"Historique","icon":"chart-line","color":"blue"}],
      "exportFormats":["CSV","EXCEL"]}'::jsonb
);

-- [3] Tableau de Bord Marchés (ANALYTICS)
INSERT INTO ui_screen (code, title, description, template_type, api_base_url,
    permissions, analytics_config)
VALUES (
    'SCR_DASHBOARD_MARCHE',
    'Tableau de Bord Marchés',
    'Vue consolidée des indicateurs clés du marché financier UMOA',
    'ANALYTICS',
    '/api/v1/marche/dashboard',
    '{"read":["ROLE_USER"]}'::jsonb,
    '{
      "kpis":[
        {"key":"encoursTotalObligations","label":"Encours Obligations","dataEndpoint":"/api/v1/marche/kpi/encours-obligations","format":"FCFA","icon":"building-library","color":"blue"},
        {"key":"capitalBoursier","label":"Capitalisation Boursière","dataEndpoint":"/api/v1/marche/kpi/capitalisation","format":"FCFA","icon":"chart-bar","color":"green"},
        {"key":"volumeJour","label":"Volume du Jour","dataEndpoint":"/api/v1/marche/kpi/volume-jour","format":"FCFA","icon":"arrow-trending-up","color":"amber"},
        {"key":"indiceComposite","label":"Indice Composite","dataEndpoint":"/api/v1/marche/kpi/indice","format":"points","icon":"presentation-chart-line","color":"purple"}
      ],
      "charts":[
        {"key":"evolutionIndice","type":"line","title":"Évolution Indice Composite (12 mois)","dataEndpoint":"/api/v1/marche/stats/indice-evolution","colSpan":8},
        {"key":"repartitionSecteur","type":"doughnut","title":"Répartition par Secteur","dataEndpoint":"/api/v1/marche/stats/secteurs","colSpan":4},
        {"key":"topHaussiers","type":"bar","title":"Top 10 Haussiers","dataEndpoint":"/api/v1/marche/stats/top-haussiers","colSpan":6},
        {"key":"topBaissiers","type":"bar","title":"Top 10 Baissiers","dataEndpoint":"/api/v1/marche/stats/top-baissiers","colSpan":6}
      ]
    }'::jsonb
);

-- [4] Émetteurs (MASTER_DETAIL)
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions)
VALUES (
    'SCR_EMETTEURS',
    'Gestion des Émetteurs',
    'Référentiel des émetteurs d''instruments financiers (États, entreprises)',
    'MASTER_DETAIL',
    '/api/v1/ref/emetteurs',
    '{"read":["ROLE_USER"],"write":["ROLE_ADMIN"],"delete":["ROLE_ADMIN"]}'::jsonb
);

-- [5] Gestion Utilisateurs (MASTER_DETAIL)
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions)
VALUES (
    'SCR_UTILISATEURS',
    'Gestion des Utilisateurs',
    'Administration des comptes et droits d''accès',
    'MASTER_DETAIL',
    '/api/v1/admin/utilisateurs',
    '{"read":["ROLE_ADMIN"],"write":["ROLE_ADMIN"],"delete":["ROLE_ADMIN"]}'::jsonb
);


-- ============================================================
-- 2. COMPOSANTS :: SCR_OBLIGATIONS
-- ============================================================

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span)
SELECT screen_id, 'isinCode', 'Code ISIN', 'TEXT',
    'Y', 'Y', 'Y', 'Y', 10, 4
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span, validation_regex, validation_msg)
SELECT screen_id, 'nomEmprunt', 'Dénomination de l''Emprunt', 'TEXT',
    'Y', 'Y', 'Y', 'Y', 20, 8,
    '^.{5,200}$', 'La dénomination doit contenir entre 5 et 200 caractères'
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span, options_source)
SELECT screen_id, 'emetteurId', 'Émetteur', 'AUTOCOMPLETE',
    'Y', 'Y', 'Y', 'Y', 30, 6, '/api/v1/ref/emetteurs/search'
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_grid_column,
    display_order, grid_col_span, options_json)
SELECT screen_id, 'typeInstrument', 'Type d''Instrument', 'SELECT',
    'Y', 'Y', 'Y', 40, 6,
    '[
      {"value":"OAT","label":"OAT - Obligation Assimilable du Trésor"},
      {"value":"OBMO","label":"OBMO - Obligation du Marché des Capitaux"},
      {"value":"BOA","label":"BOA - Bon d''Assimilation de l''État"}
    ]'::jsonb
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_grid_column,
    display_order, grid_col_span, format_pattern)
SELECT screen_id, 'montantEmission', 'Montant d''Émission', 'AMOUNT',
    'Y', 'Y', 'Y', 50, 6, 'FCFA'
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_grid_column,
    display_order, grid_col_span, format_pattern,
    validation_regex, validation_msg)
SELECT screen_id, 'tauxNominal', 'Taux Nominal (%)', 'NUMBER',
    'Y', 'Y', 'Y', 60, 3, '%',
    '^([0-9]{1,2}([.][0-9]{1,4})?)$', 'Taux entre 0 et 99.9999%'
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_grid_column,
    display_order, grid_col_span, format_pattern)
SELECT screen_id, 'dateEmission', 'Date d''Émission', 'DATE',
    'Y', 'Y', 'Y', 70, 4, 'dd/MM/yyyy'
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_grid_column,
    display_order, grid_col_span, format_pattern)
SELECT screen_id, 'dateEcheance', 'Date d''Échéance', 'DATE',
    'Y', 'Y', 'Y', 80, 4, 'dd/MM/yyyy'
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_sortable, is_grid_column, is_required,
    display_order, grid_col_span, options_json)
SELECT screen_id, 'statut', 'Statut', 'BADGE',
    'Y', 'Y', 'Y', 90, 3,
    '[
      {"value":"ACTIF","label":"Actif"},
      {"value":"REMBOURSE","label":"Remboursé"},
      {"value":"SUSPENDU","label":"Suspendu"},
      {"value":"EN_COURS","label":"En cours d''émission"}
    ]'::jsonb
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

-- Champ avec visibilité conditionnelle (visible seulement si typeInstrument = OAT)
INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_grid_column,
    display_order, grid_col_span, visibility_rule)
SELECT screen_id, 'codePays', 'Pays Émetteur', 'SELECT',
    'N', 'N', 100, 4,
    '{"field":"typeInstrument","operator":"eq","value":"OAT"}'::jsonb
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_grid_column, display_order, grid_col_span)
SELECT screen_id, 'noteCredit', 'Note de Crédit', 'TEXT',
    'N', 'N', 110, 4
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_grid_column, display_order, grid_col_span)
SELECT screen_id, 'observations', 'Observations', 'TEXTAREA',
    'N', 'N', 120, 12
FROM ui_screen WHERE code = 'SCR_OBLIGATIONS';


-- ============================================================
-- 3. COMPOSANTS :: SCR_ACTIONS_BRVM
-- ============================================================

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span)
SELECT screen_id, 'ticker', 'Ticker', 'TEXT',
    'Y', 'Y', 'Y', 'Y', 10, 3
FROM ui_screen WHERE code = 'SCR_ACTIONS_BRVM';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_required, is_sortable, is_filterable, is_grid_column,
    display_order, grid_col_span)
SELECT screen_id, 'societe', 'Société', 'TEXT',
    'Y', 'Y', 'Y', 'Y', 20, 6
FROM ui_screen WHERE code = 'SCR_ACTIONS_BRVM';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_sortable, is_grid_column, is_required,
    display_order, grid_col_span, format_pattern)
SELECT screen_id, 'coursCloture', 'Cours de Clôture', 'CURRENCY',
    'Y', 'Y', 'Y', 30, 4, 'FCFA'
FROM ui_screen WHERE code = 'SCR_ACTIONS_BRVM';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_sortable, is_grid_column, is_required,
    display_order, grid_col_span, format_pattern)
SELECT screen_id, 'variation', 'Variation (%)', 'NUMBER',
    'Y', 'Y', 'Y', 40, 3, '%'
FROM ui_screen WHERE code = 'SCR_ACTIONS_BRVM';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_sortable, is_grid_column, is_required,
    display_order, grid_col_span)
SELECT screen_id, 'volume', 'Volume', 'NUMBER',
    'Y', 'Y', 'Y', 50, 3
FROM ui_screen WHERE code = 'SCR_ACTIONS_BRVM';

INSERT INTO ui_component (screen_id, field_key, label, component_type,
    is_sortable, is_grid_column, is_required,
    display_order, grid_col_span, format_pattern)
SELECT screen_id, 'dateCotation', 'Date de Cotation', 'DATE',
    'Y', 'Y', 'Y', 60, 4, 'dd/MM/yyyy'
FROM ui_screen WHERE code = 'SCR_ACTIONS_BRVM';


-- ============================================================
-- 4. MENU DE NAVIGATION (APP_MENU)
-- ============================================================

-- Niveau 1: Sections principales
INSERT INTO app_menu (code, label, icon, display_order)
VALUES ('MNU_DASHBOARD', 'Tableau de Bord', 'home', 1);

INSERT INTO app_menu (code, label, icon, display_order)
VALUES ('MNU_MARCHES', 'Marchés Financiers', 'chart-bar', 2);

INSERT INTO app_menu (code, label, icon, display_order)
VALUES ('MNU_REFERENTIEL', 'Référentiel', 'book-open', 3);

INSERT INTO app_menu (code, label, icon, display_order, role_required)
VALUES ('MNU_ADMINISTRATION', 'Administration', 'cog-6-tooth', 4, 'ROLE_ADMIN');

-- Niveau 2: Sous-menus Marchés
INSERT INTO app_menu (code, parent_id, label, icon, route, screen_code, display_order)
SELECT 'MNU_MARCHES_DASH', menu_id, 'Vue Globale', 'presentation-chart-line',
    '/marches/dashboard', 'SCR_DASHBOARD_MARCHE', 1
FROM app_menu WHERE code = 'MNU_MARCHES';

INSERT INTO app_menu (code, parent_id, label, icon, route, screen_code, display_order)
SELECT 'MNU_OBLIGATIONS', menu_id, 'Obligations', 'document-text',
    '/marches/obligations', 'SCR_OBLIGATIONS', 2
FROM app_menu WHERE code = 'MNU_MARCHES';

INSERT INTO app_menu (code, parent_id, label, icon, route, screen_code, display_order)
SELECT 'MNU_ACTIONS', menu_id, 'Actions BRVM', 'arrow-trending-up',
    '/marches/actions', 'SCR_ACTIONS_BRVM', 3
FROM app_menu WHERE code = 'MNU_MARCHES';

-- Niveau 2: Référentiel
INSERT INTO app_menu (code, parent_id, label, icon, route, screen_code, display_order)
SELECT 'MNU_EMETTEURS', menu_id, 'Émetteurs', 'building-office-2',
    '/ref/emetteurs', 'SCR_EMETTEURS', 1
FROM app_menu WHERE code = 'MNU_REFERENTIEL';

-- Niveau 2: Administration
INSERT INTO app_menu (code, parent_id, label, icon, route, screen_code, display_order, role_required)
SELECT 'MNU_UTILISATEURS', menu_id, 'Utilisateurs', 'users',
    '/admin/utilisateurs', 'SCR_UTILISATEURS', 1, 'ROLE_ADMIN'
FROM app_menu WHERE code = 'MNU_ADMINISTRATION';
