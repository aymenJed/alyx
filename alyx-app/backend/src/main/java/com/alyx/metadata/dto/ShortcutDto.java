package com.alyx.metadata.dto;

/**
 * DTO Record Java 22 — Raccourci personnalisé utilisateur.
 * Consommé par la ShortcutBarComponent Angular.
 */
public record ShortcutDto(
        Long shortcutId,
        String screenCode,
        String screenTitle,
        String screenIcon,
        int displayOrder
) {}
