package com.alyx.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
    @NotBlank @Size(max = 100) String fullName,
    @Email    @Size(max = 150) String email,
    @NotBlank                  String roles,
    String isActive,
    String newPassword   // optionnel — null = pas de changement de mot de passe
) {}
