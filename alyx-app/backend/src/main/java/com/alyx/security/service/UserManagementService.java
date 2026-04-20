package com.alyx.security.service;

import com.alyx.auth.entity.AppUser;
import com.alyx.auth.repository.AppUserRepository;
import com.alyx.core.common.PagedResponse;
import com.alyx.security.dto.CreateUserRequest;
import com.alyx.security.dto.UpdateUserRequest;
import com.alyx.security.dto.UserDto;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserManagementService {

    private final AppUserRepository userRepo;
    private final PasswordEncoder   encoder;

    public UserManagementService(AppUserRepository userRepo, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder  = encoder;
    }

    // ── READ ────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public PagedResponse<UserDto> findAll(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("fullName").ascending());
        var p = (search == null || search.isBlank())
            ? userRepo.findAll(pageable)
            : userRepo.search(search, pageable);
        return PagedResponse.of(p.map(UserDto::from));
    }

    @Transactional(readOnly = true)
    public UserDto findById(Long id) {
        return userRepo.findById(id)
            .map(UserDto::from)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + id));
    }

    // ── CREATE ──────────────────────────────────────────────────

    public UserDto create(CreateUserRequest req) {
        if (userRepo.existsByUsername(req.username())) {
            throw new RuntimeException("Le nom d'utilisateur '" + req.username() + "' est déjà utilisé");
        }
        AppUser user = new AppUser();
        user.setUsername(req.username());
        user.setPassword(encoder.encode(req.password()));
        user.setFullName(req.fullName());
        user.setEmail(req.email());
        user.setRoles(normalizeRoles(req.roles()));
        user.setIsActive(req.isActive() != null ? req.isActive() : "Y");
        return UserDto.from(userRepo.save(user));
    }

    // ── UPDATE ──────────────────────────────────────────────────

    public UserDto update(Long id, UpdateUserRequest req) {
        AppUser user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + id));
        user.setFullName(req.fullName());
        user.setEmail(req.email());
        user.setRoles(normalizeRoles(req.roles()));
        if (req.isActive() != null) user.setIsActive(req.isActive());
        if (req.newPassword() != null && !req.newPassword().isBlank()) {
            user.setPassword(encoder.encode(req.newPassword()));
        }
        return UserDto.from(userRepo.save(user));
    }

    // ── TOGGLE ──────────────────────────────────────────────────

    public void toggleActive(Long id) {
        AppUser user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + id));
        user.setIsActive("Y".equals(user.getIsActive()) ? "N" : "Y");
        userRepo.save(user);
    }

    // ── DELETE ──────────────────────────────────────────────────

    public void delete(Long id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("Utilisateur introuvable : " + id);
        }
        userRepo.deleteById(id);
    }

    // ── Helpers ─────────────────────────────────────────────────

    /** Normalise les rôles : ajoute ROLE_ si absent, dédoublonne, trim. */
    private String normalizeRoles(String raw) {
        if (raw == null || raw.isBlank()) return "ROLE_USER";
        return java.util.Arrays.stream(raw.split("[,;\\s]+"))
            .map(String::trim)
            .filter(r -> !r.isBlank())
            .map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r)
            .distinct()
            .reduce((a, b) -> a + "," + b)
            .orElse("ROLE_USER");
    }
}
