-- ============================================================
-- Migration 08 — Add audit columns (created_by, updated_by)
-- to all entity tables. Also adds updated_at where missing.
-- Safe to re-run: uses IF NOT EXISTS / DO blocks.
-- ============================================================

-- Helper function to add column only if it doesn't exist
-- (uses DO blocks for idempotency)

-- -------------------------------------------------------
-- APP_MENU
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='app_menu' AND column_name='created_by') THEN
        ALTER TABLE APP_MENU ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='app_menu' AND column_name='updated_by') THEN
        ALTER TABLE APP_MENU ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- UI_SCREEN
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ui_screen' AND column_name='created_by') THEN
        ALTER TABLE UI_SCREEN ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ui_screen' AND column_name='updated_by') THEN
        ALTER TABLE UI_SCREEN ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- UI_COMPONENT
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ui_component' AND column_name='created_by') THEN
        ALTER TABLE UI_COMPONENT ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ui_component' AND column_name='updated_by') THEN
        ALTER TABLE UI_COMPONENT ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- UI_USER_SHORTCUT  (also adds UPDATED_AT — was missing)
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ui_user_shortcut' AND column_name='updated_at') THEN
        ALTER TABLE UI_USER_SHORTCUT ADD COLUMN UPDATED_AT TIMESTAMP WITH TIME ZONE;
        UPDATE UI_USER_SHORTCUT SET UPDATED_AT = CREATED_AT WHERE UPDATED_AT IS NULL;
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ui_user_shortcut' AND column_name='created_by') THEN
        ALTER TABLE UI_USER_SHORTCUT ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ui_user_shortcut' AND column_name='updated_by') THEN
        ALTER TABLE UI_USER_SHORTCUT ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- USER_ROLE
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_role' AND column_name='created_by') THEN
        ALTER TABLE USER_ROLE ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_role' AND column_name='updated_by') THEN
        ALTER TABLE USER_ROLE ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- app_user
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='app_user' AND column_name='created_by') THEN
        ALTER TABLE app_user ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='app_user' AND column_name='updated_by') THEN
        ALTER TABLE app_user ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- app_role
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='app_role' AND column_name='created_by') THEN
        ALTER TABLE app_role ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='app_role' AND column_name='updated_by') THEN
        ALTER TABLE app_role ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- role_screen_access  (also adds UPDATED_AT — was missing)
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='role_screen_access' AND column_name='updated_at') THEN
        ALTER TABLE role_screen_access ADD COLUMN UPDATED_AT TIMESTAMP WITH TIME ZONE;
        UPDATE role_screen_access SET UPDATED_AT = CREATED_AT WHERE UPDATED_AT IS NULL;
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='role_screen_access' AND column_name='created_by') THEN
        ALTER TABLE role_screen_access ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='role_screen_access' AND column_name='updated_by') THEN
        ALTER TABLE role_screen_access ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- user_role_assignment  (also adds CREATED_AT/UPDATED_AT if missing)
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_role_assignment' AND column_name='created_at') THEN
        ALTER TABLE user_role_assignment ADD COLUMN CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_role_assignment' AND column_name='updated_at') THEN
        ALTER TABLE user_role_assignment ADD COLUMN UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_role_assignment' AND column_name='created_by') THEN
        ALTER TABLE user_role_assignment ADD COLUMN CREATED_BY VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_role_assignment' AND column_name='updated_by') THEN
        ALTER TABLE user_role_assignment ADD COLUMN UPDATED_BY VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- core_investor
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_investor' AND column_name='created_by') THEN
        ALTER TABLE core_investor ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_investor' AND column_name='updated_by') THEN
        ALTER TABLE core_investor ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- core_securities_account
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_securities_account' AND column_name='created_by') THEN
        ALTER TABLE core_securities_account ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_securities_account' AND column_name='updated_by') THEN
        ALTER TABLE core_securities_account ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- core_cash_account
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_cash_account' AND column_name='created_by') THEN
        ALTER TABLE core_cash_account ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_cash_account' AND column_name='updated_by') THEN
        ALTER TABLE core_cash_account ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- core_bond
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_bond' AND column_name='created_by') THEN
        ALTER TABLE core_bond ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_bond' AND column_name='updated_by') THEN
        ALTER TABLE core_bond ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- core_bond_schedule
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_bond_schedule' AND column_name='created_by') THEN
        ALTER TABLE core_bond_schedule ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='core_bond_schedule' AND column_name='updated_by') THEN
        ALTER TABLE core_bond_schedule ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- ope_operation
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ope_operation' AND column_name='created_by') THEN
        ALTER TABLE ope_operation ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ope_operation' AND column_name='updated_by') THEN
        ALTER TABLE ope_operation ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- ope_security_position
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ope_security_position' AND column_name='created_by') THEN
        ALTER TABLE ope_security_position ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ope_security_position' AND column_name='updated_by') THEN
        ALTER TABLE ope_security_position ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;

-- -------------------------------------------------------
-- ope_cash_position
-- -------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ope_cash_position' AND column_name='created_by') THEN
        ALTER TABLE ope_cash_position ADD COLUMN created_by VARCHAR(50);
    END IF;
END $$;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ope_cash_position' AND column_name='updated_by') THEN
        ALTER TABLE ope_cash_position ADD COLUMN updated_by VARCHAR(50);
    END IF;
END $$;
