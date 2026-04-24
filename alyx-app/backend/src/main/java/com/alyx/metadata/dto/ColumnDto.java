package com.alyx.metadata.dto;

/** DTO d'une colonne de grille — équivalent de Column / TreeColumn du modèle de référence. */
public record ColumnDto(
        Long    columnId,
        String  fieldName,
        String  label,
        Integer width,
        String  columnAlign,
        boolean isSortable,
        boolean isFilterable,
        boolean isEditable,
        boolean isVisible,
        String  visibilityExp,
        String  labelExp,
        String  formatPattern,
        String  actionCode,
        Integer displayOrder
) {}
