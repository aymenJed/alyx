package com.alyx.metadata.designer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Map;

public record UpdateScreenRequest(

        @NotBlank @Size(max = 200)
        String title,

        @Size(max = 1000)
        String description,

        @NotBlank
        @Pattern(regexp = "^(GRID|FORM|MASTER_DETAIL|ANALYTICS)$")
        String templateType,

        @NotBlank @Size(max = 500)
        String apiBaseUrl,

        Map<String, Object> permissions,
        Map<String, Object> gridConfig,
        Map<String, Object> analyticsConfig,

        @Pattern(regexp = "^[YN]$")
        String isActive
) {}
