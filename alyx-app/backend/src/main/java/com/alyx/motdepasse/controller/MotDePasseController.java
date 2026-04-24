package com.alyx.motdepasse.controller;

import com.alyx.motdepasse.dto.ChangePasswordRequest;
import com.alyx.motdepasse.service.MotDePasseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/mot-de-passe")
@PreAuthorize("hasRole('ADMIN')")
public class MotDePasseController {

    private final MotDePasseService service;

    public MotDePasseController(MotDePasseService service) { this.service = service; }

    @PostMapping("/changer")
    public ResponseEntity<Void> changer(@Valid @RequestBody ChangePasswordRequest req) {
        service.changer(req);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reinitialiser")
    public ResponseEntity<Void> reinitialiser(@RequestParam String nomUtilisateur) {
        service.reinitialiser(nomUtilisateur);
        return ResponseEntity.noContent().build();
    }
}
