package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "APP_MENU")
@AttributeOverride(name = "id",        column = @Column(name = "MENU_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class AppMenu extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private AppMenu parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC")
    private List<AppMenu> children = new ArrayList<>();

    @Column(name = "CODE", nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "LABEL", nullable = false, length = 100)
    private String label;

    @Column(name = "ICON", length = 100)
    private String icon;

    @Column(name = "ROUTE", length = 200)
    private String route;

    @Column(name = "SCREEN_CODE", length = 50)
    private String screenCode;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "IS_ACTIVE", nullable = false, columnDefinition = "char(1)")
    private String isActive = "Y";

    @Column(name = "ROLE_REQUIRED", length = 500)
    private String roleRequired;

    // --- Getters ---

    public Long getMenuId()          { return getId(); }
    public AppMenu getParent()       { return parent; }
    public List<AppMenu> getChildren() { return children; }
    public String getCode()          { return code; }
    public String getLabel()         { return label; }
    public String getIcon()          { return icon; }
    public String getRoute()         { return route; }
    public String getScreenCode()    { return screenCode; }
    public Integer getDisplayOrder() { return displayOrder; }
    public String getIsActive()      { return isActive; }
    public String getRoleRequired()  { return roleRequired; }

    // --- Setters ---

    public void setParent(AppMenu parent)      { this.parent = parent; }
    public void setCode(String code)            { this.code = code; }
    public void setLabel(String label)         { this.label = label; }
    public void setIcon(String icon)           { this.icon = icon; }
    public void setRoute(String route)         { this.route = route; }
    public void setScreenCode(String screenCode) { this.screenCode = screenCode; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    public void setIsActive(String isActive)   { this.isActive = isActive; }
    public void setRoleRequired(String roleRequired) { this.roleRequired = roleRequired; }
}
