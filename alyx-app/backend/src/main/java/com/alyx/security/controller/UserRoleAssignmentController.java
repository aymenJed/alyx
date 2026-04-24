package com.alyx.security.controller;

import com.alyx.core.common.PagedResponse;
import com.alyx.security.dto.AssignRoleRequest;
import com.alyx.security.dto.UserAssignmentDto;
import com.alyx.security.service.UserRoleAssignmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Affectation d'un rôle à un utilisateur (UserRoleAssignment).
 *
 * GET    /api/v1/security/user-role-assignments?page=0&size=20&search=...
 * GET    /api/v1/security/user-role-assignments/{id}
 * POST   /api/v1/security/user-role-assignments         → assigne { userId, roleId }
 * DELETE /api/v1/security/user-role-assignments/{id}    → désassigne
 */
@RestController
@RequestMapping("/api/v1/security/user-role-assignments")
@PreAuthorize("hasRole('ADMIN')")
public class UserRoleAssignmentController {

    private final UserRoleAssignmentService service;

    public UserRoleAssignmentController(UserRoleAssignmentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<UserAssignmentDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAssignmentDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<UserAssignmentDto> create(@Valid @RequestBody AssignRoleRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
