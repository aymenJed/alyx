package com.alyx.metadata.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ScreenNotFoundException extends RuntimeException {

    public ScreenNotFoundException(String screenCode) {
        super("Écran introuvable ou inactif : [%s]".formatted(screenCode));
    }
}
