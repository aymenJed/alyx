package com.alyx.auth.controller;

import com.alyx.auth.dto.AuthResponse;
import com.alyx.auth.dto.LoginRequest;
import com.alyx.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * POST /api/v1/auth/login
     * Body: { "username": "admin", "password": "admin123" }
     * Returns: { "token": "...", "username": "admin", "fullName": "...", "roles": [...] }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Identifiants incorrects"));
        }
    }

    /**
     * POST /api/v1/auth/logout — côté client uniquement (suppression du token local).
     * Endpoint présent pour cohérence API (token stateless, pas de session serveur).
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}
