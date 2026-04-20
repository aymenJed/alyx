-- =====================================================
-- Script: 16_new_menu_structure.sql
-- Description: Nouvelle structure de menus - Referentiel, Transaction, Administration
-- =====================================================

-- =====================================================
-- PHASE 1: SUPPRESSION DES ANCIENS MENUS
-- =====================================================

-- Supprimer les menus existants qui vont être restructurés
DELETE FROM app_menu WHERE code IN (
    'MNU_DASHBOARD', 'MNU_MARCHES', 'MNU_REFERENTIEL', 'MNU_ADMINISTRATION',
    'MNU_MARCHES_DASH', 'MNU_OBLIGATIONS', 'MNU_ACTIONS', 'MNU_EMETTEURS',
    'MNU_UTILISATEURS', 'MNU_PARAMETRAGE', 'MNU_ROLES', 'MNU_SUB_PARAMETRAGE',
    'MNU_SCREEN_DESIGNER', 'MNU_ROLE_SCREEN_ACCESS', 'MNU_USER_ROLES', 'MNU_GESTION_MENUS'
);

-- Réinitialiser les compteurs
SELECT setval('app_menu_menu_id_seq', 1, false);

-- =====================================================
-- PHASE 2: CRÉATION DES ÉCRANS
-- =====================================================

-- --- ÉCRANS RÉFÉRENTIEL ---

-- Ecran: Gestion des Clients/Investisseurs
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_CLIENTS',
    'Gestion des Clients',
    'Gestion des investisseurs et clients du marché financier',
    'MASTER_DETAIL',
    '/api/core/investors',
    '{"create": ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"], "read": ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRADER", "ROLE_GESTIONNAIRE"], "update": ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "investorCode", "fullName", "investorType", "country", "isActive"], "icon": "users"}'::jsonb,
    '{}'::jsonb,
    'Y', NOW(), NOW(), 'system', 'system'
) ON CONFLICT (code) DO NOTHING;

-- Ecran: Gestion des Comptes Titres
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_COMPTES_TITRES',
    'Comptes Titres',
    'Gestion des comptes titres des investisseurs',
    'MASTER_DETAIL',
    '/api/core/securities-accounts',
    '{"create": ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"], "read": ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRADER", "ROLE_GESTIONNAIRE"], "update": ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "accountNumber", "investorName", "status", "accountType", "isActive"], "icon": "document-chart-bar"}'::jsonb,
    '{}'::jsonb,
    'Y', NOW(), NOW(), 'system', 'system'
) ON CONFLICT (code) DO NOTHING;

-- Ecran: Gestion des Comptes Espèces
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_COMPTES_ESPECES',
    'Comptes Espèces',
    'Gestion des comptes espèces des investisseurs',
    'MASTER_DETAIL',
    '/api/core/cash-accounts',
    '{"create": ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"], "read": ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRADER", "ROLE_GESTIONNAIRE"], "update": ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "accountNumber", "investorName", "balance", "currency", "status", "isActive"], "icon": "banknotes"}'::jsonb,
    '{}'::jsonb,
    'Y', NOW(), NOW(), 'system', 'system'
) ON CONFLICT (code) DO NOTHING;

-- Ecran: Gestion des Obligations
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_BONDS',
    'Gestion des Obligations',
    'Gestion du référentiel des obligations BRVM',
    'MASTER_DETAIL',
    '/api/core/bonds',
    '{"create": ["ROLE_ADMIN"], "read": ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRADER", "ROLE_GESTIONNAIRE", "ROLE_ANALYSTE"], "update": ["ROLE_ADMIN"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "bondCode", "isinCode", "issuerName", "maturityDate", "couponRate", "status", "isActive"], "icon": "document-text"}'::jsonb,
    '{}'::jsonb,
    'Y', NOW(), NOW(), 'system', 'system'
) ON CONFLICT (code) DO NOTHING;

-- --- ÉCRANS TRANSACTION ---

