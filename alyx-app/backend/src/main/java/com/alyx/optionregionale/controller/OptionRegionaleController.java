package com.alyx.optionregionale.controller;

import com.alyx.optionregionale.dto.CreateOptionRegionaleRequest;
import com.alyx.optionregionale.dto.OptionRegionaleDto;
import com.alyx.optionregionale.service.OptionRegionaleService;
import com.alyx.core.common.PagedResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/options-regionales")
@PreAuthorize("hasRole('ADMIN')")
public class OptionRegionaleController {

    private final OptionRegionaleService service;

    public OptionRegionaleController(OptionRegionaleService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<PagedResponse<OptionRegionaleDto>> findAll(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "20") int    size,
            @RequestParam(required = false)    String search) {
        return ResponseEntity.ok(service.findAll(page, size, search));
    }

    @GetMapping("/actifs")
    public ResponseEntity<List<OptionRegionaleDto>> findAllActive() {
        return ResponseEntity.ok(service.findAllActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OptionRegionaleDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<OptionRegionaleDto> create(@Valid @RequestBody CreateOptionRegionaleRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OptionRegionaleDto> update(@PathVariable Long id,
                                                      @Valid @RequestBody CreateOptionRegionaleRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
