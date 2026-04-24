package com.alyx.profilorganisationnel.controller;

import com.alyx.profilorganisationnel.dto.CreateProfilOrgRequest;
import com.alyx.profilorganisationnel.dto.ProfilOrgDto;
import com.alyx.profilorganisationnel.service.ProfilOrgService;
import com.alyx.core.common.PagedResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/profils-org")
@PreAuthorize("hasRole('ADMIN')")
public class ProfilOrgController {

    private final ProfilOrgService service;

    public ProfilOrgController(ProfilOrgService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<PagedResponse<ProfilOrgDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/actifs")
    public ResponseEntity<List<ProfilOrgDto>> findAllActive() {
        return ResponseEntity.ok(service.findAllActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfilOrgDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProfilOrgDto> create(@Valid @RequestBody CreateProfilOrgRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfilOrgDto> update(@PathVariable Long id,
                                                @Valid @RequestBody CreateProfilOrgRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
