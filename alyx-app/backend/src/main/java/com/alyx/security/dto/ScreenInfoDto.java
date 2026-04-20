package com.alyx.security.dto;

public record ScreenInfoDto(
        Long screenId,
        String code,
        String title,
        String templateType,
        boolean hasAccess
) {}
