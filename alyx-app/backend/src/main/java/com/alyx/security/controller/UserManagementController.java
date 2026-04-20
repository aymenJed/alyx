package com.alyx.security.controller;

import com.alyx.core.common.PagedResponse;
import com.alyx.security.dto.CreateUserRequest;
import com.alyx.security.dto.UpdateUserRequest;
import com.alyx.security.dto.UserDto;
import com.alyx.security.service.UserManagementService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * CRUD Utilisateurs — consommé par le DataGrid server-driven du frontend.
 * GET  /api/v1/admin/utilisateurs?page=0&size=20&search=...  → PagedResponse<UserDto>
 * GET  /api/v1/admin/utilisateurs/{id}                       → UserDto
 * POST /api/v1/admin/utilisateurs                            → UserDto (201)
 * PUT  /api/v1/admin/utilisateurs/{id}                       → UserDto
 * PATCH /api/v1/admin/utilisateurs/{id}/toggle               → 204
 * DELETE /api/v1/admin/utilisateurs/{id}                     → 204
 */
@RestController
@RequestMapping("/api/v1/admin/utilisateurs")
@PreAuthorize("hasRole('ADMIN')")
public class UserManagementController {

    private final UserManagementService service;

    public UserManagementController(UserManagementService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<UserDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<UserDto> create(@Valid @RequestBody CreateUserRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Void> toggleActive(@PathVariable Long id) {
        service.toggleActive(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
