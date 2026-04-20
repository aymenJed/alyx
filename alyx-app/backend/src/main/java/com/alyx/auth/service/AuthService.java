package com.alyx.auth.service;

import com.alyx.auth.dto.AuthResponse;
import com.alyx.auth.dto.LoginRequest;
import com.alyx.auth.entity.AppUser;
import com.alyx.auth.repository.AppUserRepository;
import com.alyx.auth.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final AuthenticationManager authManager;
    private final UserDetailsService    userDetailsService;
    private final AppUserRepository     userRepository;
    private final JwtUtil               jwtUtil;

    public AuthService(AuthenticationManager authManager,
                       UserDetailsService userDetailsService,
                       AppUserRepository userRepository,
                       JwtUtil jwtUtil) {
        this.authManager       = authManager;
        this.userDetailsService = userDetailsService;
        this.userRepository    = userRepository;
        this.jwtUtil           = jwtUtil;
    }

    public AuthResponse login(LoginRequest request) {
        // 1. Authenticate (throws BadCredentialsException if wrong)
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        // 2. Load full user for extra claims
        UserDetails details = userDetailsService.loadUserByUsername(request.username());
        AppUser user = userRepository.findByUsernameAndIsActive(request.username(), "Y")
                .orElseThrow();

        // 3. Build token with roles claim
        String token = jwtUtil.generateToken(details, Map.of("roles", user.getRoleList()));

        return new AuthResponse(token, user.getUsername(), user.getFullName(), user.getRoleList());
    }
}
