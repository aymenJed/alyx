package com.alyx.data.dto;

/**
 * Paramètres d'une requête de lecture générique sur une entité JPA.
 *
 * - {@code entityClass} : Fully Qualified Class Name (FQCN) de l'entité cible
 *                         (ex: com.alyx.core.tier.entity.Client)
 * - {@code page} / {@code size} : pagination (0-indexé)
 * - {@code sort}  : "field,asc" | "field,desc" (optionnel)
 * - {@code search} : texte libre pour filtrage multi-colonnes (optionnel)
 *
 * Part de l'approche Metadata-Driven : le moteur de métadonnées stocke le FQCN
 * dans {@code UI_SCREEN.ENTITY_CLASS}, le frontend le transmet tel quel au Data API.
 */
public record DataQuery(
        String  entityClass,
        int     page,
        int     size,
        String  sort,
        String  search
) {
    public DataQuery {
        if (entityClass == null || entityClass.isBlank()) {
            throw new IllegalArgumentException("Le paramètre 'entityClass' est obligatoire");
        }
        if (page < 0)  page = 0;
        if (size <= 0) size = 20;
        if (size > 500) size = 500; // garde-fou anti-DoS
    }
}
