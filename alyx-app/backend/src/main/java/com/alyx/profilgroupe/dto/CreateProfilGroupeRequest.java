package com.alyx.profilgroupe.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateProfilGroupeRequest(
    @NotBlank String nomProfil,
    Long   groupeId,
    Long   profilOrgId,
    Long   optionRegionaleId,
    String conditionConnexion,
    String habilitation,
    Boolean isActive
) {}
