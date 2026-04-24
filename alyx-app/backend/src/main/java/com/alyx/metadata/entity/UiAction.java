package com.alyx.metadata.entity;

import com.alyx.common.entity.BaseEntity;
import jakarta.persistence.*;

/**
 * Action exécutable associée à un écran — équivalent de ActionElement / Action / ActionGroup
 * du modèle de référence PresentationViewModel.
 *
 * actionType : MAIN (barre d'actions principale) | GRID (action de ligne) | SUBVIEW
 * renderer   : BUTTON | LINK | IMAGE
 */
@Entity
@Table(name = "UI_ACTION")
@AttributeOverride(name = "id",        column = @Column(name = "ACTION_ID"))
@AttributeOverride(name = "createdAt", column = @Column(name = "CREATED_AT", updatable = false, nullable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "UPDATED_AT", nullable = false))
@AttributeOverride(name = "createdBy", column = @Column(name = "CREATED_BY", updatable = false, length = 50))
@AttributeOverride(name = "updatedBy", column = @Column(name = "UPDATED_BY", length = 50))
public class UiAction extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCREEN_ID", nullable = false)
    private UiScreen screen;

    @Column(name = "CODE", nullable = false, length = 50)
    private String code;

    @Column(name = "LABEL", nullable = false, length = 200)
    private String label;

    @Column(name = "ICON", length = 100)
    private String icon;

    /** MAIN | GRID | SUBVIEW */
    @Enumerated(EnumType.STRING)
    @Column(name = "ACTION_TYPE", nullable = false, length = 20)
    private ActionType actionType = ActionType.MAIN;

    /** BUTTON | LINK | IMAGE */
    @Column(name = "RENDERER", length = 10)
    private String renderer = "BUTTON";

    /** Méthode HTTP déclenchée sur l'API (GET | POST | PUT | DELETE) */
    @Column(name = "HTTP_METHOD", length = 10)
    private String httpMethod;

    /** URL de l'endpoint appelé (relative à apiBaseUrl) */
    @Column(name = "ENDPOINT", length = 500)
    private String endpoint;

    @Column(name = "IS_ENABLED", nullable = false)
    private Boolean isEnabled = true;

    @Column(name = "REQUIRE_VALIDATION", nullable = false)
    private Boolean requireValidation = false;

    /** L'action nécessite une sélection en grille avant d'être cliquable */
    @Column(name = "REQUIRE_SELECTION", nullable = false)
    private Boolean requireSelection = false;

    /** Afficher une boite de confirmation avant exécution */
    @Column(name = "WITH_CONFIRMATION", nullable = false)
    private Boolean withConfirmation = false;

    @Column(name = "CONFIRMATION_MSG", length = 500)
    private String confirmationMsg;

    /** Fermer la vue après exécution */
    @Column(name = "END_ACTION", nullable = false)
    private Boolean endAction = false;

    /** Expression de condition d'activation (ex: "data.status === 'DRAFT'") */
    @Column(name = "CONDITION_EXP", length = 500)
    private String conditionExp;

    /** Couleur CSS du bouton */
    @Column(name = "COLOR", length = 30)
    private String color;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    /** Code de l'action groupe parent (ActionGroup) */
    @Column(name = "GROUP_CODE", length = 50)
    private String groupCode;

    // Raccourci clavier (KeyboardShortcut)
    @Column(name = "KB_CTRL",  nullable = false) private Boolean kbCtrl  = false;
    @Column(name = "KB_ALT",   nullable = false) private Boolean kbAlt   = false;
    @Column(name = "KB_SHIFT", nullable = false) private Boolean kbShift = false;
    @Column(name = "KB_KEY",   length = 10)      private String  kbKey;

    // ── Getters ───────────────────────────────────────────────────────────────

    public Long getActionId()             { return getId(); }
    public UiScreen getScreen()           { return screen; }
    public String getCode()               { return code; }
    public String getLabel()              { return label; }
    public String getIcon()               { return icon; }
    public ActionType getActionType()     { return actionType; }
    public String getRenderer()           { return renderer; }
    public String getHttpMethod()         { return httpMethod; }
    public String getEndpoint()           { return endpoint; }
    public Boolean getIsEnabled()         { return isEnabled; }
    public Boolean getRequireValidation() { return requireValidation; }
    public Boolean getRequireSelection()  { return requireSelection; }
    public Boolean getWithConfirmation()  { return withConfirmation; }
    public String getConfirmationMsg()    { return confirmationMsg; }
    public Boolean getEndAction()         { return endAction; }
    public String getConditionExp()       { return conditionExp; }
    public String getColor()              { return color; }
    public Integer getDisplayOrder()      { return displayOrder; }
    public String getGroupCode()          { return groupCode; }
    public Boolean getKbCtrl()            { return kbCtrl; }
    public Boolean getKbAlt()             { return kbAlt; }
    public Boolean getKbShift()           { return kbShift; }
    public String getKbKey()              { return kbKey; }

    // ── Setters ───────────────────────────────────────────────────────────────

    public void setScreen(UiScreen screen)              { this.screen = screen; }
    public void setCode(String code)                    { this.code = code; }
    public void setLabel(String label)                  { this.label = label; }
    public void setIcon(String icon)                    { this.icon = icon; }
    public void setActionType(ActionType actionType)    { this.actionType = actionType; }
    public void setRenderer(String renderer)            { this.renderer = renderer; }
    public void setHttpMethod(String httpMethod)        { this.httpMethod = httpMethod; }
    public void setEndpoint(String endpoint)            { this.endpoint = endpoint; }
    public void setIsEnabled(Boolean isEnabled)         { this.isEnabled = isEnabled; }
    public void setRequireValidation(Boolean v)         { this.requireValidation = v; }
    public void setRequireSelection(Boolean v)          { this.requireSelection = v; }
    public void setWithConfirmation(Boolean v)          { this.withConfirmation = v; }
    public void setConfirmationMsg(String v)            { this.confirmationMsg = v; }
    public void setEndAction(Boolean endAction)         { this.endAction = endAction; }
    public void setConditionExp(String conditionExp)    { this.conditionExp = conditionExp; }
    public void setColor(String color)                  { this.color = color; }
    public void setDisplayOrder(Integer displayOrder)   { this.displayOrder = displayOrder; }
    public void setGroupCode(String groupCode)          { this.groupCode = groupCode; }
    public void setKbCtrl(Boolean kbCtrl)               { this.kbCtrl = kbCtrl; }
    public void setKbAlt(Boolean kbAlt)                 { this.kbAlt = kbAlt; }
    public void setKbShift(Boolean kbShift)             { this.kbShift = kbShift; }
    public void setKbKey(String kbKey)                  { this.kbKey = kbKey; }
}
