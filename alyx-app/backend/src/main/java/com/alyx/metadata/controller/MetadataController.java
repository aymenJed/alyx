package com.alyx.metadata.controller;

import com.alyx.metadata.dto.*;
import com.alyx.metadata.exception.ScreenNotFoundException;
import com.alyx.metadata.service.MetadataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Point d'entrée unique pour le moteur de métadonnées.
 * Tous les écrans Angular se construisent via ces endpoints.
 */
@RestController
@RequestMapping("/api/v1/metadata")
public class MetadataController {

    private static final Logger log = LoggerFactory.getLogger(MetadataController.class);

    private final MetadataService metadataService;

    public MetadataController(MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    // =========================================================
    // SCREEN
    // =========================================================

    /**
     * Endpoint principal : retourne la configuration complète d'un écran.
     * Le Frontend l'appelle à chaque navigation vers un nouvel écran.
     *
     * GET /api/v1/metadata/screens/SCR_OBLIGATIONS
     */
    @GetMapping("/screens/{code}")
    public ResponseEntity<ScreenMetadataDto> getScreenMetadata(
            @PathVariable String code) {
        try {
            log.info("getScreenMetadata called for code: {}", code);
            ScreenMetadataDto result = metadataService.buildScreenMetadata(code);
            log.info("Successfully built metadata for: {}", code);
            return ResponseEntity.ok(result);
        } catch (ScreenNotFoundException e) {
            log.warn("Screen not found: {}", code);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error building screen metadata for {}: {}", code, e.getMessage(), e);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    /**
     * Test endpoint to verify basic functionality.
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        return ResponseEntity.ok(Map.of("status", "ok", "message", "Test endpoint works"));
    }

    // =========================================================
    // MENU
    // =========================================================

    /**
     * Retourne l'arbre de menu filtré selon les rôles de l'utilisateur.
     *
     * GET /api/v1/metadata/menu
     */
    @GetMapping("/menu")
    public ResponseEntity<List<MenuNodeDto>> getMenu(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(metadataService.buildMenuTree(userDetails));
    }

    /**
     * Retourne l'arbre de menu complet (pour le generic renderer).
     *
     * GET /api/v1/metadata/menu/tree
     */
    @GetMapping("/menu/tree")
    public ResponseEntity<List<MenuNodeDto>> getMenuTree(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(metadataService.buildMenuTree(userDetails));
    }

    // =========================================================
    // SHORTCUTS
    // =========================================================

    /**
     * GET /api/v1/metadata/shortcuts
     */
    @GetMapping("/shortcuts")
    public ResponseEntity<List<ShortcutDto>> getShortcuts(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(metadataService.getShortcuts(userDetails.getUsername()));
    }

    /**
     * POST /api/v1/metadata/shortcuts/{screenCode}
     */
    @PostMapping("/shortcuts/{screenCode}")
    public ResponseEntity<Void> addShortcut(
            @PathVariable String screenCode,
            @AuthenticationPrincipal UserDetails userDetails) {
        metadataService.addShortcut(userDetails.getUsername(), screenCode);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * DELETE /api/v1/metadata/shortcuts/{screenCode}
     */
    @DeleteMapping("/shortcuts/{screenCode}")
    public ResponseEntity<Void> removeShortcut(
            @PathVariable String screenCode,
            @AuthenticationPrincipal UserDetails userDetails) {
        metadataService.removeShortcut(userDetails.getUsername(), screenCode);
        return ResponseEntity.noContent().build();
    }
}
