package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
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

    @Column(name = "FIELD_KEY", nullable = false, length = 100)
    private String fieldKey;

    @Column(name = "LABEL", nullable = false, length = 200)
    private String label;

    @Column(name = "COMPONENT_TYPE", nullable = false, length = 20)
    private String componentType;

    @Column(name = "PLACEHOLDER", length = 200)
    private String placeholder;

    @Column(name = "DEFAULT_VALUE", length = 1000)
    private String defaultValue;

    @Column(name = "IS_REQUIRED", nullable = false, length = 1)
    private String isRequired = "N";

    @Column(name = "IS_READONLY", nullable = false, length = 1)
    private String isReadonly = "N";

    @Column(name = "IS_VISIBLE", nullable = false, length = 1)
    private String isVisible = "Y";

    @Column(name = "IS_SORTABLE", nullable = false, length = 1)
    private String isSortable = "Y";

    @Column(name = "IS_FILTERABLE", nullable = false, length = 1)
    private String isFilterable = "N";

    @Column(name = "IS_GRID_COLUMN", nullable = false, length = 1)
    private String isGridColumn = "Y";

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "GRID_COL_SPAN", nullable = false)
    private Integer gridColSpan = 6;

    @Column(name = "VALIDATION_REGEX", length = 1000)
    private String validationRegex;

    @Column(name = "VALIDATION_MSG", length = 500)
    private String validationMsg;

    @Column(name = "OPTIONS_SOURCE", length = 500)
    private String optionsSource;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "OPTIONS_JSON", columnDefinition = "jsonb")
    private List<Map<String, Object>> optionsJson;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "VISIBILITY_RULE", columnDefinition = "jsonb")
    private Map<String, Object> visibilityRule;

    @Column(name = "FORMAT_PATTERN", length = 100)
    private String formatPattern;

    // --- Getters ---

    public Long getComponentId()                      { return getId(); }
    public UiScreen getScreen()                       { return screen; }
    public String getFieldKey()                       { return fieldKey; }
    public String getLabel()                          { return label; }
    public String getComponentType()                  { return componentType; }
    public String getPlaceholder()                    { return placeholder; }
    public String getDefaultValue()                   { return defaultValue; }
    public String getIsRequired()                     { return isRequired; }
    public String getIsReadonly()                     { return isReadonly; }
    public String getIsVisible()                      { return isVisible; }
    public String getIsSortable()                     { return isSortable; }
    public String getIsFilterable()                   { return isFilterable; }
    public String getIsGridColumn()                   { return isGridColumn; }
    public Integer getDisplayOrder()                  { return displayOrder; }
    public Integer getGridColSpan()                   { return gridColSpan; }
    public String getValidationRegex()                { return validationRegex; }
    public String getValidationMsg()                  { return validationMsg; }
    public String getOptionsSource()                  { return optionsSource; }
    public List<Map<String, Object>> getOptionsJson() { return optionsJson; }
    public Map<String, Object> getVisibilityRule()    { return visibilityRule; }
    public String getFormatPattern()                  { return formatPattern; }

    // --- Setters (used by ScreenDesignerService) ---

    public void setScreen(UiScreen screen)                           { this.screen = screen; }
    public void setFieldKey(String fieldKey)                         { this.fieldKey = fieldKey; }
    public void setLabel(String label)                               { this.label = label; }
    public void setComponentType(String componentType)               { this.componentType = componentType; }
    public void setPlaceholder(String placeholder)                   { this.placeholder = placeholder; }
    public void setDefaultValue(String defaultValue)                 { this.defaultValue = defaultValue; }
    public void setIsRequired(String isRequired)                     { this.isRequired = isRequired; }
    public void setIsReadonly(String isReadonly)                     { this.isReadonly = isReadonly; }
    public void setIsVisible(String isVisible)                       { this.isVisible = isVisible; }
    public void setIsSortable(String isSortable)                     { this.isSortable = isSortable; }
    public void setIsFilterable(String isFilterable)                 { this.isFilterable = isFilterable; }
    public void setIsGridColumn(String isGridColumn)                 { this.isGridColumn = isGridColumn; }
    public void setDisplayOrder(Integer displayOrder)                { this.displayOrder = displayOrder; }
    public void setGridColSpan(Integer gridColSpan)                  { this.gridColSpan = gridColSpan; }
    public void setValidationRegex(String validationRegex)           { this.validationRegex = validationRegex; }
    public void setValidationMsg(String validationMsg)               { this.validationMsg = validationMsg; }
    public void setOptionsSource(String optionsSource)               { this.optionsSource = optionsSource; }
    public void setOptionsJson(List<Map<String, Object>> optionsJson) { this.optionsJson = optionsJson; }
    public void setVisibilityRule(Map<String, Object> visibilityRule) { this.visibilityRule = visibilityRule; }
    public void setFormatPattern(String formatPattern)               { this.formatPattern = formatPattern; }
}
