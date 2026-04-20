package com.alyx.security.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record AddScreenAccessRequest(
        @NotBlank(message = "Screen code is required")
        String screenCode,

        @Pattern(regexp = "^(READ|WRITE|DELETE|ADMIN)$", message = "Access level must be READ, WRITE, DELETE or ADMIN")
        String accessLevel
) {}
