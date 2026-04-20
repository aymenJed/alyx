package com.alyx.metadata.controller;

import com.alyx.metadata.dto.CreateMenuRequest;
import com.alyx.metadata.dto.MenuItemDto;
import com.alyx.metadata.dto.MenuOptionsDto;
import com.alyx.metadata.dto.UpdateMenuRequest;
import com.alyx.metadata.service.MenuManagementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/designer/menus")
public class MenuManagementController {

    private final MenuManagementService menuService;

    public MenuManagementController(MenuManagementService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDto>> getAllMenus(
            @RequestParam(required = false, defaultValue = "flat") String view) {
        if ("tree".equals(view)) {
            return ResponseEntity.ok(menuService.getMenuTree());
        }
        return ResponseEntity.ok(menuService.getAllMenus());
    }

    @GetMapping("/tree")
    public ResponseEntity<List<MenuItemDto>> getMenuTree() {
        return ResponseEntity.ok(menuService.getMenuTree());
    }

    @GetMapping("/options")
    public ResponseEntity<MenuOptionsDto> getMenuOptions() {
        return ResponseEntity.ok(menuService.getMenuOptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDto> getMenuById(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.getMenuById(id));
    }

    @PostMapping
    public ResponseEntity<MenuItemDto> createMenu(@RequestBody CreateMenuRequest request) {
        try {
            MenuItemDto created = menuService.createMenu(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItemDto> updateMenu(@PathVariable Long id, @RequestBody UpdateMenuRequest request) {
        try {
            MenuItemDto updated = menuService.updateMenu(id, request);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        try {
            menuService.deleteMenu(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Void> toggleMenuStatus(@PathVariable Long id) {
        menuService.toggleMenuStatus(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reorder")
    public ResponseEntity<Void> reorderMenus(@RequestBody List<Long> orderedIds) {
        menuService.reorderMenus(orderedIds);
        return ResponseEntity.ok().build();
    }
}
