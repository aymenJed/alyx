package com.alyx.security.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "USER_ROLE")
@AttributeOverride(name = "id",        column = @Column(name = "ROLE_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UserRole extends BaseEntity {

    @Column(name = "ROLE_NAME", nullable = false, unique = true, length = 50)
    private String roleName;

    @Column(name = "ROLE_DESCRIPTION", nullable = false, length = 100)
    private String roleDescription;

    @Column(name = "IS_ACTIVE", nullable = false, columnDefinition = "char(1)")
    private String isActive = "Y";

    public Long getRoleId()              { return getId(); }
    public String getRoleName()          { return roleName; }
    public void setRoleName(String n)   { this.roleName = n; }
    public String getRoleDescription()   { return roleDescription; }
    public void setRoleDescription(String d) { this.roleDescription = d; }
    public String getIsActive()          { return isActive; }
    public void setIsActive(String a)   { this.isActive = a; }
}
