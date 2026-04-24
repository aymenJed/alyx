package com.alyx.profilgroupe.entity;

import com.alyx.common.entity.BaseEntity;
import com.alyx.groupe.entity.AppGroup;
import com.alyx.optionregionale.entity.OptionRegionale;
import com.alyx.profilorganisationnel.entity.ProfilOrganisationnel;
import jakarta.persistence.*;

@Entity
@Table(name = "app_profil_groupe")
@AttributeOverride(name = "id",        column = @Column(name = "pg_id"))
@AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "created_by", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "updated_by", length = 50))
public class ProfilGroupe extends BaseEntity {

    @Column(name = "nom_profil", nullable = false, length = 100)
    private String nomProfil;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private AppGroup groupe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profil_org_id")
    private ProfilOrganisationnel profilOrg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_regionale_id")
    private OptionRegionale optionRegionale;

    @Column(name = "condition_connexion", length = 200)
    private String conditionConnexion;

    @Column(name = "habilitation", length = 100)
    private String habilitation;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public Long                  getPgId()                            { return getId(); }
    public String                getNomProfil()                       { return nomProfil; }
    public void                  setNomProfil(String nomProfil)       { this.nomProfil = nomProfil; }
    public AppGroup              getGroupe()                          { return groupe; }
    public void                  setGroupe(AppGroup groupe)           { this.groupe = groupe; }
    public ProfilOrganisationnel getProfilOrg()                       { return profilOrg; }
    public void                  setProfilOrg(ProfilOrganisationnel p){ this.profilOrg = p; }
    public OptionRegionale       getOptionRegionale()                 { return optionRegionale; }
    public void                  setOptionRegionale(OptionRegionale o){ this.optionRegionale = o; }
    public String                getConditionConnexion()              { return conditionConnexion; }
    public void                  setConditionConnexion(String c)      { this.conditionConnexion = c; }
    public String                getHabilitation()                    { return habilitation; }
    public void                  setHabilitation(String h)            { this.habilitation = h; }
    public Boolean               getIsActive()                        { return isActive; }
    public void                  setIsActive(Boolean isActive)        { this.isActive = isActive; }
}
