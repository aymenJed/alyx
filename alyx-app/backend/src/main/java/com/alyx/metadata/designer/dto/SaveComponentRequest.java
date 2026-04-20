package com.alyx.metadata.designer.dto;

import jakarta.validation.constraints.*;

import java.util.List;
import java.util.Map;

/**
 * DTO unique pour la création et la modification d'un composant.
 * Le fieldKey n'est fourni qu'à la création (immutable après création).
 */
public record SaveComponentRequest(

        @NotBlank(message = "La clé API est obligatoire")
        @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_]{1,99}$",
                 message = "La clé doit commencer par une lettre (camelCase recommandé)")
        String fieldKey,

        @NotBlank(message = "Le libellé est obligatoire")
        @Size(max = 200)
        String label,

        @NotBlank
        @Pattern(regexp = "^(TEXT|NUMBER|AMOUNT|EMAIL|PASSWORD|SELECT|MULTISELECT|AUTOCOMPLETE|DATE|DATETIME|TIME|CHECKBOX|RADIO|SWITCH|TEXTAREA|FILE|IMAGE|BADGE|LINK|PROGRESS|CURRENCY)$")
        String componentType,

        String placeholder,
        String defaultValue,

        boolean required,
        boolean readonly,
        boolean visible,
        boolean sortable,
        boolean filterable,
        boolean gridColumn,

        @Min(0) @Max(999)
        int displayOrder,

        @Min(1) @Max(12)
        int gridColSpan,

        @Size(max = 1000)
        String validationRegex,

        @Size(max = 500)
        String validationMsg,

        @Size(max = 500)
        String optionsSource,

        List<Map<String, Object>> optionsJson,
        Map<String, Object> visibilityRule,

        @Size(max = 100)
        String formatPattern
) {}
