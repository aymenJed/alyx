package com.alyx.auth.dto;

import java.util.List;

public record AuthResponse(
        String token,
        String username,
        String fullName,
        List<String> roles
) {}
