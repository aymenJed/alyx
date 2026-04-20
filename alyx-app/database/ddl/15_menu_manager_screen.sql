-- =====================================================
-- Script: 15_menu_manager_screen.sql (CORRIGÉ)
-- Description: Écran complet pour gérer les menus/sous-menus dynamiquement
-- =====================================================

-- Supprimer l'écran existant et recréer
DELETE FROM ui_screen WHERE code = 'SCR_MENU_MANAGER';

-- -----------------------------------------------------
-- 1. ÉCRAN (Screen) - Template MASTER_DETAIL pour arborescence
-- -----------------------------------------------------
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_MENU_MANAGER',
    'Gestion des Menus',
    'Interface pour créer, organiser et configurer les menus et sous-menus de l''application de manière dynamique',
    'MASTER_DETAIL',
    '/api/metadata/menu',
    '{"create": ["ROLE_ADMIN"], "read": ["ROLE_ADMIN"], "update": ["ROLE_ADMIN"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "code", "label", "icon", "route", "screenCode", "displayOrder", "isActive", "childrenCount"], "icon": "squares-plus", "masterDetail": true}'::jsonb,
    '{}'::jsonb,
    'Y',
    NOW(),
    NOW(),
    'system',
    'system'
);

-- -----------------------------------------------------
-- 2. COMPOSANTS UI (pour SCR_MENU_MANAGER)
-- -----------------------------------------------------
DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_MENU_MANAGER';
    
    DELETE FROM ui_component WHERE screen_id = scr_id;
    
    -- === COLONNES DU GRID (liste principale) ===
    INSERT INTO ui_component (screen_id, field_key, label, component_type, placeholder, is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column, display_order, grid_col_span, validation_regex, validation_msg, options_source, options_json, visibility_rule, format_pattern, created_at, updated_at, created_by, updated_by)
    VALUES 
        -- ID (caché)
        (scr_id, 'id', 'ID', 'TEXT', NULL, 'N', 'Y', 'N', 'N', 'N', 'N', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Code Menu
        (scr_id, 'code', 'Code Menu', 'TEXT', 'Ex: MNU_MON_MENU', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 1, 2, '^[A-Z0-9_]+$', 'Majuscules et underscores uniquement', NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Libellé
        (scr_id, 'label', 'Libelle', 'TEXT', 'Ex: Tableau de Bord', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Icône
        (scr_id, 'icon', 'Icone', 'TEXT', 'Ex: home, chart-bar, users', 'N', 'N', 'Y', 'N', 'N', 'Y', 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Route
        (scr_id, 'route', 'Route URL', 'TEXT', 'Ex: /marches/obligations', 'N', 'N', 'Y', 'N', 'N', 'Y', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Code Écran lié
        (scr_id, 'screenCode', 'Code Ecran', 'TEXT', 'Ex: SCR_OBLIGATIONS', 'N', 'N', 'Y', 'Y', 'Y', 'Y', 5, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Ordre d'affichage
        (scr_id, 'displayOrder', 'Ordre', 'NUMBER', '1', 'N', 'N', 'Y', 'Y', 'N', 'Y', 6, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Actif
        (scr_id, 'isActive', 'Actif', 'SELECT', NULL, 'N', 'N', 'Y', 'Y', 'N', 'Y', 7, 1, NULL, NULL, 'STATIC', '{"options": [{"value": "Y", "label": "Oui"}, {"value": "N", "label": "Non"}]}'::jsonb, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Nombre d'enfants (caché mais utilisé pour l'arborescence)
        (scr_id, 'childrenCount', 'Sous-Menus', 'TEXT', NULL, 'N', 'Y', 'N', 'N', 'N', 'N', 8, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system');
END $$;

-- -----------------------------------------------------
-- 3. MISE À JOUR DU MENU
-- -----------------------------------------------------
DO $$
DECLARE
    sub_param_id BIGINT;
    scr_id BIGINT;
BEGIN
    SELECT menu_id INTO sub_param_id FROM app_menu WHERE code = 'MNU_SUB_PARAMETRAGE';
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_MENU_MANAGER';
    
    UPDATE app_menu SET 
        label = 'Gestion des Menus',
        icon = 'squares-plus',
        route = '/admin/menu-manager',
        screen_code = 'SCR_MENU_MANAGER',
        display_order = 3
    WHERE code = 'MNU_GESTION_MENUS';
END $$;

-- -----------------------------------------------------
-- 4. VÉRIFICATION
-- -----------------------------------------------------
SELECT '=== ÉCRAN MISE À JOUR ===' AS info;
SELECT screen_id, code, title, api_base_url FROM ui_screen WHERE code = 'SCR_MENU_MANAGER';

SELECT '=== COMPOSANTS ===' AS info;
SELECT field_key, label, component_type, is_grid_column, display_order 
FROM ui_component 
WHERE screen_id = (SELECT screen_id FROM ui_screen WHERE code = 'SCR_MENU_MANAGER')
ORDER BY display_order;

SELECT '=== MENU MISE À JOUR ===' AS info;
SELECT menu_id, code, label, icon, route, screen_code, display_order FROM app_menu WHERE code = 'MNU_GESTION_MENUS';

-- Afficher l'arborescence complète
SELECT 
    m.menu_id,
    REPEAT('  ', COALESCE((SELECT COUNT(*) FROM app_menu p WHERE p.menu_id = m.parent_id), 0)) || m.label AS menu_tree,
    m.code,
    m.icon,
    m.route,
    m.screen_code,
    m.display_order,
    m.is_active
FROM app_menu m
ORDER BY m.display_order;
