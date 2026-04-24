package com.alyx.motdepasse.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
    @NotBlank String nomUtilisateur,
    @NotBlank @Size(min = 8) String nouveauMdp,
    @NotBlank String confirmerMdp
) {}
