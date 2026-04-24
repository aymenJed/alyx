package com.alyx.metadata.designer.dto;

import jakarta.validation.constraints.*;

import java.util.List;
import java.util.Map;

/**
 * DTO pour la création et la modification d'un composant.
 * Aligné sur la hiérarchie SimpleField du modèle de référence PresentationViewModel.
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
        @Pattern(regexp = "^(TEXT|NUMBER|AMOUNT|EMAIL|PASSWORD|SELECT|MULTISELECT|AUTOCOMPLETE|DATE|DATETIME|TIME|CHECKBOX|RADIO|SWITCH|TEXTAREA|FILE|IMAGE|BADGE|LINK|PROGRESS|CURRENCY|GROUP|SEPARATOR|RELATION_ONE|RELATION_MANY)$")
        String componentType,

        String placeholder,
        String defaultValue,

        boolean required,
        boolean readonly,
        boolean visible,
        boolean sortable,
        boolean filterable,
        boolean gridColumn,
        boolean fireOnChange,

        // Expressions dynamiques — équivalent *Exp du modèle de référence
        @Size(max = 500) String visibilityExp,
        @Size(max = 500) String readonlyExp,
        @Size(max = 500) String requireExp,
        @Size(max = 500) String labelExp,
        @Size(max = 1000) String onFireOnChangeExp,
        @Size(max = 1000) String dynamicListDataExp,

        @Min(0) @Max(999)
        int displayOrder,

        @Min(1) @Max(12)
        int gridColSpan,

        Integer colSpan,
        Integer rowSpan,

        @Size(max = 1000) String validationRegex,
        @Size(max = 500)  String validationMsg,
        Integer maxLength,
        Double  minValue,
        Double  maxValue,

        @Size(max = 500) String optionsSource,
        List<Map<String, Object>> optionsJson,
        String relatedEntity,
        String displayField,

        @Size(max = 100) String formatPattern,
        Boolean dateOnly,
        String caseTransform,
        Integer nbLines
) {}
