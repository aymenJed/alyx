package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

/**
 * Label multilingue d'une entité métier ou d'un écran —
 * équivalent de EntityLabel / FieldLabel du modèle de référence PresentationViewModel.
 *
 * Permet de surcharger les libellés sans recompilation,
 * aligné sur le sous-système i18n intégré du modèle de référence.
 */
@Entity
@Table(name = "UI_LABEL",
    uniqueConstraints = @UniqueConstraint(columnNames = {"SCREEN_CODE", "FIELD_KEY", "LANGUAGE"}))
@AttributeOverride(name = "id",        column = @Column(name = "LABEL_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UiLabel extends BaseEntity {

    /** Code de l'écran (UiScreen.code) */
    @Column(name = "SCREEN_CODE", nullable = false, length = 50)
    private String screenCode;

    /**
     * Clé du champ (UiComponent.fieldKey).
     * Si null → label de l'écran lui-même (EntityLabel).
     * Si renseigné → label d'un champ spécifique (FieldLabel).
     */
    @Column(name = "FIELD_KEY", length = 100)
    private String fieldKey;

    /** Code langue ISO 639-1 (fr, en, ar, ...) */
    @Column(name = "LANGUAGE", nullable = false, length = 5)
    private String language;

    @Column(name = "LABEL", nullable = false, length = 500)
    private String label;

    // ── Getters ───────────────────────────────────────────────────────────────

    public Long getLabelId()        { return getId(); }
    public String getScreenCode()   { return screenCode; }
    public String getFieldKey()     { return fieldKey; }
    public String getLanguage()     { return language; }
    public String getLabel()        { return label; }

    // ── Setters ───────────────────────────────────────────────────────────────

    public void setScreenCode(String screenCode)    { this.screenCode = screenCode; }
    public void setFieldKey(String fieldKey)        { this.fieldKey = fieldKey; }
    public void setLanguage(String language)        { this.language = language; }
    public void setLabel(String label)              { this.label = label; }
}
