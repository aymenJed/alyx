-- ============================================================
-- ALYX-APP :: TABLE UI_USER_SHORTCUT
-- Raccourcis personnalisés par utilisateur (ShortcutBarComponent)
-- PostgreSQL 14+
-- ============================================================
CREATE TABLE ui_user_shortcut (
    shortcut_id     BIGINT          GENERATED ALWAYS AS IDENTITY
                                    CONSTRAINT pk_ui_user_shortcut PRIMARY KEY,
    user_id         VARCHAR(100)    NOT NULL,
    screen_code     VARCHAR(50)     NOT NULL,
    display_order   INTEGER         NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    -- Contraintes
    CONSTRAINT fk_shortcut_screen   FOREIGN KEY (screen_code)
                                    REFERENCES ui_screen(code)
                                    ON DELETE CASCADE,
    CONSTRAINT uk_user_shortcut     UNIQUE (user_id, screen_code)
);

CREATE INDEX idx_shortcut_user  ON ui_user_shortcut (user_id);
CREATE INDEX idx_shortcut_order ON ui_user_shortcut (user_id, display_order);

CREATE TRIGGER trg_ui_user_shortcut_upd
    BEFORE UPDATE ON ui_user_shortcut
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  ui_user_shortcut               IS 'Favoris d''écrans par utilisateur. Affichés dans la ShortcutBar.';
COMMENT ON COLUMN ui_user_shortcut.user_id       IS 'Login ou sub du token JWT de l''utilisateur';
COMMENT ON COLUMN ui_user_shortcut.screen_code   IS 'Référence vers ui_screen.code';
COMMENT ON COLUMN ui_user_shortcut.display_order IS 'Position dans la barre de raccourcis (drag & drop côté frontend)';
COMMENT ON COLUMN ui_user_shortcut.created_by    IS 'Utilisateur ayant créé le raccourci (audit JPA)';
COMMENT ON COLUMN ui_user_shortcut.updated_by    IS 'Dernier utilisateur ayant modifié le raccourci (audit JPA)';

-- ============================================================
-- Données exemples — raccourcis par défaut des utilisateurs
-- ============================================================
INSERT INTO ui_user_shortcut (user_id, screen_code, display_order) VALUES
    ('admin',    'SCR_DASHBOARD_MARCHE', 1),
    ('admin',    'SCR_OBLIGATIONS',      2),
    ('admin',    'SCR_UTILISATEURS',     3),
    ('trader',   'SCR_DASHBOARD_MARCHE', 1),
    ('trader',   'SCR_OBLIGATIONS',      2),
    ('trader',   'SCR_ACTIONS_BRVM',     3),
    ('analyste', 'SCR_DASHBOARD_MARCHE', 1),
    ('analyste', 'SCR_ACTIONS_BRVM',     2),
    ('analyste', 'SCR_OBLIGATIONS',      3)
ON CONFLICT (user_id, screen_code) DO NOTHING;
