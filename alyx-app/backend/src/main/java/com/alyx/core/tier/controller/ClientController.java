package com.alyx.core.tier.controller;

import com.alyx.core.tier.dto.ClientDto;
import com.alyx.core.tier.service.ClientService;
import com.alyx.core.common.PagedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * CRUD Client — consommé par le DataGrid server-driven du frontend.
 * GET    /api/v1/client?page=0&size=20&search=...  → PagedResponse
 * GET    /api/v1/client/{id}                       → ClientDto
 * POST   /api/v1/client                            → ClientDto
 * PUT    /api/v1/client/{id}                       → ClientDto
 * DELETE /api/v1/client/{id}                       → 204
 */

@RestController
@RequestMapping("/api/v1/client")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<PagedResponse<ClientDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(clientService.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDto> getById(@PathVariable Long id) {
        return clientService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClientDto> create(@RequestBody ClientDto dto) {
        ClientDto created = clientService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDto> update(@PathVariable Long id, @RequestBody ClientDto dto) {
        return ResponseEntity.ok(clientService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}