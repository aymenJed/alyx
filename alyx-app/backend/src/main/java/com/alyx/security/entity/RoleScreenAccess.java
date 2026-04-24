package com.alyx.security.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "role_screen_access",
       uniqueConstraints = @UniqueConstraint(columnNames = {"ROLE_ID", "SCREEN_ID"}))
@AttributeOverride(name = "id",        column = @Column(name = "ACCESS_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class RoleScreenAccess extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCREEN_ID", nullable = false)
    private com.alyx.metadata.entity.UiScreen screen;

    @Column(name = "ACCESS_LEVEL", nullable = false, length = 20)
    private String accessLevel = "READ";

    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive = true;

    public RoleScreenAccess() {}

    public RoleScreenAccess(Role role, com.alyx.metadata.entity.UiScreen screen, String accessLevel) {
        this.role = role;
        this.screen = screen;
        this.accessLevel = accessLevel;
    }

    public Long getAccessId()          { return getId(); }
    public Role getRole()              { return role; }
    public void setRole(Role r)       { this.role = r; }
    public com.alyx.metadata.entity.UiScreen getScreen() { return screen; }
    public void setScreen(com.alyx.metadata.entity.UiScreen s) { this.screen = s; }
    public String getAccessLevel()     { return accessLevel; }
    public void setAccessLevel(String a) { this.accessLevel = a; }
    public Boolean getIsActive()        { return isActive; }
    public void setIsActive(Boolean a) { this.isActive = a; }
}
