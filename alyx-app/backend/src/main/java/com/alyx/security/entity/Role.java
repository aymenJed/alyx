package com.alyx.security.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "app_role")
@AttributeOverride(name = "id",        column = @Column(name = "ROLE_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class Role extends BaseEntity {

    @Column(name = "ROLE_NAME", nullable = false, unique = true, length = 50)
    private String roleName;

    @Column(name = "ROLE_DESCRIPTION", length = 255)
    private String roleDescription;

    @Column(name = "ROLE_TYPE", nullable = false, length = 20)
    private String roleType = "CUSTOM";

    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive =true;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoleScreenAccess> screenAccesses = new ArrayList<>();

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRoleAssignment> userAssignments = new ArrayList<>();

    public Long getRoleId()                      { return getId(); }
    public String getRoleName()                  { return roleName; }
    public void setRoleName(String roleName)    { this.roleName = roleName; }
    public String getRoleDescription()           { return roleDescription; }
    public void setRoleDescription(String d)    { this.roleDescription = d; }
    public String getRoleType()                  { return roleType; }
    public void setRoleType(String t)           { this.roleType = t; }
    public Boolean getIsActive()                  { return isActive; }
    public void setIsActive(Boolean a)           { this.isActive = a; }
    public List<RoleScreenAccess> getScreenAccesses() { return screenAccesses; }
    public void setScreenAccesses(List<RoleScreenAccess> s) { this.screenAccesses = s; }
    public List<UserRoleAssignment> getUserAssignments() { return userAssignments; }
    public void setUserAssignments(List<UserRoleAssignment> u) { this.userAssignments = u; }
}
