package com.alyx.security.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

/**
 * Requête de création pour {@link Investor}.
 * Généré automatiquement — ne pas modifier manuellement.
 */
public record CreateInvestorRequest(
    @NotBlank String investorCode,
    @NotBlank String investorType,
    @NotBlank String lastName,
    String firstName,
    String companyName,
    LocalDate birthDate,
    String birthPlace,
    String nationality,
    String idType,
    String idNumber,
    String address,
    String postalCode,
    String city,
    String country,
    String phone,
    String fax,
    String email,
    String occupation,
    String employer,
    String notes,
    @NotBlank String status,
    @NotBlank String isActive
) {}
