package com.alyx.optionregionale.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "app_option_regionale")
@AttributeOverride(name = "id",        column = @Column(name = "option_id"))
@AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "created_by", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "updated_by", length = 50))
public class OptionRegionale extends BaseEntity {

    @Column(name = "nom", nullable = false, length = 100)
    private String nom;

    @Column(name = "langue", nullable = false, length = 10)
    private String langue = "fr";

    @Column(name = "format_nombre", length = 50)
    private String formatNombre = "#,##0.##";

    @Column(name = "format_date", length = 30)
    private String formatDate = "dd/MM/yyyy";

    @Column(name = "symbole_decimal", length = 1)
    private String symboleDecimal = ",";

    @Column(name = "symbole_groupement", length = 1)
    private String symboleGroupement = ".";

    @Column(name = "format_horaire", length = 20)
    private String formatHoraire = "HH:mm:ss";

    @Column(name = "timezone", length = 50)
    private String timezone = "Africa/Tunis";

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public Long   getOptionId()                              { return getId(); }
    public String getNom()                                   { return nom; }
    public void   setNom(String nom)                         { this.nom = nom; }
    public String getLangue()                                { return langue; }
    public void   setLangue(String langue)                   { this.langue = langue; }
    public String getFormatNombre()                          { return formatNombre; }
    public void   setFormatNombre(String formatNombre)       { this.formatNombre = formatNombre; }
    public String getFormatDate()                            { return formatDate; }
    public void   setFormatDate(String formatDate)           { this.formatDate = formatDate; }
    public String getSymboleDecimal()                        { return symboleDecimal; }
    public void   setSymboleDecimal(String symboleDecimal)   { this.symboleDecimal = symboleDecimal; }
    public String getSymboleGroupement()                     { return symboleGroupement; }
    public void   setSymboleGroupement(String s)             { this.symboleGroupement = s; }
    public String getFormatHoraire()                         { return formatHoraire; }
    public void   setFormatHoraire(String formatHoraire)     { this.formatHoraire = formatHoraire; }
    public String getTimezone()                              { return timezone; }
    public void   setTimezone(String timezone)               { this.timezone = timezone; }
    public Boolean getIsActive()                             { return isActive; }
    public void   setIsActive(Boolean isActive)              { this.isActive = isActive; }
}
