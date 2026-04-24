package com.alyx.metadata.dto;

/** DTO d'une action — équivalent de Action / ActionElement du modèle de référence. */
public record ActionDto(
        Long    actionId,
        String  code,
        String  label,
        String  icon,
        String  actionType,
        String  renderer,
        String  httpMethod,
        String  endpoint,
        boolean isEnabled,
        boolean requireValidation,
        boolean requireSelection,
        boolean withConfirmation,
        String  confirmationMsg,
        boolean endAction,
        String  conditionExp,
        String  color,
        Integer displayOrder,
        String  groupCode,
        // Raccourci clavier
        boolean kbCtrl,
        boolean kbAlt,
        boolean kbShift,
        String  kbKey
) {}
