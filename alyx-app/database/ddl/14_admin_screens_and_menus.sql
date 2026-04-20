-- =====================================================
-- Script: 14_admin_screens_and_menus.sql (CORRIGÉ)
-- Description: Écrans et menus pour l'administration des rôles
-- =====================================================

-- Supprimer les écrans mal créés s'ils existent
DELETE FROM ui_screen WHERE code IN ('SCR_ROLES', 'SCR_USER_ROLES', 'SCR_SCREEN_DESIGNER', 'SCR_ROLE_SCREEN_ACCESS');

-- -----------------------------------------------------
-- 1. ÉCRANS (Screens) - Types valides: MASTER_DETAIL, GRID, ANALYTICS
-- -----------------------------------------------------

-- Screen: Gestion des Rôles
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_ROLES',
    'Gestion des Rôles',
    'Interface pour créer, modifier et supprimer les rôles système ainsi que leur assignation aux écrans',
    'MASTER_DETAIL',
    '/api/security/roles',
    '{"create": ["ROLE_ADMIN"], "read": ["ROLE_ADMIN", "ROLE_USER"], "update": ["ROLE_ADMIN"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["id", "roleName", "roleDescription", "roleType", "isActive", "screenCount"], "icon": "shield-check"}'::jsonb,
    '{}'::jsonb,
    'Y',
    NOW(),
    NOW(),
    'system',
    'system'
);

-- Screen: Attribution Rôles aux Utilisateurs
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_USER_ROLES',
    'Attribution des Rôles',
    'Interface pour assigner et désassigner les rôles aux utilisateurs',
    'MASTER_DETAIL',
    '/api/security/roles/assignments',
    '{"create": ["ROLE_ADMIN"], "read": ["ROLE_ADMIN"], "update": ["ROLE_ADMIN"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["userId", "username", "fullName", "email", "roles"], "icon": "user-group"}'::jsonb,
    '{}'::jsonb,
    'Y',
    NOW(),
    NOW(),
    'system',
    'system'
);

-- Screen: Permissions des Écrans par Rôle
INSERT INTO ui_screen (code, title, description, template_type, api_base_url, permissions, grid_config, analytics_config, is_active, created_at, updated_at, created_by, updated_by)
VALUES (
    'SCR_ROLE_SCREEN_ACCESS',
    'Permissions des Écrans',
    'Configuration des droits d''accès aux écrans par rôle',
    'GRID',
    '/api/security/roles/screens',
    '{"create": ["ROLE_ADMIN"], "read": ["ROLE_ADMIN"], "update": ["ROLE_ADMIN"], "delete": ["ROLE_ADMIN"]}'::jsonb,
    '{"columns": ["roleName", "screenCode", "screenTitle", "accessLevel"], "icon": "lock-closed"}'::jsonb,
    '{}'::jsonb,
    'Y',
    NOW(),
    NOW(),
    'system',
    'system'
);

