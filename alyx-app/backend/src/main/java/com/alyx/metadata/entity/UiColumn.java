package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

/**
 * Colonne d'une vue grille — équivalent de Column / TreeColumn / ChartColumn
 * du modèle de référence PresentationViewModel.
 *
 * Remplace le gridConfig JSON non structuré de UiScreen
 * par des entités typées et maintenables.
 */
@Entity
@Table(name = "UI_COLUMN")
@AttributeOverride(name = "id",        column = @Column(name = "COLUMN_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UiColumn extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCREEN_ID", nullable = false)
    private UiScreen screen;

    /** Nom de l'attribut de l'entité métier (binding) */
    @Column(name = "FIELD_NAME", nullable = false, length = 100)
    private String fieldName;

    @Column(name = "LABEL", nullable = false, length = 200)
    private String label;

    /** Largeur en pixels */
    @Column(name = "WIDTH")
    private Integer width;

    /** LEFT | CENTER | RIGHT */
    @Column(name = "COLUMN_ALIGN", length = 10)
    private String columnAlign = "LEFT";

    @Column(name = "IS_SORTABLE", nullable = false)
    private Boolean isSortable = true;

    @Column(name = "IS_FILTERABLE", nullable = false)
    private Boolean isFilterable = false;

    @Column(name = "IS_EDITABLE", nullable = false)
    private Boolean isEditable = false;

    @Column(name = "IS_VISIBLE", nullable = false)
    private Boolean isVisible = true;

    /** Expression de visibilité conditionnelle */
    @Column(name = "VISIBILITY_EXP", length = 500)
    private String visibilityExp;

    /** Expression de label dynamique */
    @Column(name = "LABEL_EXP", length = 500)
    private String labelExp;

    /** Modèle de format d'affichage (ex: DD/MM/YYYY, #,##0.00) */
    @Column(name = "FORMAT_PATTERN", length = 100)
    private String formatPattern;

    /** Action déclenchée par clic sur la cellule */
    @Column(name = "ACTION_CODE", length = 50)
    private String actionCode;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    // ── Getters ───────────────────────────────────────────────────────────────

    public Long getColumnId()           { return getId(); }
    public UiScreen getScreen()         { return screen; }
    public String getFieldName()        { return fieldName; }
    public String getLabel()            { return label; }
    public Integer getWidth()           { return width; }
    public String getColumnAlign()      { return columnAlign; }
    public Boolean getIsSortable()      { return isSortable; }
    public Boolean getIsFilterable()    { return isFilterable; }
    public Boolean getIsEditable()      { return isEditable; }
    public Boolean getIsVisible()       { return isVisible; }
    public String getVisibilityExp()    { return visibilityExp; }
    public String getLabelExp()         { return labelExp; }
    public String getFormatPattern()    { return formatPattern; }
    public String getActionCode()       { return actionCode; }
    public Integer getDisplayOrder()    { return displayOrder; }

    // ── Setters ───────────────────────────────────────────────────────────────

    public void setScreen(UiScreen screen)              { this.screen = screen; }
    public void setFieldName(String fieldName)          { this.fieldName = fieldName; }
    public void setLabel(String label)                  { this.label = label; }
    public void setWidth(Integer width)                 { this.width = width; }
    public void setColumnAlign(String columnAlign)      { this.columnAlign = columnAlign; }
    public void setIsSortable(Boolean isSortable)       { this.isSortable = isSortable; }
    public void setIsFilterable(Boolean isFilterable)   { this.isFilterable = isFilterable; }
    public void setIsEditable(Boolean isEditable)       { this.isEditable = isEditable; }
    public void setIsVisible(Boolean isVisible)         { this.isVisible = isVisible; }
    public void setVisibilityExp(String visibilityExp)  { this.visibilityExp = visibilityExp; }
    public void setLabelExp(String labelExp)            { this.labelExp = labelExp; }
    public void setFormatPattern(String formatPattern)  { this.formatPattern = formatPattern; }
    public void setActionCode(String actionCode)        { this.actionCode = actionCode; }
    public void setDisplayOrder(Integer displayOrder)   { this.displayOrder = displayOrder; }
}
