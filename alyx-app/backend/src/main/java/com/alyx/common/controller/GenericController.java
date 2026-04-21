package com.alyx.common.controller;

import com.alyx.common.service.GenericService;
import com.alyx.core.common.PagedResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public abstract class GenericController<D, ID> {

    protected final GenericService<D, ID> service;

    protected GenericController(GenericService<D, ID> service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<D>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<D> getById(@PathVariable ID id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<D> create(@RequestBody D dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<D> update(@PathVariable ID id, @RequestBody D dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
