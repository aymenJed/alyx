package com.alyx.metadata.designer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Map;

public record CreateScreenRequest(

        @NotBlank(message = "Le code est obligatoire")
        @Pattern(regexp = "^[A-Z0-9_]{3,50}$",
                 message = "Le code doit être en majuscules, chiffres et underscores (3-50 caractères)")
        String code,

        @NotBlank(message = "Le titre est obligatoire")
        @Size(max = 200)
        String title,

        @Size(max = 1000)
        String description,

        @NotBlank(message = "Le type de template est obligatoire")
        @Pattern(regexp = "^(GRID|FORM|MASTER_DETAIL|ANALYTICS)$",
                 message = "Type invalide. Valeurs: GRID, FORM, MASTER_DETAIL, ANALYTICS")
        String templateType,

        @NotBlank(message = "L'URL de l'API est obligatoire")
        @Size(max = 500)
        String apiBaseUrl,

        Map<String, Object> permissions,
        Map<String, Object> gridConfig,
        Map<String, Object> analyticsConfig
) {}
