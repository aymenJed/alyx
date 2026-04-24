package com.alyx.groupe.controller;

import com.alyx.groupe.dto.CreateGroupeRequest;
import com.alyx.groupe.dto.GroupeDto;
import com.alyx.groupe.service.GroupeService;
import com.alyx.core.common.PagedResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/groupes")
@PreAuthorize("hasRole('ADMIN')")
public class GroupeController {

    private final GroupeService service;

    public GroupeController(GroupeService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<PagedResponse<GroupeDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/actifs")
    public ResponseEntity<List<GroupeDto>> findAllActive() {
        return ResponseEntity.ok(service.findAllActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupeDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<GroupeDto> create(@Valid @RequestBody CreateGroupeRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupeDto> update(@PathVariable Long id,
                                             @Valid @RequestBody CreateGroupeRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