-- -----------------------------------------------------
-- 2. COMPOSANTS UI (pour SCR_ROLES)
-- -----------------------------------------------------
DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_ROLES';
    
    DELETE FROM ui_component WHERE screen_id = scr_id;
    
    INSERT INTO ui_component (screen_id, field_key, label, component_type, placeholder, is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column, display_order, grid_col_span, validation_regex, validation_msg, options_source, options_json, visibility_rule, format_pattern, created_at, updated_at, created_by, updated_by)
    VALUES 
        (scr_id, 'id', 'ID', 'TEXT', NULL, 'N', 'Y', 'Y', 'Y', 'N', 'N', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'roleName', 'Nom du Rôle', 'TEXT', 'Entrez le nom du rôle', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'roleDescription', 'Description', 'TEXTAREA', 'Description du rôle', 'N', 'N', 'Y', 'N', 'N', 'Y', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'roleType', 'Type', 'SELECT', NULL, 'Y', 'N', 'Y', 'N', 'N', 'Y', 3, 1, NULL, NULL, 'STATIC', '{"options": [{"value": "SYSTEM", "label": "Systeme"}, {"value": "CUSTOM", "label": "Personnalise"}]}'::jsonb, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'isActive', 'Actif', 'SELECT', NULL, 'N', 'N', 'Y', 'N', 'N', 'Y', 4, 1, NULL, NULL, 'STATIC', '{"options": [{"value": "Y", "label": "Oui"}, {"value": "N", "label": "Non"}]}'::jsonb, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'screenCount', 'Ecrans', 'NUMBER', NULL, 'N', 'Y', 'Y', 'N', 'N', 'Y', 5, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system');
END $$;

-- -----------------------------------------------------
-- 3. COMPOSANTS UI (pour SCR_USER_ROLES)
-- -----------------------------------------------------
DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_USER_ROLES';
    
    DELETE FROM ui_component WHERE screen_id = scr_id;
    
    INSERT INTO ui_component (screen_id, field_key, label, component_type, placeholder, is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column, display_order, grid_col_span, validation_regex, validation_msg, options_source, options_json, visibility_rule, format_pattern, created_at, updated_at, created_by, updated_by)
    VALUES 
        (scr_id, 'userId', 'ID Utilisateur', 'TEXT', NULL, 'N', 'Y', 'N', 'N', 'N', 'N', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'username', 'Nom utilisateur', 'TEXT', NULL, 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'fullName', 'Nom Complet', 'TEXT', NULL, 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'email', 'Email', 'TEXT', NULL, 'N', 'Y', 'Y', 'N', 'N', 'Y', 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'roles', 'Rôles Assignes', 'TEXT', NULL, 'Y', 'N', 'Y', 'N', 'N', 'Y', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'isActive', 'Actif', 'SELECT', NULL, 'N', 'Y', 'Y', 'N', 'N', 'Y', 5, 1, NULL, NULL, 'STATIC', '{"options": [{"value": "Y", "label": "Oui"}, {"value": "N", "label": "Non"}]}'::jsonb, NULL, NULL, NOW(), NOW(), 'system', 'system');
END $$;

-- -----------------------------------------------------
-- 4. COMPOSANTS UI (pour SCR_ROLE_SCREEN_ACCESS)
-- -----------------------------------------------------
DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_ROLE_SCREEN_ACCESS';
    
    DELETE FROM ui_component WHERE screen_id = scr_id;
    
    INSERT INTO ui_component (screen_id, field_key, label, component_type, placeholder, is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column, display_order, grid_col_span, validation_regex, validation_msg, options_source, options_json, visibility_rule, format_pattern, created_at, updated_at, created_by, updated_by)
    VALUES 
        (scr_id, 'accessId', 'ID Accès', 'TEXT', NULL, 'N', 'Y', 'Y', 'Y', 'N', 'N', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'screenId', 'ID Ecran', 'TEXT', NULL, 'N', 'Y', 'N', 'N', 'N', 'N', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'screenCode', 'Code Ecran', 'TEXT', NULL, 'N', 'Y', 'Y', 'Y', 'Y', 'Y', 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'screenTitle', 'Titre Ecran', 'TEXT', NULL, 'N', 'Y', 'Y', 'Y', 'N', 'Y', 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'accessLevel', 'Niveau Acces', 'SELECT', NULL, 'Y', 'N', 'Y', 'N', 'N', 'Y', 4, 1, NULL, NULL, 'STATIC', '{"options": [{"value": "NONE", "label": "Aucun"}, {"value": "READ", "label": "Lecture"}, {"value": "WRITE", "label": "Ecriture"}, {"value": "FULL", "label": "Complet"}]}'::jsonb, NULL, NULL, NOW(), NOW(), 'system', 'system'),
        (scr_id, 'isActive', 'Actif', 'SELECT', NULL, 'N', 'N', 'Y', 'N', 'N', 'Y', 5, 1, NULL, NULL, 'STATIC', '{"options": [{"value": "Y", "label": "Oui"}, {"value": "N", "label": "Non"}]}'::jsonb, NULL, NULL, NOW(), NOW(), 'system', 'system');
END $$;

-- -----------------------------------------------------
-- 5. ASSIGNATION ÉCRANS AUX RÔLES (ROLE_ADMIN)
-- -----------------------------------------------------
DO $$
DECLARE
    admin_role_id BIGINT;
    scr_id BIGINT;
BEGIN
    SELECT role_id INTO admin_role_id FROM app_role WHERE role_name = 'ROLE_ADMIN';
    
    IF admin_role_id IS NOT NULL THEN
        FOR scr_id IN SELECT screen_id FROM ui_screen WHERE code IN ('SCR_ROLES', 'SCR_USER_ROLES', 'SCR_ROLE_SCREEN_ACCESS')
        LOOP
            INSERT INTO role_screen_access (role_id, screen_id, access_level, is_active, created_at, updated_at, created_by, updated_by)
            VALUES (admin_role_id, scr_id, 'FULL', 'Y', NOW(), NOW(), 'system', 'system')
            ON CONFLICT DO NOTHING;
        END LOOP;
    END IF;
END $$;

-- -----------------------------------------------------
-- 6. VÉRIFICATION
-- -----------------------------------------------------
SELECT '=== NOUVEAUX ÉCRANS ===' AS info;
SELECT screen_id, code, title, template_type FROM ui_screen WHERE code LIKE 'SCR_%' ORDER BY screen_id;

SELECT '=== NOUVEAUX MENUS ===' AS info;
SELECT menu_id, code, label, parent_id FROM app_menu WHERE parent_id = 4 OR code LIKE 'MNU_%' ORDER BY menu_id;

SELECT '=== COMPOSANTS PAR ÉCRAN ===' AS info;
SELECT s.code AS screen, COUNT(c.component_id) AS nb_composants
FROM ui_screen s
LEFT JOIN ui_component c ON s.screen_id = c.screen_id
WHERE s.code IN ('SCR_ROLES', 'SCR_USER_ROLES', 'SCR_ROLE_SCREEN_ACCESS')
GROUP BY s.code
ORDER BY s.code;
