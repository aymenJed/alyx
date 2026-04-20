package com.alyx;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeneratePasswords {
    @Test
    void generate() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        System.out.println("admin123 => " + encoder.encode("admin123"));
        System.out.println("user123  => " + encoder.encode("user123"));
    }
}
