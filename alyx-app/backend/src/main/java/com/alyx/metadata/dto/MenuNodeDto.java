package com.alyx.metadata.dto;

import java.util.List;

/**
 * DTO Record Java 22 — Nœud de menu hiérarchique.
 * Auto-référencé via children pour une profondeur illimitée.
 * Consommé par le SidebarComponent Angular.
 */
public record MenuNodeDto(
        Long id,
        Long parentId,
        String parentLabel,
        String code,
        String label,
        String icon,
        String route,
        String screenCode,
        int displayOrder,
        Boolean isActive,
        String roleRequired,
        int childrenCount,
        List<MenuNodeDto> children
) {
    public MenuNodeDto(Long menuId, String code, String label, String icon, String route, String screenCode, int displayOrder, List<MenuNodeDto> children) {
        this(menuId, null, null, code, label, icon, route, screenCode, displayOrder, true, null, 0, children);
    }
}
