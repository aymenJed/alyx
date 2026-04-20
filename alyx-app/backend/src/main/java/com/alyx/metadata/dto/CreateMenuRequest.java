package com.alyx.metadata.dto;

import java.time.LocalDateTime;

public record CreateMenuRequest(
    Long parentId,
    String code,
    String label,
    String icon,
    String route,
    String screenCode,
    Integer displayOrder,
    String isActive,
    String roleRequired
) {}
