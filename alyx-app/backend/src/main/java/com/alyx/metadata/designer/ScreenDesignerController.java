package com.alyx.metadata.designer;

import com.alyx.metadata.designer.dto.*;
import com.alyx.metadata.dto.ComponentDto;
import com.alyx.metadata.dto.ScreenMetadataDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * API de paramétrage — Permet la création et gestion des écrans
 * et de leurs composants directement via l'interface graphique.
 *
 * Toutes les routes sont protégées par ROLE_ADMIN.
 * Préfixe : /api/v1/designer
 */
@RestController
@RequestMapping("/api/v1/designer")
@PreAuthorize("hasRole('ADMIN')")
public class ScreenDesignerController {

    private final ScreenDesignerService service;

    public ScreenDesignerController(ScreenDesignerService service) {
        this.service = service;
    }

    // =========================================================
    // SCREENS
    // =========================================================

    /** Liste tous les écrans (actifs + inactifs) */
    @GetMapping("/screens")
    public ResponseEntity<List<ScreenMetadataDto>> listScreens() {
        return ResponseEntity.ok(service.listAllScreens());
    }

    /** Détail complet d'un écran avec tous ses composants */
    @GetMapping("/screens/{screenId}")
    public ResponseEntity<ScreenMetadataDto> getScreen(@PathVariable Long screenId) {
        return ResponseEntity.ok(service.getScreen(screenId));
    }

    /** Création d'un nouvel écran */
    @PostMapping("/screens")
    public ResponseEntity<ScreenMetadataDto> createScreen(
            @Valid @RequestBody CreateScreenRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createScreen(req));
    }

    /** Modification d'un écran existant */
    @PutMapping("/screens/{screenId}")
    public ResponseEntity<ScreenMetadataDto> updateScreen(
            @PathVariable Long screenId,
            @Valid @RequestBody UpdateScreenRequest req) {
        return ResponseEntity.ok(service.updateScreen(screenId, req));
    }

    /** Désactivation (soft-delete) d'un écran */
    @DeleteMapping("/screens/{screenId}")
    public ResponseEntity<Void> deleteScreen(@PathVariable Long screenId) {
        service.deleteScreen(screenId);
        return ResponseEntity.noContent().build();
    }

    // =========================================================
    // COMPONENTS
    // =========================================================

    /** Liste les composants d'un écran */
    @GetMapping("/screens/{screenId}/components")
    public ResponseEntity<List<ComponentDto>> listComponents(@PathVariable Long screenId) {
        return ResponseEntity.ok(service.listComponents(screenId));
    }

    /** Ajout d'un composant à un écran */
    @PostMapping("/screens/{screenId}/components")
    public ResponseEntity<ComponentDto> addComponent(
            @PathVariable Long screenId,
            @Valid @RequestBody SaveComponentRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addComponent(screenId, req));
    }

    /** Modification d'un composant */
    @PutMapping("/screens/{screenId}/components/{componentId}")
    public ResponseEntity<ComponentDto> updateComponent(
            @PathVariable Long screenId,
            @PathVariable Long componentId,
            @Valid @RequestBody SaveComponentRequest req) {
        return ResponseEntity.ok(service.updateComponent(screenId, componentId, req));
    }

    /** Suppression définitive d'un composant */
    @DeleteMapping("/screens/{screenId}/components/{componentId}")
    public ResponseEntity<Void> deleteComponent(
            @PathVariable Long screenId,
            @PathVariable Long componentId) {
        service.deleteComponent(screenId, componentId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Réorganisation des composants après drag & drop.
     * Reçoit la liste ordonnée des IDs.
     */
    @PatchMapping("/screens/{screenId}/components/reorder")
    public ResponseEntity<Void> reorderComponents(
            @PathVariable Long screenId,
            @RequestBody ReorderRequest req) {
        service.reorderComponents(screenId, req);
        return ResponseEntity.noContent().build();
    }
}
