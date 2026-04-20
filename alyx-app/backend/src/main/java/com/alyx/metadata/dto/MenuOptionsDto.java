package com.alyx.metadata.dto;

import java.util.List;

public record MenuOptionsDto(
    List<MenuOptionDto> availableParents,
    List<MenuOptionDto> availableScreens,
    List<MenuOptionDto> availableRoles
) {}
