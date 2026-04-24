-- ============================================================
-- ALYX-APP :: SCRIPT D'INSTALLATION COMPLET
-- Exécuter dans l'ordre sur une base PostgreSQL vierge
-- psql -U alyx_user -d alyxdb -f 00_master_install.sql
-- ============================================================

-- Configuration session
SET client_encoding = 'UTF8';
SET standard_conforming_strings = ON;
SET check_function_bodies = FALSE;
SET client_min_messages = WARNING;

\echo '============================================================'
\echo 'ALYX-APP :: Installation base de données'
\echo '============================================================'

-- -------------------------------------------------------
-- TABLES METADATA (Server-Driven UI)
-- -------------------------------------------------------
\echo ''
\echo '[01] Création table APP_MENU...'
\ir 01_app_menu.sql

\echo '[02] Création table UI_SCREEN...'
\ir 02_ui_screen.sql

\echo '[03] Création table UI_COMPONENT...'
\ir 03_ui_component.sql

\echo '[04] Création table UI_USER_SHORTCUT...'
\ir 04_ui_user_shortcut.sql

-- -------------------------------------------------------
-- DONNÉES DE RÉFÉRENCE METADATA
-- -------------------------------------------------------
\echo ''
\echo '[05] Insertion données seed (écrans, composants, menus)...'
\ir 05_seed_data.sql

\echo '[06] Patch paramétrage (menu Screen Designer)...'
\ir 06_patch_parametrage.sql

-- -------------------------------------------------------
-- UTILISATEURS
-- -------------------------------------------------------
\echo ''
\echo '[07] Création table APP_USER et utilisateurs démo...'
\ir 07_users.sql

-- -------------------------------------------------------
-- SÉCURITÉ / HABILITATIONS
-- -------------------------------------------------------
\echo ''
\echo '[09] Création tables de sécurité (rôles, accès écrans)...'
\ir 09_security_tables.sql

-- -------------------------------------------------------
-- RÉFÉRENTIEL MÉTIER
-- -------------------------------------------------------
\echo ''
\echo '[10] Création table CORE_INVESTOR et investisseurs démo...'
\ir 10_core_investor.sql

\echo '[11] Création tables CORE_SECURITIES_ACCOUNT et CORE_CASH_ACCOUNT...'
\ir 11_core_accounts.sql

\echo '[12] Création tables CORE_BOND et CORE_BOND_SCHEDULE...'
\ir 12_core_bond.sql

-- -------------------------------------------------------
-- OPÉRATIONS
-- -------------------------------------------------------
\echo ''
\echo '[13] Création tables OPE_OPERATION, OPE_SECURITY_POSITION, OPE_CASH_POSITION...'
\ir 13_ope_tables.sql

-- -------------------------------------------------------
-- MIGRATION COLONNES AUDIT (bases existantes uniquement)
-- -------------------------------------------------------
-- NOTE: Ce script est idempotent et inutile sur une installation fraîche
-- car les colonnes audit sont déjà dans les CREATE TABLE ci-dessus.
-- Décommenter uniquement pour migrer une base existante (avant refactoring BaseEntity).
-- \echo ''
-- \echo '[08] Migration audit columns (base existante)...'
-- \ir 08_audit_columns.sql

-- -------------------------------------------------------
-- ADMINISTRATION DE LA SÉCURITÉ (Carthago)
-- -------------------------------------------------------
\echo ''
\echo '[20] Modernisation UI GRID (ui_action, ui_column)...'
\ir 20_grid_screen_modern_ui.sql

\echo '[21] Création table UI_LABEL (i18n)...'
\ir 21_ui_label.sql

\echo '[22] Écran FORM avec sections (SCR_BOND_FORM)...'
\ir 22_form_screen_sections.sql

\echo '[23] Module Administration de la sécurité (A.1→A.4)...'
\ir 23_administration_securite.sql

\echo ''
\echo '============================================================'
\echo 'Installation terminée avec succès.'
\echo '============================================================'
\echo ''
\echo 'Utilisateurs créés:'
\echo '  admin       / admin123   (ROLE_ADMIN, ROLE_USER)'
\echo '  trader      / user123    (ROLE_USER)'
\echo '  analyste    / user123    (ROLE_USER)'
\echo '  gestionnaire/ user123    (ROLE_USER)'
\echo ''
\echo 'Obligations créées:'
\echo '  OAT-CI-7Y-2022  (CI0000018001) — Côte d''Ivoire 6.50%'
\echo '  OAT-SN-5Y-2023  (SN0000009002) — Sénégal 6.00%'
\echo '  BOA-BF-3Y-2024  (BF0000005003) — Burkina Faso 7.25%'
\echo '  OBMO-SGCI-5Y-2023 (CI0000019004) — SGCI 7.50%'
\echo '  SUKUK-ML-3Y-2024  (ML0000003005) — Mali 5.75%'
\echo '============================================================'
