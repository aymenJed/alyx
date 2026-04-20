package com.example.myapp.controller;

import com.example.myapp.dto.CompteDto;
import com.example.myapp.service.CompteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compte")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CompteController {

    private final CompteService compteService;

    @GetMapping
    public ResponseEntity<List<CompteDto>> getAll() {
        return ResponseEntity.ok(compteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompteDto> getById(@PathVariable Long id) {
        return compteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CompteDto> create(@RequestBody CompteDto dto) {
        compteDto created = compteService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompteDto> update(@PathVariable Long id, @RequestBody CompteDto dto) {
        return ResponseEntity.ok(compteService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        CompteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
