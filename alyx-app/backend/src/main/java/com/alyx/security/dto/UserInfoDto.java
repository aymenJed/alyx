package com.alyx.security.dto;

import java.time.LocalDateTime;
import java.util.List;

public record UserInfoDto(
        Long          userId,
        String        username,
        String        fullName,
        String        email,
        String        isActive,
        List<String>  roles,
        LocalDateTime assignedAt
) {}
