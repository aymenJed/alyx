package com.alyx.core.acc.controller;

import com.alyx.core.acc.dto.CompteDto;
import com.alyx.core.acc.service.CompteService;
import com.alyx.core.common.PagedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * CRUD Compte — consommé par le DataGrid server-driven du frontend.
 * GET    /api/v1/compte?page=0&size=20&search=...  → PagedResponse
 * GET    /api/v1/compte/{id}                       → CompteDto
 * POST   /api/v1/compte                            → CompteDto
 * PUT    /api/v1/compte/{id}                       → CompteDto
 * DELETE /api/v1/compte/{id}                       → 204
 */

@RestController
@RequestMapping("/api/v1/compte")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CompteController {

    private final CompteService compteService;

    @GetMapping
    public ResponseEntity<PagedResponse<CompteDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(compteService.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompteDto> getById(@PathVariable Long id) {
        return compteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CompteDto> create(@RequestBody CompteDto dto) {
        CompteDto created = compteService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompteDto> update(@PathVariable Long id, @RequestBody CompteDto dto) {
        return ResponseEntity.ok(compteService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        compteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}