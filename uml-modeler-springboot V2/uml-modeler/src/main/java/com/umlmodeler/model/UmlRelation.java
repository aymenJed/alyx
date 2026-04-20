package com.umlmodeler.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UmlRelation {
    private String id;
    private String sourceId;
    private String targetId;
    private RelationType type;
    private String label = "";

    // Cardinalités UML standard
    private Multiplicity sourceMultiplicity = Multiplicity.ONE;
    private Multiplicity targetMultiplicity = Multiplicity.ONE;

    /**
     * Le côté "propriétaire" (owner) de la relation.
     * SOURCE = la classe source détient la FK / @JoinColumn
     * TARGET = la classe cible détient la FK / @JoinColumn
     * Utilisé pour générer le côté owning dans JPA (mappedBy vs @JoinColumn).
     */
    private OwnerSide ownerSide = OwnerSide.SOURCE;

    // ─── Enums ────────────────────────────────────────────────────────────────

    public enum RelationType {
        INHERITANCE("Héritage"),
        COMPOSITION("Composition"),
        AGGREGATION("Agrégation"),
        ASSOCIATION("Association"),
        DEPENDENCY("Dépendance"),
        REALIZATION("Réalisation");

        private final String displayName;
        RelationType(String displayName) { this.displayName = displayName; }
        public String getDisplayName() { return displayName; }
    }

    public enum Multiplicity {
        ZERO_ONE("0..1"),
        ONE("1"),
        ONE_ONE("1..1"),
        ZERO_MANY("0..*"),
        ONE_MANY("1..*"),
        MANY_MANY("*..*");

        private final String label;
        Multiplicity(String label) { this.label = label; }
        public String getLabel() { return label; }

        /** Renvoie true si cette cardinalité représente "plusieurs" entités (collection). */
        public boolean isMany() {
            return this == ZERO_MANY || this == ONE_MANY || this == MANY_MANY;
        }

        /** Renvoie true si la relation est obligatoire (min = 1). */
        public boolean isRequired() {
            return this == ONE || this == ONE_ONE || this == ONE_MANY;
        }

        public static Multiplicity fromLabel(String lbl) {
            for (Multiplicity m : values()) {
                if (m.label.equals(lbl)) return m;
            }
            return ONE;
        }

        @Override public String toString() { return label; }
    }

    public enum OwnerSide {
        SOURCE("Source (→)"),
        TARGET("Cible (←)");

        private final String display;
        OwnerSide(String display) { this.display = display; }
        public String getDisplay() { return display; }
    }

    // ─── Constructeurs ────────────────────────────────────────────────────────

    public UmlRelation() {
        this.id = UUID.randomUUID().toString();
    }

    public UmlRelation(String sourceId, String targetId, RelationType type) {
        this.id = UUID.randomUUID().toString();
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.type = type;
        applyDefaultMultiplicities(type);
    }

    /** Applique les cardinalités par défaut selon la sémantique UML du type de relation. */
    private void applyDefaultMultiplicities(RelationType type) {
        switch (type) {
            case INHERITANCE, REALIZATION -> {
                sourceMultiplicity = Multiplicity.ONE;
                targetMultiplicity = Multiplicity.ONE;
            }
            case COMPOSITION -> {
                // Le tout (source) contient plusieurs parties (target)
                sourceMultiplicity = Multiplicity.ONE;
                targetMultiplicity = Multiplicity.ONE_MANY;
                ownerSide = OwnerSide.TARGET; // la partie porte la FK vers le tout
            }
            case AGGREGATION -> {
                // Agrégation faible : plusieurs ↔ plusieurs par défaut
                sourceMultiplicity = Multiplicity.ZERO_MANY;
                targetMultiplicity = Multiplicity.ZERO_MANY;
                ownerSide = OwnerSide.SOURCE;
            }
            case ASSOCIATION -> {
                sourceMultiplicity = Multiplicity.ONE;
                targetMultiplicity = Multiplicity.ZERO_MANY;
                ownerSide = OwnerSide.TARGET;
            }
            case DEPENDENCY -> {
                sourceMultiplicity = Multiplicity.ONE;
                targetMultiplicity = Multiplicity.ONE;
            }
        }
    }

    // ─── Helpers sémantiques utilisés par le générateur JPA ──────────────────

    /**
     * Détermine la nature JPA de la relation du point de vue d'une classe donnée.
     */
    public JpaRelationship getJpaRelationship(String forClassId) {
        boolean isSource = sourceId.equals(forClassId);
        boolean srcIsMany = sourceMultiplicity.isMany();
        boolean tgtIsMany = targetMultiplicity.isMany();

        if (type == RelationType.INHERITANCE || type == RelationType.REALIZATION) {
            return JpaRelationship.NONE;
        }

        if (type == RelationType.COMPOSITION || type == RelationType.AGGREGATION) {
            if (srcIsMany && tgtIsMany) return isSource ? JpaRelationship.MANY_TO_MANY_OWNER
                                                        : JpaRelationship.MANY_TO_MANY_INVERSE;
            if (!srcIsMany && tgtIsMany) return isSource ? JpaRelationship.ONE_TO_MANY
                                                         : JpaRelationship.MANY_TO_ONE;
            if (srcIsMany && !tgtIsMany) return isSource ? JpaRelationship.MANY_TO_ONE
                                                         : JpaRelationship.ONE_TO_MANY;
            return isSource ? JpaRelationship.ONE_TO_ONE_OWNER : JpaRelationship.ONE_TO_ONE_INVERSE;
        }

        if (type == RelationType.ASSOCIATION) {
            if (!srcIsMany && tgtIsMany) return isSource ? JpaRelationship.ONE_TO_MANY
                                                         : JpaRelationship.MANY_TO_ONE;
            if (srcIsMany && !tgtIsMany) return isSource ? JpaRelationship.MANY_TO_ONE
                                                         : JpaRelationship.ONE_TO_MANY;
            if (srcIsMany && tgtIsMany) return isSource ? JpaRelationship.MANY_TO_MANY_OWNER
                                                        : JpaRelationship.MANY_TO_MANY_INVERSE;
            return isSource ? JpaRelationship.ONE_TO_ONE_OWNER : JpaRelationship.ONE_TO_ONE_INVERSE;
        }

        return JpaRelationship.NONE;
    }

    /** Retourne true si cette classe est le côté propriétaire (owner) JPA de la relation. */
    public boolean isOwner(String classId) {
        return (ownerSide == OwnerSide.SOURCE && sourceId.equals(classId))
            || (ownerSide == OwnerSide.TARGET && targetId.equals(classId));
    }

    /** Retourne l'ID de la classe opposée. */
    public String getOtherClassId(String classId) {
        return sourceId.equals(classId) ? targetId : sourceId;
    }

    public enum JpaRelationship {
        NONE,
        ONE_TO_ONE_OWNER,
        ONE_TO_ONE_INVERSE,
        ONE_TO_MANY,
        MANY_TO_ONE,
        MANY_TO_MANY_OWNER,
        MANY_TO_MANY_INVERSE
    }

    // ─── Getters / Setters ────────────────────────────────────────────────────

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSourceId() { return sourceId; }
    public void setSourceId(String sourceId) { this.sourceId = sourceId; }

    public String getTargetId() { return targetId; }
    public void setTargetId(String targetId) { this.targetId = targetId; }

    public RelationType getType() { return type; }
    public void setType(RelationType type) { this.type = type; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public Multiplicity getSourceMultiplicity() { return sourceMultiplicity; }
    public void setSourceMultiplicity(Multiplicity sourceMultiplicity) { this.sourceMultiplicity = sourceMultiplicity; }

    public Multiplicity getTargetMultiplicity() { return targetMultiplicity; }
    public void setTargetMultiplicity(Multiplicity targetMultiplicity) { this.targetMultiplicity = targetMultiplicity; }

    // Jackson compat: accept String multiplicity from old JSON
    public void setSourceMultiplicityStr(String s) { this.sourceMultiplicity = Multiplicity.fromLabel(s); }
    public void setTargetMultiplicityStr(String s) { this.targetMultiplicity = Multiplicity.fromLabel(s); }

    public OwnerSide getOwnerSide() { return ownerSide; }
    public void setOwnerSide(OwnerSide ownerSide) { this.ownerSide = ownerSide; }
}
