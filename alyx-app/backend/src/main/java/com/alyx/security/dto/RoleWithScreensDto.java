package com.alyx.security.dto;

import java.util.List;

public record RoleWithScreensDto(
        Long roleId,
        String roleName,
        String roleDescription,
        String roleType,
        String isActive,
        List<ScreenAccessDto> screens
) {}
