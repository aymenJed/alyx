package com.alyx.data.controller;

import com.alyx.core.common.PagedResponse;
import com.alyx.data.dto.DataQuery;
import com.alyx.data.service.DataService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Point d'entrée REST unique, orienté Metadata-Driven, pour la lecture
 * générique de toute entité JPA du domaine {@code com.alyx.*}.
 *
 * <p>Utilisé par le composant Angular {@code DataGridComponent} :<br>
 * <pre>GET /api/v1/data?entityClass=com.alyx.core.tier.entity.Client&amp;page=0&amp;size=20&amp;sort=nom,asc</pre>
 *
 * <p>Principe SOA : un seul service (DataService) rend le même contrat à toutes
 * les grilles du frontend, quel que soit le modèle métier ciblé.
 */
@RestController
@RequestMapping("/api/v1/data")
@CrossOrigin(origins = "*")
public class DataController {

    private static final Logger log = LoggerFactory.getLogger(DataController.class);

    private final DataService dataService;

    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    /**
     * Retourne la liste paginée d'enregistrements pour l'entité passée
     * via le paramètre obligatoire {@code entityClass}.
     */
    @GetMapping
    public ResponseEntity<PagedResponse<Map<String, Object>>> findAll(
            @RequestParam String entityClass,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false)    String sort,
            @RequestParam(required = false)    String search) {
        log.debug("GET /api/v1/data entityClass={} page={} size={} sort={} search={}",
                entityClass, page, size, sort, search);
        PagedResponse<Map<String, Object>> result =
                dataService.findAll(new DataQuery(entityClass, page, size, sort, search));
        return ResponseEntity.ok(result);
    }

    /**
     * Retourne un enregistrement unique par son id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> findById(
            @RequestParam String entityClass,
            @PathVariable Long id) {
        return ResponseEntity.ok(dataService.findById(entityClass, id));
    }

    // =========================================================
    // Gestion d'erreurs spécifique au contrôleur
    // =========================================================

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
        log.warn("Requête invalide: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", ex.getMessage()));
    }
}
