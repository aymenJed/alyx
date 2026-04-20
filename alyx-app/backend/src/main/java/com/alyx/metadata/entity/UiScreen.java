package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "UI_SCREEN")
@AttributeOverride(name = "id",        column = @Column(name = "SCREEN_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UiScreen extends BaseEntity {

    @Column(name = "CODE", nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "TITLE", nullable = false, length = 200)
    private String title;

    @Column(name = "DESCRIPTION", length = 1000)
    private String description;

    @Column(name = "TEMPLATE_TYPE", nullable = false, length = 20)
    private String templateType;

    @Column(name = "API_BASE_URL", nullable = false, length = 500)
    private String apiBaseUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "PERMISSIONS", columnDefinition = "jsonb")
    private Map<String, Object> permissions;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "GRID_CONFIG", columnDefinition = "jsonb")
    private Map<String, Object> gridConfig;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ANALYTICS_CONFIG", columnDefinition = "jsonb")
    private Map<String, Object> analyticsConfig;

    @Column(name = "IS_ACTIVE", nullable = false, columnDefinition = "char(1)")
    private String isActive = "Y";

    @OneToMany(mappedBy = "screen", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OrderBy("displayOrder ASC")
    private List<UiComponent> components = new ArrayList<>();

    // --- Getters ---

    public Long getScreenId()                    { return getId(); }
    public String getCode()                      { return code; }
    public String getTitle()                     { return title; }
    public String getDescription()               { return description; }
    public String getTemplateType()              { return templateType; }
    public String getApiBaseUrl()                { return apiBaseUrl; }
    public Map<String, Object> getPermissions()  { return permissions; }
    public Map<String, Object> getGridConfig()   { return gridConfig; }
    public Map<String, Object> getAnalyticsConfig() { return analyticsConfig; }
    public String getIsActive()                  { return isActive; }
    public List<UiComponent> getComponents()     { return components; }

    // --- Setters (used by ScreenDesignerService) ---

    public void setCode(String code)                         { this.code = code; }
    public void setTitle(String title)                       { this.title = title; }
    public void setDescription(String description)           { this.description = description; }
    public void setTemplateType(String templateType)         { this.templateType = templateType; }
    public void setApiBaseUrl(String apiBaseUrl)             { this.apiBaseUrl = apiBaseUrl; }
    public void setPermissions(Map<String, Object> p)        { this.permissions = p; }
    public void setGridConfig(Map<String, Object> g)         { this.gridConfig = g; }
    public void setAnalyticsConfig(Map<String, Object> a)    { this.analyticsConfig = a; }
    public void setIsActive(String isActive)                 { this.isActive = isActive; }
}
