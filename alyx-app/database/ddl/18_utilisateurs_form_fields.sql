-- =====================================================
-- Script: 18_utilisateurs_form_fields.sql
-- Description: Ajoute le champ mot de passe (formulaire seulement)
--              et configure les actions du DataGrid pour SCR_UTILISATEURS
-- =====================================================

DO $$
DECLARE
    scr_id BIGINT;
BEGIN
    SELECT screen_id INTO scr_id FROM ui_screen WHERE code = 'SCR_UTILISATEURS';

    IF scr_id IS NULL THEN
        RAISE EXCEPTION 'SCR_UTILISATEURS introuvable';
    END IF;

    -- 1. Champ password (affiché dans le formulaire, pas dans la grille)
    INSERT INTO ui_component (
        screen_id, field_key, label, component_type, placeholder,
        is_required, is_readonly, is_visible, is_sortable, is_filterable, is_grid_column,
        display_order, grid_col_span,
        created_at, updated_at, created_by, updated_by
    )
    SELECT scr_id, 'password', 'Mot de passe', 'PASSWORD',
           'Minimum 6 caractères',
           'Y', 'N', 'Y', 'N', 'N', 'N',
           15, 12,
           NOW(), NOW(), 'system', 'system'
    WHERE NOT EXISTS (
        SELECT 1 FROM ui_component WHERE screen_id = scr_id AND field_key = 'password'
    );

    -- 2. Mettre à jour le grid_config pour ajouter les actions (Modifier / Supprimer / Activer)
    UPDATE ui_screen
    SET grid_config = '{
      "pageSize": 20,
      "defaultSort": "fullName",
      "defaultSortDir": "asc",
      "actions": [
        {"key": "edit",   "label": "Modifier",   "icon": "pencil",   "color": "amber"},
        {"key": "toggle", "label": "Activer/Désactiver", "icon": "power", "color": "blue"},
        {"key": "delete", "label": "Supprimer",  "icon": "trash",    "color": "red",  "confirmRequired": true}
      ]
    }'::jsonb
    WHERE screen_id = scr_id;

    RAISE NOTICE 'SCR_UTILISATEURS mis à jour (password + actions)';
END $$;

-- Vérification
SELECT field_key, label, component_type, is_grid_column, is_visible, display_order
FROM ui_component
WHERE screen_id = (SELECT screen_id FROM ui_screen WHERE code = 'SCR_UTILISATEURS')
ORDER BY display_order;

SELECT grid_config FROM ui_screen WHERE code = 'SCR_UTILISATEURS';
