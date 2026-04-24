package com.alyx.profilorganisationnel.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateProfilOrgRequest(
    @NotBlank String nomProfil,
    String organizationUnit,
    String mainEntity,
    String description,
    Boolean isActive
) {}
