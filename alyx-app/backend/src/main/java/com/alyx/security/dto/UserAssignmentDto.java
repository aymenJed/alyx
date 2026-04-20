package com.alyx.security.dto;

import java.time.LocalDateTime;

public record UserAssignmentDto(
        Long          assignmentId,
        Long          userId,
        String        username,
        String        fullName,
        Long          roleId,
        String        roleName,
        String        assignedBy,
        LocalDateTime assignedAt
) {}
