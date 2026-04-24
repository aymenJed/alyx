package com.alyx.security.entity;

import com.alyx.auth.entity.AppUser;
import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_role_assignment",
       uniqueConstraints = @UniqueConstraint(columnNames = {"USER_ID", "ROLE_ID"}))
@AttributeOverride(name = "id",        column = @Column(name = "ASSIGNMENT_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UserRoleAssignment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", nullable = false)
    private Role role;

    /** Who assigned the role (domain-specific, distinct from createdBy) */
    @Column(name = "ASSIGNED_BY", length = 100)
    private String assignedBy;

    /** When the role was assigned (domain-specific timestamp) */
    @Column(name = "ASSIGNED_AT", nullable = false, updatable = false)
    private LocalDateTime assignedAt;

    @PrePersist
    void onAssign() { this.assignedAt = LocalDateTime.now(); }

    public UserRoleAssignment() {}

    public UserRoleAssignment(AppUser user, Role role, String assignedBy) {
        this.user = user;
        this.role = role;
        this.assignedBy = assignedBy;
    }

    public Long getAssignmentId()    { return getId(); }
    public AppUser getUser()          { return user; }
    public void setUser(AppUser u)   { this.user = u; }
    public Role getRole()            { return role; }
    public void setRole(Role r)     { this.role = r; }
    public String getAssignedBy()    { return assignedBy; }
    public void setAssignedBy(String a) { this.assignedBy = a; }
    public LocalDateTime getAssignedAt() { return assignedAt; }
}
