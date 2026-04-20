package com.alyx.auth.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "app_user")
@AttributeOverride(name = "id",        column = @Column(name = "user_id"))
@AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "created_by", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "updated_by", length = 50))
public class AppUser extends BaseEntity {

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", length = 150)
    private String email;

    /** Comma-separated roles: "ROLE_ADMIN,ROLE_USER" */
    @Column(name = "roles", nullable = false, length = 200)
    private String roles;

    @Column(name = "is_active", nullable = false, columnDefinition = "char(1)")
    private String isActive = "Y";

    // -------------------------------------------------------
    // Helpers
    // -------------------------------------------------------

    public List<String> getRoleList() {
        return Arrays.stream(roles.split(","))
                .map(String::trim)
                .filter(r -> !r.isBlank())
                .toList();
    }

    public boolean isEnabled() {
        return "Y".equals(isActive);
    }

    // -------------------------------------------------------
    // Getters / Setters
    // -------------------------------------------------------

    public Long getUserId()                    { return getId(); }
    public String getUsername()                { return username; }
    public void setUsername(String username)   { this.username = username; }
    public String getPassword()                { return password; }
    public void setPassword(String password)   { this.password = password; }
    public String getFullName()                { return fullName; }
    public void setFullName(String fullName)   { this.fullName = fullName; }
    public String getEmail()                   { return email; }
    public void setEmail(String email)         { this.email = email; }
    public String getRoles()                   { return roles; }
    public void setRoles(String roles)         { this.roles = roles; }
    public String getIsActive()                { return isActive; }
    public void setIsActive(String isActive)   { this.isActive = isActive; }
}
