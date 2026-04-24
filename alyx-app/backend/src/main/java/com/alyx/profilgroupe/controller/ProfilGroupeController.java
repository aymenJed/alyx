package com.alyx.profilgroupe.controller;

import com.alyx.profilgroupe.dto.CreateProfilGroupeRequest;
import com.alyx.profilgroupe.dto.ProfilGroupeDto;
import com.alyx.profilgroupe.service.ProfilGroupeService;
import com.alyx.core.common.PagedResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/profils-groupes")
@PreAuthorize("hasRole('ADMIN')")
public class ProfilGroupeController {

    private final ProfilGroupeService service;

    public ProfilGroupeController(ProfilGroupeService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<PagedResponse<ProfilGroupeDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfilGroupeDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProfilGroupeDto> create(@Valid @RequestBody CreateProfilGroupeRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfilGroupeDto> update(@PathVariable Long id,
                                                   @Valid @RequestBody CreateProfilGroupeRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
