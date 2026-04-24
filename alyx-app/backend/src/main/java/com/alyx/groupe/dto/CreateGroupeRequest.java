package com.alyx.groupe.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateGroupeRequest(
    @NotBlank String groupCode,
    @NotBlank String groupName,
    Long   parentGroupId,
    String description,
    Boolean isActive
) {}
