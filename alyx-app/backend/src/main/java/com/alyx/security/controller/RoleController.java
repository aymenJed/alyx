package com.alyx.security.controller;

import com.alyx.security.dto.RoleDto;
import com.alyx.security.dto.CreateRoleRequest;
import com.alyx.security.dto.UpdateRoleRequest;
import com.alyx.security.service.RoleService;
import com.alyx.core.common.PagedResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * CRUD Role — Controller REST généré automatiquement.
 *
 * GET    /api/v1/security/roles?page=0&size=20&search=...  → PagedResponse<RoleDto>
 * GET    /api/v1/security/roles/{id}                       → RoleDto
 * POST   /api/v1/security/roles                            → RoleDto (201)
 * PUT    /api/v1/security/roles/{id}                       → RoleDto
 * PATCH  /api/v1/security/roles/{id}/toggle                → 204
 * DELETE /api/v1/security/roles/{id}                       → 204
 */
@RestController
@RequestMapping("/api/v1/security/roles")
@PreAuthorize("hasRole('ADMIN')")
public class RoleController {

    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<RoleDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<RoleDto> create(@Valid @RequestBody CreateRoleRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDto> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRoleRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
