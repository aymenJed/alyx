package com.alyx.metadata.dto;

public record MenuOptionDto(
    Long id,
    String code,
    String label,
    String type
) {}
