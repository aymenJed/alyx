package com.alyx.security.exception;

public class DuplicateRoleException extends RuntimeException {
    public DuplicateRoleException(String roleName) {
        super("Role already exists: " + roleName);
    }
}
