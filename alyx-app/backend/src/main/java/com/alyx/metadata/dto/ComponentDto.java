package com.alyx.metadata.dto;

import java.util.List;
import java.util.Map;

/**
 * DTO d'un champ/composant d'écran.
 * Aligné sur la hiérarchie FieldView / SimpleField du modèle de référence PresentationViewModel.
 * visibilityRule (JSON vague) remplacé par visibilityExp (expression évaluable côté client).
 */
public record ComponentDto(
        Long   componentId,
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
        boolean fireOnChange,
        // Expressions dynamiques (*Exp — modèle de référence)
        String visibilityExp,
        String readonlyExp,
        String requireExp,
        String labelExp,
        String onFireOnChangeExp,
        String dynamicListDataExp,
        // Layout
        int    displayOrder,
        int    gridColSpan,
        Integer colSpan,
        Integer rowSpan,
        // Validation
        String  validationRegex,
        String  validationMsg,
        Integer maxLength,
        Double  minValue,
        Double  maxValue,
        // Options / Relations
        String              optionsSource,
        List<Map<String, Object>> options,
        String              relatedEntity,
        String              displayField,
        // Rendu
        String  formatPattern,
        Boolean dateOnly,
        String  caseTransform,
        Integer nbLines
) {}
