package com.alyx.profilorganisationnel.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "app_profil_organisationnel")
@AttributeOverride(name = "id",        column = @Column(name = "profil_id"))
@AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "created_by", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "updated_by", length = 50))
public class ProfilOrganisationnel extends BaseEntity {

    @Column(name = "nom_profil", nullable = false, length = 100)
    private String nomProfil;

    @Column(name = "organization_unit", length = 100)
    private String organizationUnit;

    @Column(name = "main_entity", length = 100)
    private String mainEntity;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public Long   getProfilId()                           { return getId(); }
    public String getNomProfil()                          { return nomProfil; }
    public void   setNomProfil(String nomProfil)          { this.nomProfil = nomProfil; }
    public String getOrganizationUnit()                   { return organizationUnit; }
    public void   setOrganizationUnit(String u)           { this.organizationUnit = u; }
    public String getMainEntity()                         { return mainEntity; }
    public void   setMainEntity(String mainEntity)        { this.mainEntity = mainEntity; }
    public String getDescription()                        { return description; }
    public void   setDescription(String description)      { this.description = description; }
    public Boolean getIsActive()                          { return isActive; }
    public void   setIsActive(Boolean isActive)           { this.isActive = isActive; }
}
