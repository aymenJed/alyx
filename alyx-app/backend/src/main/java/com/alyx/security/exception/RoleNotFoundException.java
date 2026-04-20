package com.alyx.security.exception;

public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException(Long id) {
        super("Role not found with id: " + id);
    }

    public RoleNotFoundException(String roleName) {
        super("Role not found: " + roleName);
    }
}
