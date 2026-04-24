package com.alyx.metadata.designer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Map;

import com.alyx.metadata.entity.TemplateType;

public record UpdateScreenRequest(

        @NotBlank @Size(max = 200)
        String title,

        @Size(max = 1000)
        String description,

        // TemplateType est un enum : @NotBlank/@Pattern ne s'appliquent qu'aux String.
        @NotNull(message = "Le type de template est obligatoire")
        TemplateType templateType,

        @NotBlank @Size(max = 500)
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
        Map<String, Object> analyticsConfig,

        Boolean isActive
) {}
