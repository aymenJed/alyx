package com.alyx.metadata.dto;

import java.time.LocalDateTime;
import java.util.List;

public record MenuItemDto(
    Long id,
    Long parentId,
    String parentLabel,
    String code,
    String label,
    String icon,
    String route,
    String screenCode,
    Integer displayOrder,
    String isActive,
    String roleRequired,
    Integer childrenCount,
    List<MenuItemDto> children
) {
    public MenuItemDto(Long id, Long parentId, String parentLabel, String code, String label, String icon, String route, String screenCode, Integer displayOrder, String isActive, String roleRequired) {
        this(id, parentId, parentLabel, code, label, icon, route, screenCode, displayOrder, isActive, roleRequired, 0, List.of());
    }
}