-- Ecran: Achat/Vente d'Obligations
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_TRANSACTIONS_BONDS',
    'Transactions Obligations',
    'Saisie et gestion des achats et ventes d''obligations',
    'MASTER_DETAIL',
    '/api/ope/operations',
    '{"create": ["ROLE_ADMIN", "ROLE_TRADER", "ROLE_GESTIONNAIRE"], "read": ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRADER", "ROLE_GESTIONNAIRE"], "update": ["ROLE_ADMIN", "ROLE_TRADER"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "operationNumber", "operationType", "bondCode", "direction", "quantity", "price", "netAmount", "status", "operationDate"], "icon": "arrow-right-left"}'::jsonb,
    '{}'::jsonb,
    'Y', NOW(), NOW(), 'system', 'system'
) ON CONFLICT (code) DO NOTHING;

-- Ecran: Positions Titres
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_POSITIONS_TITRES',
    'Positions Titres',
    'Suivi des positions en titres par compte',
    'GRID',
    '/api/ope/security-positions',
    '{"create": ["ROLE_ADMIN", "ROLE_TRADER"], "read": ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRADER", "ROLE_GESTIONNAIRE"], "update": ["ROLE_ADMIN", "ROLE_TRADER"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "accountNumber", "bondCode", "isinCode", "quantity", "averageCost", "currentPrice", "marketValue", "unrealizedGainLoss", "positionStatus"], "icon": "chart-bar"}'::jsonb,
    '{}'::jsonb,
    'Y', NOW(), NOW(), 'system', 'system'
) ON CONFLICT (code) DO NOTHING;

-- --- ÉCRANS ADMINISTRATION ---

-- Réutiliser les écrans existants pour administration
-- SCR_UTILISATEURS, SCR_ROLES, SCR_MENU_MANAGER, SCR_USER_ROLES existent déjà

-- =====================================================
-- PHASE 3: CRÉATION DE LA STRUCTURE DES MENUS
-- =====================================================

-- --- MENUS PRINCIPAUX (racine) ---

INSERT INTO app_menu (code, label, icon, route, screen_code, display_order, is_active, role_required, created_at, updated_at, created_by, updated_by)
VALUES 
    ('MNU_REFERENTIEL', 'Referentiel', 'book-open', NULL, NULL, 1, 'Y', NULL, NOW(), NOW(), 'system', 'system'),
    ('MNU_TRANSACTION', 'Transaction', 'arrow-right-left', NULL, NULL, 2, 'Y', NULL, NOW(), NOW(), 'system', 'system'),
    ('MNU_ADMINISTRATION', 'Administration', 'cog-6-tooth', NULL, NULL, 3, 'Y', 'ROLE_ADMIN', NOW(), NOW(), 'system', 'system');

-- --- SOUS-MENUS RÉFÉRENTIEL ---

INSERT INTO app_menu (code, label, icon, route, screen_code, display_order, is_active, role_required, parent_id, created_at, updated_at, created_by, updated_by)
VALUES 
    ('MNU_CLIENTS', 'Clients', 'users', '/referentiel/clients', 'SCR_CLIENTS', 1, 'Y', NULL, (SELECT menu_id FROM app_menu WHERE code = 'MNU_REFERENTIEL'), NOW(), NOW(), 'system', 'system'),
    ('MNU_COMPTES_TITRES', 'Comptes Titres', 'document-chart-bar', '/referentiel/comptes-titres', 'SCR_COMPTES_TITRES', 2, 'Y', NULL, (SELECT menu_id FROM app_menu WHERE code = 'MNU_REFERENTIEL'), NOW(), NOW(), 'system', 'system'),
    ('MNU_COMPTES_ESPECES', 'Comptes Espèces', 'banknotes', '/referentiel/comptes-especes', 'SCR_COMPTES_ESPECES', 3, 'Y', NULL, (SELECT menu_id FROM app_menu WHERE code = 'MNU_REFERENTIEL'), NOW(), NOW(), 'system', 'system'),
    ('MNU_OBLIGATIONS', 'Obligations', 'document-text', '/referentiel/obligations', 'SCR_BONDS', 4, 'Y', NULL, (SELECT menu_id FROM app_menu WHERE code = 'MNU_REFERENTIEL'), NOW(), NOW(), 'system', 'system');

