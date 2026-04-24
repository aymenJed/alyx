package com.alyx.security.dto;

import com.alyx.security.entity.Role;

/**
 * DTO de réponse pour {@link Role}.
 * Généré automatiquement — ne pas modifier manuellement.
 */
public record RoleDto(
    Long id,
    String roleName,
    String roleDescription,
    String roleType,
    Boolean isActive
) {
    /** Convertit l'entité en DTO. */
    public static RoleDto from(Role e) {
        return new RoleDto(
            e.getId(),
            e.getRoleName(),
            e.getRoleDescription(),
            e.getRoleType(),
            e.getIsActive()
        );
    }
}
