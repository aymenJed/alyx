package com.alyx.metadata.dto;

import java.util.List;
import java.util.Map;

/**
 * DTO Record Java 22 — Représentation complète d'un écran.
 * Retourné par GET /api/v1/metadata/screens/{code}.
 * Le Frontend construit l'interface entière à partir de cet objet.
 */
public record ScreenMetadataDto(
        Long screenId,
        String code,
        String title,
        String description,
        String templateType,
        String apiBaseUrl,
        Map<String, Object> permissions,
        Map<String, Object> gridConfig,
        Map<String, Object> analyticsConfig,
        List<ComponentDto> components
) {}
