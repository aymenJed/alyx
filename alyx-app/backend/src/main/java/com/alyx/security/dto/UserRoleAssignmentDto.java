package com.alyx.security.dto;

import java.time.LocalDateTime;

import com.alyx.auth.entity.AppUser;
import com.alyx.security.entity.Role;
import com.alyx.security.entity.UserRoleAssignment;

public record UserRoleAssignmentDto(long id, Role role, AppUser user, LocalDateTime createdAt, LocalDateTime updatedAt,
		String createdBy, String updatedBy) {

	public static UserRoleAssignmentDto from(UserRoleAssignment u) {
		return new UserRoleAssignmentDto(u.getId(), u.getRole(), u.getUser(), u.getCreatedAt(), u.getUpdatedAt(),
				u.getCreatedBy(), u.getUpdatedBy());
	}
}
