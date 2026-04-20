package com.alyx.metadata.dto;

import java.util.List;
import java.util.Map;

/**
 * DTO Record Java 22 — Configuration atomique d'un champ/colonne.
 * Transporté vers le Frontend pour construire dynamiquement
 * les formulaires et tableaux (FormGenerator / DataGrid).
 */
public record ComponentDto(
        Long componentId,
        String fieldKey,
        String label,
        String componentType,
        String placeholder,
        String defaultValue,
        boolean required,
        boolean readonly,
        boolean visible,
        boolean sortable,
        boolean filterable,
        boolean gridColumn,
        int displayOrder,
        int gridColSpan,
        String validationRegex,
        String validationMsg,
        String optionsSource,
        List<Map<String, Object>> options,
        Map<String, Object> visibilityRule,
        String formatPattern
) {}
