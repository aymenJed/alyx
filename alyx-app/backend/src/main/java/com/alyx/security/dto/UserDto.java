package com.alyx.security.dto;

import com.alyx.auth.entity.AppUser;
import java.time.LocalDateTime;
import java.util.List;

public record UserDto(
    Long          userId,
    String        username,
    String        fullName,
    String        email,
    String        roles,
    List<String>  roleList,
    Boolean       isActive,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    String        createdBy
) {
    public static UserDto from(AppUser u) {
        return new UserDto(
            u.getUserId(),
            u.getUsername(),
            u.getFullName(),
            u.getEmail(),
            u.getRoles(),
            u.getRoleList(),
            u.getIsActive(),
            u.getCreatedAt(),
            u.getUpdatedAt(),
            u.getCreatedBy()
        );
    }
}
