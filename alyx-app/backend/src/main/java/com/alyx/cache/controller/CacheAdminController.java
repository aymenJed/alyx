package com.alyx.cache.controller;

import com.alyx.cache.service.CacheAdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/cache")
@PreAuthorize("hasRole('ADMIN')")
public class CacheAdminController {

    private final CacheAdminService service;

    public CacheAdminController(CacheAdminService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStatus() {
        return ResponseEntity.ok(service.getStatus());
    }

    @PostMapping("/charger-securite")
    public ResponseEntity<Void> chargerSecurite() {
        service.chargerSecurite();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/vider")
    public ResponseEntity<Void> viderCache() {
        service.viderCache();
        return ResponseEntity.noContent().build();
    }
}
