package com.alyx.profilgroupe.dto;

import com.alyx.profilgroupe.entity.ProfilGroupe;

public record ProfilGroupeDto(
    Long   pgId,
    String nomProfil,
    Long   groupeId,
    String groupeNom,
    Long   profilOrgId,
    String profilOrgNom,
    Long   optionRegionaleId,
    String optionRegionaleNom,
    String conditionConnexion,
    String habilitation,
    Boolean isActive
) {
    public static ProfilGroupeDto from(ProfilGroupe p) {
        return new ProfilGroupeDto(
            p.getPgId(),
            p.getNomProfil(),
            p.getGroupe()          != null ? p.getGroupe().getGroupId()              : null,
            p.getGroupe()          != null ? p.getGroupe().getGroupName()             : null,
            p.getProfilOrg()       != null ? p.getProfilOrg().getProfilId()           : null,
            p.getProfilOrg()       != null ? p.getProfilOrg().getNomProfil()          : null,
            p.getOptionRegionale() != null ? p.getOptionRegionale().getOptionId()     : null,
            p.getOptionRegionale() != null ? p.getOptionRegionale().getNom()          : null,
            p.getConditionConnexion(),
            p.getHabilitation(),
            p.getIsActive()
        );
    }
}
