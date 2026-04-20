package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "UI_USER_SHORTCUT")
@AttributeOverride(name = "id",        column = @Column(name = "SHORTCUT_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UiUserShortcut extends BaseEntity {

    @Column(name = "USER_ID", nullable = false, length = 100)
    private String userId;

    @Column(name = "SCREEN_CODE", nullable = false, length = 50)
    private String screenCode;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    public UiUserShortcut() {}

    public UiUserShortcut(String userId, String screenCode, Integer displayOrder) {
        this.userId = userId;
        this.screenCode = screenCode;
        this.displayOrder = displayOrder;
    }

    public Long getShortcutId()      { return getId(); }
    public String getUserId()        { return userId; }
    public String getScreenCode()    { return screenCode; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
