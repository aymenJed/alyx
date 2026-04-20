-- ============================================================
-- ALYX-APP :: TABLE UI_COMPONENT
-- Configuration atomique des champs par écran
-- PostgreSQL 14+
-- ⚡ Philosophie: un INSERT = un nouveau champ sans déploiement
-- ============================================================
CREATE TABLE ui_component (
    component_id        BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_ui_component PRIMARY KEY,
    screen_id           BIGINT          NOT NULL,
    field_key           VARCHAR(100)    NOT NULL,
    label               VARCHAR(200)    NOT NULL,
    component_type      VARCHAR(20)     NOT NULL,
    placeholder         VARCHAR(200),
    default_value       VARCHAR(1000),
    is_required         CHAR(1)         NOT NULL DEFAULT 'N',
    is_readonly         CHAR(1)         NOT NULL DEFAULT 'N',
    is_visible          CHAR(1)         NOT NULL DEFAULT 'Y',
    -- Spécifique au template GRID
    is_sortable         CHAR(1)         NOT NULL DEFAULT 'Y',
    is_filterable       CHAR(1)         NOT NULL DEFAULT 'N',
    is_grid_column      CHAR(1)         NOT NULL DEFAULT 'Y',
    -- Layout
    display_order       INTEGER         NOT NULL DEFAULT 0,
    grid_col_span       INTEGER         NOT NULL DEFAULT 6,
    -- Validation
    validation_regex    VARCHAR(1000),
    validation_msg      VARCHAR(500),
    -- Options pour SELECT, RADIO, MULTISELECT
    options_source      VARCHAR(500),
    options_json        JSONB,
    visibility_rule     JSONB,
    format_pattern      VARCHAR(100),
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    -- Contraintes
    CONSTRAINT fk_ui_comp_screen        FOREIGN KEY (screen_id)
                                        REFERENCES ui_screen(screen_id)
                                        ON DELETE CASCADE,
    CONSTRAINT uk_ui_comp_screen_field  UNIQUE (screen_id, field_key),
    CONSTRAINT ck_ui_comp_type          CHECK (component_type IN (
        'TEXT', 'NUMBER', 'AMOUNT', 'EMAIL', 'PASSWORD',
        'SELECT', 'MULTISELECT', 'AUTOCOMPLETE',
        'DATE', 'DATETIME', 'TIME',
        'CHECKBOX', 'RADIO', 'SWITCH',
        'TEXTAREA', 'FILE', 'IMAGE',
        'BADGE', 'LINK', 'PROGRESS', 'CURRENCY'
    )),
    CONSTRAINT ck_ui_comp_required      CHECK (is_required   IN ('Y', 'N')),
    CONSTRAINT ck_ui_comp_readonly      CHECK (is_readonly   IN ('Y', 'N')),
    CONSTRAINT ck_ui_comp_visible       CHECK (is_visible    IN ('Y', 'N')),
    CONSTRAINT ck_ui_comp_sortable      CHECK (is_sortable   IN ('Y', 'N')),
    CONSTRAINT ck_ui_comp_filterable    CHECK (is_filterable IN ('Y', 'N')),
    CONSTRAINT ck_ui_comp_grid_col      CHECK (is_grid_column IN ('Y', 'N')),
    CONSTRAINT ck_ui_comp_col_span      CHECK (grid_col_span BETWEEN 1 AND 12)
);

CREATE INDEX idx_ui_comp_screen   ON ui_component (screen_id);
CREATE INDEX idx_ui_comp_order    ON ui_component (screen_id, display_order);
CREATE INDEX idx_ui_comp_visible  ON ui_component (screen_id, is_visible, display_order);
CREATE INDEX idx_ui_comp_options  ON ui_component USING GIN (options_json);
CREATE INDEX idx_ui_comp_vis_rule ON ui_component USING GIN (visibility_rule);

CREATE TRIGGER trg_ui_component_upd
    BEFORE UPDATE ON ui_component
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  ui_component                   IS 'Définition de chaque champ/colonne. INSERT seul = nouveau champ en production.';
COMMENT ON COLUMN ui_component.field_key         IS 'Nom de la propriété dans le JSON API. Ex: isinCode, tauxNominal';
COMMENT ON COLUMN ui_component.component_type    IS 'Type Angular à instancier dynamiquement dans FormGenerator ou DataGrid';
COMMENT ON COLUMN ui_component.grid_col_span     IS 'Largeur en colonnes CSS Grid (1-12). 6=demi-largeur, 12=pleine largeur';
COMMENT ON COLUMN ui_component.is_grid_column    IS 'Y=visible comme colonne dans template GRID, N=champ formulaire seul';
COMMENT ON COLUMN ui_component.options_json      IS 'JSONB options statiques SELECT: [{"value":"V","label":"L"}]';
COMMENT ON COLUMN ui_component.options_source    IS 'Endpoint HTTP pour options dynamiques. Ex: /api/v1/ref/emetteurs';
COMMENT ON COLUMN ui_component.visibility_rule   IS 'JSONB règle de visibilité: {field, operator:[eq|neq|in|notin|gt|lt], value}';
COMMENT ON COLUMN ui_component.created_by        IS 'Utilisateur ayant créé le composant (audit JPA)';
COMMENT ON COLUMN ui_component.updated_by        IS 'Dernier utilisateur ayant modifié le composant (audit JPA)';
