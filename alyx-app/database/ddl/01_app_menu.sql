-- ============================================================
-- ALYX-APP :: TABLE APP_MENU
-- Gestion de la navigation hiérarchique (SidebarComponent)
-- PostgreSQL 14+
-- ============================================================
CREATE TABLE app_menu (
    menu_id         BIGINT          GENERATED ALWAYS AS IDENTITY
                                    CONSTRAINT pk_app_menu PRIMARY KEY,
    parent_id       BIGINT,
    code            VARCHAR(50)     NOT NULL,
    label           VARCHAR(100)    NOT NULL,
    icon            VARCHAR(100),
    route           VARCHAR(200),
    screen_code     VARCHAR(50),
    display_order   INTEGER         NOT NULL DEFAULT 0,
    is_active       CHAR(1)         NOT NULL DEFAULT 'Y',
    role_required   VARCHAR(500),
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    -- Contraintes
    CONSTRAINT uk_app_menu_code   UNIQUE (code),
    CONSTRAINT fk_app_menu_parent FOREIGN KEY (parent_id)
                                  REFERENCES app_menu(menu_id),
    CONSTRAINT ck_app_menu_active CHECK (is_active IN ('Y', 'N'))
);

CREATE INDEX idx_app_menu_parent ON app_menu (parent_id);
CREATE INDEX idx_app_menu_order  ON app_menu (display_order);
CREATE INDEX idx_app_menu_screen ON app_menu (screen_code);
CREATE INDEX idx_app_menu_active ON app_menu (is_active, display_order);

-- Trigger: mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_app_menu_upd
    BEFORE UPDATE ON app_menu
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- Documentation
COMMENT ON TABLE  app_menu               IS 'Source unique de vérité pour la navigation. Hiérarchie illimitée via auto-référence parent_id.';
COMMENT ON COLUMN app_menu.menu_id       IS 'PK auto-générée via IDENTITY';
COMMENT ON COLUMN app_menu.parent_id     IS 'FK vers menu_id pour la hiérarchie (NULL = racine niveau 1)';
COMMENT ON COLUMN app_menu.code          IS 'Code technique unique. Exemple: MARCHE_OBLIGATIONS';
COMMENT ON COLUMN app_menu.label         IS 'Libellé affiché dans la Sidebar';
COMMENT ON COLUMN app_menu.icon          IS 'Identifiant icône (Heroicons/Lucide). Exemple: chart-bar';
COMMENT ON COLUMN app_menu.route         IS 'Route Angular SPA. Exemple: /marches/obligations';
COMMENT ON COLUMN app_menu.screen_code   IS 'FK métier vers ui_screen.code pour le chargement dynamique';
COMMENT ON COLUMN app_menu.display_order IS 'Ordre d''affichage dans la liste (croissant)';
COMMENT ON COLUMN app_menu.is_active     IS 'Y=Visible dans le menu, N=Masqué sans suppression';
COMMENT ON COLUMN app_menu.role_required IS 'Rôles autorisés, séparés par virgule. Ex: ROLE_TRADER,ROLE_ADMIN';
COMMENT ON COLUMN app_menu.created_by    IS 'Utilisateur ayant créé l''entrée (audit JPA)';
COMMENT ON COLUMN app_menu.updated_by    IS 'Dernier utilisateur ayant modifié l''entrée (audit JPA)';
