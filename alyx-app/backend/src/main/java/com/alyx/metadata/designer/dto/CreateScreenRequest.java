package com.alyx.metadata.designer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Map;

import com.alyx.metadata.entity.TemplateType;

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

        // Le type de template est un enum : @Pattern/@NotBlank ne s'appliquent pas aux enums.
        // La désérialisation Jackson échoue déjà si la valeur reçue n'est pas dans l'enum.
        @NotNull(message = "Le type de template est obligatoire")
        TemplateType templateType,

        @NotBlank(message = "L'URL de l'API est obligatoire")
        @Size(max = 500)
        String apiBaseUrl,

        // Propriétés View
        String  caption,
        Long    width,
        Long    height,
        Integer refreshTime,

        // Propriétés EntityInputView
        String  entityClass,
        String  criteria,
        String  orderBy,
        String  compositionLayout,
        String  actionLayout,
        Integer autoSaveTime,

        // Propriétés GridView
        Integer pageSize,

        // Config Analytics (JSON libre)
        Map<String, Object> analyticsConfig
) {}
