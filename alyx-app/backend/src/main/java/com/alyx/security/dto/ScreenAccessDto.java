package com.alyx.security.dto;

public record ScreenAccessDto(
        Long accessId,
        Long screenId,
        String screenCode,
        String screenTitle,
        String accessLevel,
        String isActive
) {}
