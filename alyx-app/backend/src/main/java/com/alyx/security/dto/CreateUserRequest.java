package com.alyx.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
    @NotBlank @Size(min = 3, max = 50)  String username,
    @NotBlank @Size(min = 6, max = 100) String password,
    @NotBlank @Size(max = 100)          String fullName,
    @Email    @Size(max = 150)          String email,
    @NotBlank                           String roles,
    String isActive
) {}
