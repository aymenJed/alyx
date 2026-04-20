package com.alyx.security.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Requête de mise à jour pour {@link Role}.
 * Généré automatiquement — ne pas modifier manuellement.
 */
public record UpdateRoleRequest(
    @NotBlank String roleName,
    String roleDescription,
    @NotBlank String roleType,
    @NotBlank String isActive
) {}
