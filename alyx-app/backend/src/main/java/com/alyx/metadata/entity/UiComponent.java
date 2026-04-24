package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "UI_COMPONENT")
@AttributeOverride(name = "id",        column = @Column(name = "COMPONENT_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UiComponent extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCREEN_ID", nullable = false)
    private UiScreen screen;

    // ── Identité ──────────────────────────────────────────────────────────────

    /** Nom du champ — binding vers l'attribut de l'entité métier */
    @Column(name = "FIELD_KEY", nullable = false, length = 100)
    private String fieldKey;

    @Column(name = "LABEL", nullable = false, length = 200)
    private String label;

    /**
     * Type de composant — équivalent de la hiérarchie SimpleField du modèle de référence :
     * TEXT, NUMBER, AMOUNT, EMAIL, DATE, DATETIME, BOOLEAN (→ BooleanField),
     * SELECT, MULTISELECT (→ EnumerationField), AUTOCOMPLETE (→ AggregationOneField),
     * TEXTAREA (→ RichTextField), FILE (→ FileField),
     * GROUP (→ GroupField), SEPARATOR (→ Separator),
     * RELATION_ONE (→ AggregationOneField), RELATION_MANY (→ CompositionManyField)
     */
    @Column(name = "COMPONENT_TYPE", nullable = false, length = 30)
    private String componentType;

    @Column(name = "PLACEHOLDER", length = 200)
    private String placeholder;

    @Column(name = "DEFAULT_VALUE", length = 1000)
    private String defaultValue;

    // ── État statique ─────────────────────────────────────────────────────────

    @Column(name = "IS_REQUIRED", nullable = false)
    private Boolean isRequired = false;

    @Column(name = "IS_READONLY", nullable = false)
    private Boolean isReadonly = false;

    @Column(name = "IS_VISIBLE", nullable = false)
    private Boolean isVisible = true;

    @Column(name = "IS_SORTABLE", nullable = false)
    private Boolean isSortable = true;

    @Column(name = "IS_FILTERABLE", nullable = false)
    private Boolean isFilterable = false;

    @Column(name = "IS_GRID_COLUMN", nullable = false)
    private Boolean isGridColumn = true;

    /** Déclencher un appel API à chaque modification du champ (fireOnChange) */
    @Column(name = "FIRE_ON_CHANGE", nullable = false)
    private Boolean fireOnChange = false;

    // ── Expressions dynamiques (*Exp — évaluées côté client) ─────────────────

    /** Expression de visibilité conditionnelle (ex: "data.type === 'ACTIF'") */
    @Column(name = "VISIBILITY_EXP", length = 500)
    private String visibilityExp;

    /** Expression de lecture seule conditionnelle */
    @Column(name = "READONLY_EXP", length = 500)
    private String readonlyExp;

    /** Expression pour champ obligatoire conditionnel */
    @Column(name = "REQUIRE_EXP", length = 500)
    private String requireExp;

    /** Expression pour label dynamique */
    @Column(name = "LABEL_EXP", length = 500)
    private String labelExp;

    /** Expression évaluée lors du onChange (ex: calcul auto d'un montant) */
    @Column(name = "ON_FIRE_ON_CHANGE_EXP", length = 1000)
    private String onFireOnChangeExp;

    /** Expression pour liste déroulante dynamique (source calculée) */
    @Column(name = "DYNAMIC_LIST_DATA_EXP", length = 1000)
    private String dynamicListDataExp;

    // ── Layout ────────────────────────────────────────────────────────────────

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    /** Largeur en colonnes CSS Grid (1-12) */
    @Column(name = "GRID_COL_SPAN", nullable = false)
    private Integer gridColSpan = 6;

    /** Colspan dans le formulaire */
    @Column(name = "COL_SPAN")
    private Integer colSpan;

    /** Rowspan dans le formulaire */
    @Column(name = "ROW_SPAN")
    private Integer rowSpan;

    // ── Validation ────────────────────────────────────────────────────────────

    @Column(name = "VALIDATION_REGEX", length = 1000)
    private String validationRegex;

    @Column(name = "VALIDATION_MSG", length = 500)
    private String validationMsg;

    /** Longueur maximale (StringField.maxLength) */
    @Column(name = "MAX_LENGTH")
    private Integer maxLength;

    /** Valeur minimale (NumberField.min) */
    @Column(name = "MIN_VALUE")
    private Double minValue;

    /** Valeur maximale (NumberField.max) */
    @Column(name = "MAX_VALUE")
    private Double maxValue;

    // ── Options / Relations ───────────────────────────────────────────────────

    /** URL de chargement des options pour SELECT/AUTOCOMPLETE */
    @Column(name = "OPTIONS_SOURCE", length = 500)
    private String optionsSource;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "OPTIONS_JSON", columnDefinition = "jsonb")
    private Object optionsJson;

    /** Entité cible pour les champs de relation (AggregationOneField / CompositionManyField) */
    @Column(name = "RELATED_ENTITY", length = 500)
    private String relatedEntity;

    /** Champ affiché dans l'autocomplete pour les relations */
    @Column(name = "DISPLAY_FIELD", length = 100)
    private String displayField;

    // ── Rendu / Format ────────────────────────────────────────────────────────

    @Column(name = "FORMAT_PATTERN", length = 100)
    private String formatPattern;

    /** dateOnly=true → DateField sans heure */
    @Column(name = "DATE_ONLY", nullable = false)
    private Boolean dateOnly = true;

    /** UPPERCASE | LOWERCASE | UCFIRST — StringField */
    @Column(name = "CASE_TRANSFORM", length = 10)
    private String caseTransform;

    /** Nombre de lignes pour TEXTAREA (RichTextField.nbLines) */
    @Column(name = "NB_LINES")
    private Integer nbLines;

    // ── Tri / Poids ───────────────────────────────────────────────────────────

    @Column(name = "WEIGHT")
    private Long weight;

    // ── Getters ───────────────────────────────────────────────────────────────

    public Long getComponentId()            { return getId(); }
    public UiScreen getScreen()             { return screen; }
    public String getFieldKey()             { return fieldKey; }
    public String getLabel()                { return label; }
    public String getComponentType()        { return componentType; }
    public String getPlaceholder()          { return placeholder; }
    public String getDefaultValue()         { return defaultValue; }
    public Boolean getIsRequired()          { return isRequired; }
    public Boolean getIsReadonly()          { return isReadonly; }
    public Boolean getIsVisible()           { return isVisible; }
    public Boolean getIsSortable()          { return isSortable; }
    public Boolean getIsFilterable()        { return isFilterable; }
    public Boolean getIsGridColumn()        { return isGridColumn; }
    public Boolean getFireOnChange()        { return fireOnChange; }
    public String getVisibilityExp()        { return visibilityExp; }
    public String getReadonlyExp()          { return readonlyExp; }
    public String getRequireExp()           { return requireExp; }
    public String getLabelExp()             { return labelExp; }
    public String getOnFireOnChangeExp()    { return onFireOnChangeExp; }
    public String getDynamicListDataExp()   { return dynamicListDataExp; }
    public Integer getDisplayOrder()        { return displayOrder; }
    public Integer getGridColSpan()         { return gridColSpan; }
    public Integer getColSpan()             { return colSpan; }
    public Integer getRowSpan()             { return rowSpan; }
    public String getValidationRegex()      { return validationRegex; }
    public String getValidationMsg()        { return validationMsg; }
    public Integer getMaxLength()           { return maxLength; }
    public Double getMinValue()             { return minValue; }
    public Double getMaxValue()             { return maxValue; }
    public String getOptionsSource()        { return optionsSource; }
    public Object getOptionsJson()          { return optionsJson; }
    public String getRelatedEntity()        { return relatedEntity; }
    public String getDisplayField()         { return displayField; }
    public String getFormatPattern()        { return formatPattern; }
    public Boolean getDateOnly()            { return dateOnly; }
    public String getCaseTransform()        { return caseTransform; }
    public Integer getNbLines()             { return nbLines; }
    public Long getWeight()                 { return weight; }

    // ── Setters ───────────────────────────────────────────────────────────────

    public void setScreen(UiScreen screen)                      { this.screen = screen; }
    public void setFieldKey(String fieldKey)                    { this.fieldKey = fieldKey; }
    public void setLabel(String label)                          { this.label = label; }
    public void setComponentType(String componentType)          { this.componentType = componentType; }
    public void setPlaceholder(String placeholder)              { this.placeholder = placeholder; }
    public void setDefaultValue(String defaultValue)            { this.defaultValue = defaultValue; }
    public void setIsRequired(Boolean isRequired)               { this.isRequired = isRequired; }
    public void setIsReadonly(Boolean isReadonly)               { this.isReadonly = isReadonly; }
    public void setIsVisible(Boolean isVisible)                 { this.isVisible = isVisible; }
    public void setIsSortable(Boolean isSortable)               { this.isSortable = isSortable; }
    public void setIsFilterable(Boolean isFilterable)           { this.isFilterable = isFilterable; }
    public void setIsGridColumn(Boolean isGridColumn)           { this.isGridColumn = isGridColumn; }
    public void setFireOnChange(Boolean fireOnChange)           { this.fireOnChange = fireOnChange; }
    public void setVisibilityExp(String visibilityExp)          { this.visibilityExp = visibilityExp; }
    public void setReadonlyExp(String readonlyExp)              { this.readonlyExp = readonlyExp; }
    public void setRequireExp(String requireExp)                { this.requireExp = requireExp; }
    public void setLabelExp(String labelExp)                    { this.labelExp = labelExp; }
    public void setOnFireOnChangeExp(String v)                  { this.onFireOnChangeExp = v; }
    public void setDynamicListDataExp(String v)                 { this.dynamicListDataExp = v; }
    public void setDisplayOrder(Integer displayOrder)           { this.displayOrder = displayOrder; }
    public void setGridColSpan(Integer gridColSpan)             { this.gridColSpan = gridColSpan; }
    public void setColSpan(Integer colSpan)                     { this.colSpan = colSpan; }
    public void setRowSpan(Integer rowSpan)                     { this.rowSpan = rowSpan; }
    public void setValidationRegex(String validationRegex)      { this.validationRegex = validationRegex; }
    public void setValidationMsg(String validationMsg)          { this.validationMsg = validationMsg; }
    public void setMaxLength(Integer maxLength)                 { this.maxLength = maxLength; }
    public void setMinValue(Double minValue)                    { this.minValue = minValue; }
    public void setMaxValue(Double maxValue)                    { this.maxValue = maxValue; }
    public void setOptionsSource(String optionsSource)          { this.optionsSource = optionsSource; }
    public void setOptionsJson(Object optionsJson)              { this.optionsJson = optionsJson; }
    public void setRelatedEntity(String relatedEntity)          { this.relatedEntity = relatedEntity; }
    public void setDisplayField(String displayField)            { this.displayField = displayField; }
    public void setFormatPattern(String formatPattern)          { this.formatPattern = formatPattern; }
    public void setDateOnly(Boolean dateOnly)                   { this.dateOnly = dateOnly; }
    public void setCaseTransform(String caseTransform)          { this.caseTransform = caseTransform; }
    public void setNbLines(Integer nbLines)                     { this.nbLines = nbLines; }
    public void setWeight(Long weight)                          { this.weight = weight; }
}
