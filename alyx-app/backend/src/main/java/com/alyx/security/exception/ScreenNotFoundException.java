package com.alyx.security.exception;

public class ScreenNotFoundException extends RuntimeException {
    public ScreenNotFoundException(String screenCode) {
        super("Screen not found: " + screenCode);
    }
}
