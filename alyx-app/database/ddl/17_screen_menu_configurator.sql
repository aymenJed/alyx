-- =====================================================
-- Script: 17_screen_menu_configurator.sql
-- Description: Écran pour paramétrer/graphiquement les menus et sous-menus
-- =====================================================

-- =====================================================
-- PHASE 1: ÉCRAN (Screen)
-- =====================================================

DELETE FROM ui_screen WHERE code = 'SCR_MENU_CONFIGURATOR';

INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_MENU_CONFIGURATOR',
    'Parametrage Menu',
    'Interface graphique pour configurer et organiser les menus et sous-menus de l''application',
    'MASTER_DETAIL',
    '/api/metadata/menu',
    '{"create": ["ROLE_ADMIN"], "read": ["ROLE_ADMIN"], "update": ["ROLE_ADMIN"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "code", "label", "parentLabel", "icon", "route", "screenCode", "displayOrder", "isActive", "roleRequired", "childrenCount"], "icon": "squares-plus", "masterDetail": true, "showTree": true}'::jsonb,
    '{}'::jsonb,
    'Y',
    NOW(),
    NOW(),
    'system',
    'system'
);

-- =====================================================
-- PHASE 2: COMPOSANTS UI (pour SCR_MENU_CONFIGURATOR)
-- =====================================================

DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_MENU_CONFIGURATOR';
    
    DELETE FROM ui_component WHERE screen_id = scr_id;
    
    -- === CHAMPS DU FORMULAIRE (FORM) ===
    INSERT INTO ui_component (screen_id, field_key, label, component_type, placeholder, is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column, display_order, grid_col_span, validation_regex, validation_msg, options_source, options_json, visibility_rule, format_pattern, created_at, updated_at, created_by, updated_by)
    VALUES 
        -- ID (caché)
        (scr_id, 'id', 'ID', 'TEXT', NULL, 'N', 'Y', 'N', 'N', 'N', 'N', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Code Menu (obligatoire)
        (scr_id, 'code', 'Code Menu', 'TEXT', 'Ex: MNU_MON_MENU', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 1, 2, '^[A-Z0-9_]+$', 'Majuscules et underscores uniquement (ex: MNU_EXEMPLE)', NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Libellé (obligatoire)
        (scr_id, 'label', 'Libelle', 'TEXT', 'Ex: Mon Menu', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Menu Parent (pour sous-menus)
        (scr_id, 'parentId', 'Menu Parent', 'SELECT', 'Selectionnez le menu parent', 'N', 'N', 'Y', 'N', 'N', 'Y', 3, 3, NULL, NULL, 'API', NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Label Parent (affichage)
        (scr_id, 'parentLabel', 'Parent Selectionne', 'TEXT', NULL, 'N', 'Y', 'N', 'N', 'N', 'N', 4, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Icône
        (scr_id, 'icon', 'Icone', 'TEXT', 'Ex: home, users, chart-bar', 'N', 'N', 'Y', 'N', 'N', 'Y', 5, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Route URL
        (scr_id, 'route', 'Route URL', 'TEXT', 'Ex: /marches/obligations', 'N', 'N', 'Y', 'N', 'N', 'Y', 6, 3, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Code Écran lié
        (scr_id, 'screenCode', 'Code Ecran Lie', 'SELECT', 'Selectionnez un ecran', 'N', 'N', 'Y', 'N', 'N', 'Y', 7, 3, NULL, NULL, 'API', NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Ordre d'affichage
        (scr_id, 'displayOrder', 'Ordre d''affichage', 'NUMBER', '1', 'N', 'N', 'Y', 'Y', 'N', 'Y', 8, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Actif/Inactif
        (scr_id, 'isActive', 'Statut', 'SELECT', NULL, 'N', 'N', 'Y', 'Y', 'N', 'Y', 9, 2, NULL, NULL, 'STATIC', '{"options": [{"value": "Y", "label": "Actif"}, {"value": "N", "label": "Inactif"}]}'::jsonb, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Rôle requis
        (scr_id, 'roleRequired', 'Role Requis', 'SELECT', 'Aucun role requis', 'N', 'N', 'Y', 'N', 'N', 'Y', 10, 3, NULL, NULL, 'API', NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        
        -- Nombre d'enfants (caché)
        (scr_id, 'childrenCount', 'Nb Enfants', 'TEXT', NULL, 'N', 'Y', 'N', 'N', 'N', 'N', 11, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system');
END $$;

-- =====================================================
-- PHASE 3: MENU
-- =====================================================

DELETE FROM app_menu WHERE code = 'MNU_PARAM_MENU';

INSERT INTO app_menu (code, label, icon, route, screen_code, display_order, is_active, role_required, parent_id, created_at, updated_at, created_by, updated_by)
VALUES (
    'MNU_PARAM_MENU',
    'Parametrage Menu',
    'squares-plus',
    '/admin/param-menu',
    'SCR_MENU_CONFIGURATOR',
    5,
    'Y',
    'ROLE_ADMIN',
    (SELECT menu_id FROM app_menu WHERE code = 'MNU_ADMINISTRATION'),
    NOW(),
    NOW(),
    'system',
    'system'
);

-- =====================================================
-- PHASE 4: ASSIGNATION AU RÔLE ADMIN
-- =====================================================

DO $$
DECLARE
    admin_role_id BIGINT;
    scr_id BIGINT;
BEGIN
    SELECT role_id INTO admin_role_id FROM app_role WHERE role_name = 'ROLE_ADMIN';
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_MENU_CONFIGURATOR';
    
    IF admin_role_id IS NOT NULL AND scr_id IS NOT NULL THEN
        INSERT INTO role_screen_access (role_id, screen_id, access_level, is_active, created_at, updated_at, created_by, updated_by)
        VALUES (admin_role_id, scr_id, 'FULL', 'Y', NOW(), NOW(), 'system', 'system')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- =====================================================
-- PHASE 5: VÉRIFICATION
-- =====================================================

SELECT '=== ÉCRAN CRÉÉ ===' AS info;
SELECT screen_id, code, title, template_type, api_base_url 
FROM ui_screen 
WHERE code = 'SCR_MENU_CONFIGURATOR';

SELECT '=== COMPOSANTS ===' AS info;
SELECT 
    field_key, 
    label, 
    component_type,
    is_required,
    is_grid_column,
    display_order 
FROM ui_component 
WHERE screen_id = (SELECT screen_id FROM ui_screen WHERE code = 'SCR_MENU_CONFIGURATOR')
ORDER BY display_order;

SELECT '=== MENU CRÉÉ ===' AS info;
SELECT 
    m.menu_id,
    m.code,
    m.label,
    m.icon,
    m.route,
    m.screen_code,
    p.label AS parent_menu
FROM app_menu m
LEFT JOIN app_menu p ON m.parent_id = p.menu_id
WHERE m.code = 'MNU_PARAM_MENU';

SELECT '=== ARBORESCENCE COMPLÈTE ===' AS info;

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
