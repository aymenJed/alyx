package com.alyx.profilorganisationnel.dto;

import com.alyx.profilorganisationnel.entity.ProfilOrganisationnel;

public record ProfilOrgDto(
    Long   profilId,
    String nomProfil,
    String organizationUnit,
    String mainEntity,
    String description,
    Boolean isActive
) {
    public static ProfilOrgDto from(ProfilOrganisationnel p) {
        return new ProfilOrgDto(
            p.getProfilId(),
            p.getNomProfil(),
            p.getOrganizationUnit(),
            p.getMainEntity(),
            p.getDescription(),
            p.getIsActive()
        );
    }
}
