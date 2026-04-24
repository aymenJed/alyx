package com.alyx.menuutilisateur.controller;

import com.alyx.menuutilisateur.dto.MenuUtilisateurDto;
import com.alyx.menuutilisateur.service.MenuUtilisateurService;
import com.alyx.core.common.PagedResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/menu-utilisateurs")
@PreAuthorize("hasRole('ADMIN')")
public class MenuUtilisateurController {

    private final MenuUtilisateurService service;

    public MenuUtilisateurController(MenuUtilisateurService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<PagedResponse<MenuUtilisateurDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @PostMapping("/{userId}/enable/{menuId}")
    public ResponseEntity<Void> enable(@PathVariable Long userId, @PathVariable Long menuId) {
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{userId}/disable/{menuId}")
    public ResponseEntity<Void> disable(@PathVariable Long userId, @PathVariable Long menuId) {
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveAll(@RequestBody java.util.List<MenuUtilisateurDto> dtos) {
        return ResponseEntity.noContent().build();
    }
}
