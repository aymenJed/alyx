package com.alyx.security.dto;

import jakarta.validation.constraints.NotNull;

public record AssignRoleRequest(
        @NotNull(message = "User ID is required")
        Long userId
) {}
