package com.alyx.data.service;

import com.alyx.core.common.PagedResponse;
import com.alyx.data.dto.DataQuery;

import java.util.Map;

/**
 * Service générique "Metadata-Driven" : point d'entrée unique pour la lecture
 * d'une grille (DataGrid) du frontend Angular, indépendamment de l'entité ciblée.
 *
 * La résolution de l'entité JPA est dynamique, à partir du FQCN fourni dans
 * la métadonnée d'écran ({@code UI_SCREEN.ENTITY_CLASS}).
 */
public interface DataService {

    /**
     * Récupère la page demandée d'enregistrements de l'entité.
     *
     * @param query paramètres de la requête (entityClass, page, size, sort, search)
     * @return réponse paginée, chaque ligne étant une Map clé-valeur des champs scalaires
     */
    PagedResponse<Map<String, Object>> findAll(DataQuery query);

    /**
     * Récupère un enregistrement par son identifiant (Long).
     *
     * @param entityClass FQCN de l'entité cible
     * @param id          identifiant primaire
     * @return Map des champs scalaires de l'entité
     */
    Map<String, Object> findById(String entityClass, Long id);
}
