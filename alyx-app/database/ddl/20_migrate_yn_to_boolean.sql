-- ============================================================
-- Migration : conversion des colonnes char(1) Y/N → boolean
-- Idempotent : ignoré si la colonne est déjà boolean
-- ============================================================

BEGIN;

-- Fonction utilitaire : convertit la colonne seulement si elle n'est pas déjà boolean
CREATE OR REPLACE FUNCTION migrate_col_to_bool(
    p_table  text,
    p_col    text,
    p_default boolean
) RETURNS void LANGUAGE plpgsql AS $$
DECLARE
    v_constraint text;
BEGIN
    -- Vérifier que la colonne est encore de type character / varchar
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name  = lower(p_table)
          AND column_name = lower(p_col)
          AND data_type IN ('character', 'character varying', 'text')
    ) THEN
        -- Supprimer tous les CHECK constraints portant sur cette colonne
        FOR v_constraint IN
            SELECT tc.constraint_name
            FROM information_schema.constraint_column_usage ccu
            JOIN information_schema.table_constraints tc
              ON tc.constraint_name = ccu.constraint_name
             AND tc.table_name      = ccu.table_name
            WHERE ccu.table_name  = lower(p_table)
              AND ccu.column_name = lower(p_col)
              AND tc.constraint_type = 'CHECK'
        LOOP
            EXECUTE format('ALTER TABLE %I DROP CONSTRAINT IF EXISTS %I', p_table, v_constraint);
            RAISE NOTICE 'Constraint supprimée : %.%', p_table, v_constraint;
        END LOOP;

        EXECUTE format('ALTER TABLE %I ALTER COLUMN %I DROP DEFAULT', p_table, p_col);
        EXECUTE format(
            $sql$ALTER TABLE %I ALTER COLUMN %I TYPE boolean
                 USING (CASE WHEN %I::text IN ('Y', 'y', 'true', 't', '1') THEN true ELSE false END)$sql$,
            p_table, p_col, p_col
        );
        EXECUTE format(
            'ALTER TABLE %I ALTER COLUMN %I SET DEFAULT %s',
            p_table, p_col, CASE WHEN p_default THEN 'true' ELSE 'false' END
        );
        RAISE NOTICE 'Migré : %.%', p_table, p_col;
    ELSE
        RAISE NOTICE 'Ignoré (déjà boolean ou inexistant) : %.%', p_table, p_col;
    END IF;
END;
$$;

-- ── app_user ──────────────────────────────────────────────────
SELECT migrate_col_to_bool('app_user', 'is_active', true);

-- ── app_group ─────────────────────────────────────────────────
SELECT migrate_col_to_bool('app_group', 'is_active', true);

-- ── app_option_regionale ──────────────────────────────────────
SELECT migrate_col_to_bool('app_option_regionale', 'is_active', true);

-- ── app_profil_organisationnel ────────────────────────────────
SELECT migrate_col_to_bool('app_profil_organisationnel', 'is_active', true);

-- ── app_profil_groupe ─────────────────────────────────────────
SELECT migrate_col_to_bool('app_profil_groupe', 'is_active', true);

-- ── app_role ──────────────────────────────────────────────────
SELECT migrate_col_to_bool('app_role', 'is_active', true);

-- ── user_role ─────────────────────────────────────────────────
SELECT migrate_col_to_bool('user_role', 'is_active', true);

-- ── role_screen_access ────────────────────────────────────────
SELECT migrate_col_to_bool('role_screen_access', 'is_active', true);

-- ── app_menu ──────────────────────────────────────────────────
SELECT migrate_col_to_bool('app_menu', 'is_active', true);

-- ── ui_screen ─────────────────────────────────────────────────
SELECT migrate_col_to_bool('ui_screen', 'is_active',              true);
SELECT migrate_col_to_bool('ui_screen', 'server_cache',           false);
SELECT migrate_col_to_bool('ui_screen', 'client_cache',           false);
SELECT migrate_col_to_bool('ui_screen', 'maximized',              false);
SELECT migrate_col_to_bool('ui_screen', 'has_navigation_bar',     true);
SELECT migrate_col_to_bool('ui_screen', 'is_split_view',          false);
SELECT migrate_col_to_bool('ui_screen', 'checkbox_selection',     false);
SELECT migrate_col_to_bool('ui_screen', 'word_wrap',              false);
SELECT migrate_col_to_bool('ui_screen', 'disable_report_button',  false);

-- ── ui_component ──────────────────────────────────────────────
SELECT migrate_col_to_bool('ui_component', 'is_required',    false);
SELECT migrate_col_to_bool('ui_component', 'is_readonly',    false);
SELECT migrate_col_to_bool('ui_component', 'is_visible',     true);
SELECT migrate_col_to_bool('ui_component', 'is_sortable',    true);
SELECT migrate_col_to_bool('ui_component', 'is_filterable',  false);
SELECT migrate_col_to_bool('ui_component', 'is_grid_column', true);
SELECT migrate_col_to_bool('ui_component', 'fire_on_change', false);
SELECT migrate_col_to_bool('ui_component', 'date_only',      true);

-- ── ui_action ─────────────────────────────────────────────────
SELECT migrate_col_to_bool('ui_action', 'is_enabled',         true);
SELECT migrate_col_to_bool('ui_action', 'require_validation', false);
SELECT migrate_col_to_bool('ui_action', 'require_selection',  false);
SELECT migrate_col_to_bool('ui_action', 'with_confirmation',  false);
SELECT migrate_col_to_bool('ui_action', 'end_action',         false);
SELECT migrate_col_to_bool('ui_action', 'kb_ctrl',            false);
SELECT migrate_col_to_bool('ui_action', 'kb_alt',             false);
SELECT migrate_col_to_bool('ui_action', 'kb_shift',           false);

-- ── ui_column ─────────────────────────────────────────────────
SELECT migrate_col_to_bool('ui_column', 'is_sortable',   true);
SELECT migrate_col_to_bool('ui_column', 'is_filterable', false);
SELECT migrate_col_to_bool('ui_column', 'is_editable',   false);
SELECT migrate_col_to_bool('ui_column', 'is_visible',    true);

-- Nettoyage de la fonction utilitaire
DROP FUNCTION migrate_col_to_bool(text, text, boolean);

COMMIT;
