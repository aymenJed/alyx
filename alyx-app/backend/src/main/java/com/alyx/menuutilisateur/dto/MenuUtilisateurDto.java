package com.alyx.menuutilisateur.dto;

public record MenuUtilisateurDto(
    Long   userId,
    String login,
    Long   menuId,
    String menuCode,
    String menuLabel,
    String menuPath,
    String isEnabled
) {}
