-- ============================================================
-- ALYX-APP :: TABLE UI_LABEL
-- Labels multilingues des écrans et champs (i18n)
-- PostgreSQL 14+
-- ============================================================

CREATE TABLE IF NOT EXISTS ui_label (
    label_id    BIGINT          GENERATED ALWAYS AS IDENTITY
                                CONSTRAINT pk_ui_label PRIMARY KEY,
    screen_code VARCHAR(50)     NOT NULL,
    field_key   VARCHAR(100),
    language    VARCHAR(5)      NOT NULL,
    label       VARCHAR(500)    NOT NULL,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50),
    updated_by  VARCHAR(50),
    CONSTRAINT uk_ui_label UNIQUE (screen_code, field_key, language)
);

CREATE INDEX IF NOT EXISTS idx_ui_label_screen_lang
    ON ui_label (screen_code, language);

COMMENT ON TABLE  ui_label             IS 'Surcharge i18n des libellés d''écrans et de champs sans recompilation.';
COMMENT ON COLUMN ui_label.screen_code IS 'Code de l''écran (UiScreen.code)';
COMMENT ON COLUMN ui_label.field_key   IS 'Clé du champ (UiComponent.fieldKey). NULL = label de l''écran lui-même.';
COMMENT ON COLUMN ui_label.language    IS 'Code ISO 639-1 : fr | en | ar';
