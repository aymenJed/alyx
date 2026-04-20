-- ============================================================
-- ALYX-APP :: PATCH 06 — Écran de Paramétrage
-- Ajoute le menu et l'écran du Screen Designer
-- PostgreSQL 14+
-- ============================================================

-- 1. Entrée de menu dans la section Administration
INSERT INTO app_menu (code, parent_id, label, icon, route, screen_code, display_order, role_required)
SELECT 'MNU_PARAMETRAGE', menu_id, 'Paramétrage Écrans', 'squares-2x2',
    '/admin/parametrage', NULL, 2, 'ROLE_ADMIN'
FROM app_menu WHERE code = 'MNU_ADMINISTRATION'
ON CONFLICT (code) DO NOTHING;

-- 2. Séparateur visuel dans le menu Administration (optionnel)
-- (géré côté frontend si IS_ACTIVE = 'S' pour séparateur)

-- Vérification
SELECT m.code, m.label, m.route, m.role_required
FROM app_menu m
WHERE m.code LIKE 'MNU_ADMIN%'
ORDER BY m.display_order;
