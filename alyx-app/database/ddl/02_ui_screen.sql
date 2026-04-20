-- ============================================================
-- ALYX-APP :: TABLE UI_SCREEN
-- Registre central des écrans applicatifs (Server-Driven UI)
-- PostgreSQL 14+ — Type JSONB natif
-- ============================================================
CREATE TABLE ui_screen (
    screen_id           BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_ui_screen PRIMARY KEY,
    code                VARCHAR(50)     NOT NULL,
    title               VARCHAR(200)    NOT NULL,
    description         VARCHAR(1000),
    template_type       VARCHAR(20)     NOT NULL,
    api_base_url        VARCHAR(500)    NOT NULL,
    -- JSONB : {"read":["ROLE_USER"],"write":["ROLE_TRADER"],"delete":["ROLE_ADMIN"]}
    permissions         JSONB,
    -- JSONB : {"pageSize":20,"defaultSort":"createdAt","actions":[...]}
    grid_config         JSONB,
    -- JSONB : {"charts":[...],"kpis":[...]}
    analytics_config    JSONB,
    is_active           CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    -- Contraintes
    CONSTRAINT uk_ui_screen_code      UNIQUE (code),
    CONSTRAINT ck_ui_screen_template  CHECK (template_type IN (
        'GRID', 'FORM', 'MASTER_DETAIL', 'ANALYTICS'
    )),
    CONSTRAINT ck_ui_screen_active    CHECK (is_active IN ('Y', 'N'))
);

CREATE INDEX idx_ui_screen_code     ON ui_screen (code);
CREATE INDEX idx_ui_screen_template ON ui_screen (template_type);
CREATE INDEX idx_ui_screen_active   ON ui_screen (is_active);
CREATE INDEX idx_ui_screen_permissions ON ui_screen USING GIN (permissions);

CREATE TRIGGER trg_ui_screen_upd
    BEFORE UPDATE ON ui_screen
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  ui_screen                  IS 'Chaque ligne = un écran complet. Zéro code Angular à écrire par écran.';
COMMENT ON COLUMN ui_screen.code             IS 'Identifiant technique. Référencé par app_menu et la route Angular (/screen/:code)';
COMMENT ON COLUMN ui_screen.template_type    IS 'GRID=Tableau | FORM=Formulaire | MASTER_DETAIL=Split Liste+Form | ANALYTICS=Dashboard';
COMMENT ON COLUMN ui_screen.api_base_url     IS 'URL de base de l''API REST de données. Ex: /api/v1/obligations';
COMMENT ON COLUMN ui_screen.permissions      IS 'JSONB de contrôle d''accès par verbe HTTP. Structure: {read,write,delete}:[roles]';
COMMENT ON COLUMN ui_screen.grid_config      IS 'JSONB config template GRID: pagination, tri, actions, exports';
COMMENT ON COLUMN ui_screen.analytics_config IS 'JSONB config template ANALYTICS: graphiques et KPIs avec leurs endpoints';
COMMENT ON COLUMN ui_screen.created_by       IS 'Utilisateur ayant créé l''écran (audit JPA)';
COMMENT ON COLUMN ui_screen.updated_by       IS 'Dernier utilisateur ayant modifié l''écran (audit JPA)';
