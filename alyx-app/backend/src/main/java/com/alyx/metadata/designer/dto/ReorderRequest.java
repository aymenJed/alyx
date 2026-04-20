package com.alyx.metadata.designer.dto;

import java.util.List;

/**
 * Réorganisation des composants après drag & drop côté frontend.
 * Contient la liste ordonnée des IDs de composants.
 */
public record ReorderRequest(List<Long> orderedComponentIds) {}
