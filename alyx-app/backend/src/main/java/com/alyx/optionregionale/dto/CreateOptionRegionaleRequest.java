package com.alyx.optionregionale.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateOptionRegionaleRequest(
    @NotBlank String nom,
    @NotBlank String langue,
    String formatNombre,
    String formatDate,
    String symboleDecimal,
    String symboleGroupement,
    String formatHoraire,
    String timezone,
    Boolean isActive
) {}
