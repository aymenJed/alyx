package com.alyx.groupe.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "app_group")
@AttributeOverride(name = "id",        column = @Column(name = "group_id"))
@AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "created_by", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "updated_by", length = 50))
public class AppGroup extends BaseEntity {

    @Column(name = "group_code", nullable = false, unique = true, length = 50)
    private String groupCode;

    @Column(name = "group_name", nullable = false, length = 100)
    private String groupName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_group_id")
    private AppGroup parentGroup;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public Long   getGroupId()                        { return getId(); }
    public String getGroupCode()                      { return groupCode; }
    public void   setGroupCode(String groupCode)      { this.groupCode = groupCode; }
    public String getGroupName()                      { return groupName; }
    public void   setGroupName(String groupName)      { this.groupName = groupName; }
    public AppGroup getParentGroup()                  { return parentGroup; }
    public void   setParentGroup(AppGroup g)          { this.parentGroup = g; }
    public String getDescription()                    { return description; }
    public void   setDescription(String description)  { this.description = description; }
    public Boolean getIsActive()                      { return isActive; }
    public void   setIsActive(Boolean isActive)       { this.isActive = isActive; }
}
