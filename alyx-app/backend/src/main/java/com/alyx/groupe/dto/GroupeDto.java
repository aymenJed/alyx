package com.alyx.groupe.dto;

import com.alyx.groupe.entity.AppGroup;

public record GroupeDto(
    Long   groupId,
    String groupCode,
    String groupName,
    Long   parentGroupId,
    String parentGroupName,
    String description,
    Boolean isActive
) {
    public static GroupeDto from(AppGroup g) {
        return new GroupeDto(
            g.getGroupId(),
            g.getGroupCode(),
            g.getGroupName(),
            g.getParentGroup() != null ? g.getParentGroup().getGroupId() : null,
            g.getParentGroup() != null ? g.getParentGroup().getGroupName() : null,
            g.getDescription(),
            g.getIsActive()
        );
    }
}
