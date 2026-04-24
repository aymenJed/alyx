package com.alyx.metadata.dto;

public record UpdateMenuRequest(
    Long parentId,
    String code,
    String label,
    String icon,
    String route,
    String screenCode,
    Integer displayOrder,
    Boolean isActive,
    String roleRequired
) {}