-- --- SOUS-MENUS TRANSACTION ---

INSERT INTO app_menu (code, label, icon, route, screen_code, display_order, is_active, role_required, parent_id, created_at, updated_at, created_by, updated_by)
VALUES 
    ('MNU_TRANSACTIONS_BONDS', 'Achat/Vente Obligations', 'arrow-right-left', '/transaction/obligations', 'SCR_TRANSACTIONS_BONDS', 1, 'Y', NULL, (SELECT menu_id FROM app_menu WHERE code = 'MNU_TRANSACTION'), NOW(), NOW(), 'system', 'system'),
    ('MNU_POSITIONS_TITRES', 'Positions Titres', 'chart-bar', '/transaction/positions-titres', 'SCR_POSITIONS_TITRES', 2, 'Y', NULL, (SELECT menu_id FROM app_menu WHERE code = 'MNU_TRANSACTION'), NOW(), NOW(), 'system', 'system');

-- --- SOUS-MENUS ADMINISTRATION ---

INSERT INTO app_menu (code, label, icon, route, screen_code, display_order, is_active, role_required, parent_id, created_at, updated_at, created_by, updated_by)
VALUES 
    ('MNU_UTILISATEURS', 'Gestion des Utilisateurs', 'users', '/admin/utilisateurs', 'SCR_UTILISATEURS', 1, 'Y', 'ROLE_ADMIN', (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'), NOW(), NOW(), 'system', 'system'),
    ('MNU_ROLES', 'Gestion des Rôles', 'shield-check', '/admin/roles', 'SCR_ROLES', 2, 'Y', 'ROLE_ADMIN', (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'), NOW(), NOW(), 'system', 'system'),
    ('MNU_GESTION_MENUS', 'Gestion des Menus', 'squares-plus', '/admin/menu-manager', 'SCR_MENU_MANAGER', 3, 'Y', 'ROLE_ADMIN', (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'), NOW(), NOW(), 'system', 'system'),
    ('MNU_AFFECTATION_ROLES', 'Affectation des Rôles', 'user-group', '/admin/affectation-roles', 'SCR_USER_ROLES', 4, 'Y', 'ROLE_ADMIN', (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'), NOW(), NOW(), 'system', 'system');

-- =====================================================
-- PHASE 4: ASSIGNATION DES ÉCRANS AUX RÔLES
-- =====================================================

DO $$
DECLARE
    admin_role_id BIGINT;
    trader_role_id BIGINT;
    gestionnaire_role_id BIGINT;
    user_role_id BIGINT;
BEGIN
    -- Récupérer les IDs des rôles
    SELECT role_id INTO admin_role_id FROM app_role WHERE role_name = 'ROLE_ADMIN';
    SELECT role_id INTO trader_role_id FROM app_role WHERE role_name = 'ROLE_TRADER';
    SELECT role_id INTO gestionnaire_role_id FROM app_role WHERE role_name = 'ROLE_GESTIONNAIRE';
    SELECT role_id INTO user_role_id FROM app_role WHERE role_name = 'ROLE_USER';
    
    -- Donner accès à ADMIN (tous les écrans)
    IF admin_role_id IS NOT NULL THEN
        FOR scr_id IN SELECT screen_id FROM ui_screen WHERE code IN (
            'SCR_CLIENTS', 'SCR_COMPTES_TITRES', 'SCR_COMPTES_ESPECES', 'SCR_BONDS',
            'SCR_TRANSACTIONS_BONDS', 'SCR_POSITIONS_TITRES',
            'SCR_UTILISATEURS', 'SCR_ROLES', 'SCR_MENU_MANAGER', 'SCR_USER_ROLES'
        )
        LOOP
            INSERT INTO role_screen_access (role_id, screen_id, access_level, is_active, created_at, updated_at, created_by, updated_by)
            VALUES (admin_role_id, scr_id, 'FULL', 'Y', NOW(), NOW(), 'system', 'system')
            ON CONFLICT DO NOTHING;
        END LOOP;
    END IF;
    
    -- Donner accès à TRADER (transactions, positions)
    IF trader_role_id IS NOT NULL THEN
        FOR scr_id IN SELECT screen_id FROM ui_screen WHERE code IN (
            'SCR_BONDS', 'SCR_TRANSACTIONS_BONDS', 'SCR_POSITIONS_TITRES'
        )
        LOOP
            INSERT INTO role_screen_access (role_id, screen_id, access_level, is_active, created_at, updated_at, created_by, updated_by)
            VALUES (trader_role_id, scr_id, 'WRITE', 'Y', NOW(), NOW(), 'system', 'system')
            ON CONFLICT DO NOTHING;
        END LOOP;
    END IF;
    
    -- Donner accès à GESTIONNAIRE (référentiel complet)
    IF gestionnaire_role_id IS NOT NULL THEN
        FOR scr_id IN SELECT screen_id FROM ui_screen WHERE code IN (
            'SCR_CLIENTS', 'SCR_COMPTES_TITRES', 'SCR_COMPTES_ESPECES', 'SCR_BONDS',
            'SCR_TRANSACTIONS_BONDS', 'SCR_POSITIONS_TITRES'
        )
        LOOP
            INSERT INTO role_screen_access (role_id, screen_id, access_level, is_active, created_at, updated_at, created_by, updated_by)
            VALUES (gestionnaire_role_id, scr_id, 'WRITE', 'Y', NOW(), NOW(), 'system', 'system')
            ON CONFLICT DO NOTHING;
        END LOOP;
    END IF;
    
    -- Donner accès à USER (lecture seule référentiel)
    IF user_role_id IS NOT NULL THEN
        FOR scr_id IN SELECT screen_id FROM ui_screen WHERE code IN (
            'SCR_CLIENTS', 'SCR_COMPTES_TITRES', 'SCR_COMPTES_ESPECES', 'SCR_BONDS',
            'SCR_POSITIONS_TITRES'
        )
        LOOP
            INSERT INTO role_screen_access (role_id, screen_id, access_level, is_active, created_at, updated_at, created_by, updated_by)
            VALUES (user_role_id, scr_id, 'READ', 'Y', NOW(), NOW(), 'system', 'system')
            ON CONFLICT DO NOTHING;
        END LOOP;
    END IF;
END $$;

-- =====================================================
-- PHASE 5: VÉRIFICATION
-- =====================================================

SELECT '=== NOUVELLE STRUCTURE DES MENUS ===' AS info;

-- Afficher l'arborescence
WITH RECURSIVE menu_tree AS (
    SELECT 
        m.menu_id,
        m.code,
        m.label,
        m.icon,
        m.route,
        m.screen_code,
        m.display_order,
        m.parent_id,
        0 AS level,
        m.menu_id::text AS path
    FROM app_menu m
    WHERE m.parent_id IS NULL
    
    UNION ALL
    
    SELECT 
        m.menu_id,
        m.code,
        m.label,
        m.icon,
        m.route,
        m.screen_code,
        m.display_order,
        m.parent_id,
        mt.level + 1,
        mt.path || '->' || m.menu_id::text
    FROM app_menu m
    INNER JOIN menu_tree mt ON m.parent_id = mt.menu_id
)
SELECT 
    REPEAT('   ', level) || label AS menu_hierarchy,
    code,
    icon,
    route,
    screen_code
FROM menu_tree
ORDER BY path;

SELECT '=== ÉCRANS CRÉÉS ===' AS info;
SELECT code, title, api_base_url FROM ui_screen WHERE code IN (
    'SCR_CLIENTS', 'SCR_COMPTES_TITRES', 'SCR_COMPTES_ESPECES', 'SCR_BONDS',
    'SCR_TRANSACTIONS_BONDS', 'SCR_POSITIONS_TITRES'
);

SELECT '=== NOMBRE DE MENUS ===' AS info;
SELECT COUNT(*) AS total_menus FROM app_menu;
