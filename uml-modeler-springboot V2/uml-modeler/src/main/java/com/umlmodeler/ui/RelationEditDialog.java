package com.umlmodeler.ui;

import com.umlmodeler.model.UmlClass;
import com.umlmodeler.model.UmlRelation;
import com.umlmodeler.model.UmlRelation.Multiplicity;
import com.umlmodeler.model.UmlRelation.OwnerSide;
import com.umlmodeler.model.UmlRelation.RelationType;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.shape.*;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Modality;

public class RelationEditDialog extends Dialog<UmlRelation> {

    private final UmlRelation relation;
    private final UmlClass sourceClass;
    private final UmlClass targetClass;

    private ComboBox<Multiplicity> srcMultiCombo;
    private ComboBox<Multiplicity> tgtMultiCombo;
    private ComboBox<OwnerSide> ownerCombo;
    private TextField labelField;
    private Label jpaPreviewLabel;
    private Label semanticHintLabel;

    public RelationEditDialog(UmlRelation relation, UmlClass sourceClass, UmlClass targetClass) {
        this.relation = relation;
        this.sourceClass = sourceClass;
        this.targetClass = targetClass;

        initModality(Modality.APPLICATION_MODAL);
        setTitle("Configurer la relation");
        setResizable(false);

        getDialogPane().setContent(buildContent());
        getDialogPane().getButtonTypes().addAll(ButtonType.OK, ButtonType.CANCEL);
        getDialogPane().setPrefWidth(560);
        styleDialog();

        setResultConverter(btn -> {
            if (btn == ButtonType.OK) applyChanges();
            return btn == ButtonType.OK ? relation : null;
        });
    }

    private VBox buildContent() {
        VBox root = new VBox(14);
        root.setPadding(new Insets(20));
        root.setStyle("-fx-background-color: #0d1117;");

        // ── En-tête type de relation ──
        HBox header = buildHeader();

        // ── Schéma visuel source → target ──
        HBox schema = buildSchemaRow();

        // ── Sélecteurs de cardinalités ──
        HBox cardinalityRow = buildCardinalityRow();

        // ── Propriétaire (Owner) ──
        VBox ownerBox = buildOwnerBox();

        // ── Label de relation ──
        VBox labelBox = buildLabelBox();

        // ── Aperçu JPA ──
        VBox jpaPreview = buildJpaPreview();

        // Mise à jour réactive
        srcMultiCombo.setOnAction(e -> refreshPreview());
        tgtMultiCombo.setOnAction(e -> refreshPreview());
        ownerCombo.setOnAction(e -> refreshPreview());
        refreshPreview();

        root.getChildren().addAll(header, new Separator(), schema, cardinalityRow,
                new Separator(), ownerBox, labelBox, new Separator(), jpaPreview);
        return root;
    }

    private HBox buildHeader() {
        HBox hb = new HBox(12);
        hb.setAlignment(Pos.CENTER_LEFT);

        String typeColor = switch (relation.getType()) {
            case INHERITANCE -> "#d2a8ff";
            case COMPOSITION -> "#56d364";
            case AGGREGATION -> "#58a6ff";
            case ASSOCIATION -> "#f0883e";
            case DEPENDENCY -> "#ffa657";
            case REALIZATION -> "#ff7b72";
        };

        String typeIcon = switch (relation.getType()) {
            case INHERITANCE -> "↑";
            case COMPOSITION -> "◆";
            case AGGREGATION -> "◇";
            case ASSOCIATION -> "→";
            case DEPENDENCY -> "⤑";
            case REALIZATION -> "⇢";
        };

        Label icon = new Label(typeIcon);
        icon.setFont(Font.font("Consolas", FontWeight.BOLD, 22));
        icon.setTextFill(Color.web(typeColor));

        VBox info = new VBox(2);
        Label typeLbl = new Label(relation.getType().getDisplayName());
        typeLbl.setFont(Font.font("Consolas", FontWeight.BOLD, 15));
        typeLbl.setTextFill(Color.web(typeColor));
        Label subLbl = new Label(sourceClass.getName() + "  →  " + targetClass.getName());
        subLbl.setFont(Font.font("Consolas", 11));
        subLbl.setTextFill(Color.web("#8b949e"));
        info.getChildren().addAll(typeLbl, subLbl);

        hb.getChildren().addAll(icon, info);
        return hb;
    }

    private HBox buildSchemaRow() {
        // Visual diagram: [Source Box] ──── [Target Box]
        HBox row = new HBox(0);
        row.setAlignment(Pos.CENTER);
        row.setStyle("-fx-background-color: #161b22; -fx-background-radius: 6; -fx-padding: 16 20;");

        Label srcLbl = classBox(sourceClass.getName(), "#1f6feb");
        Label connector = new Label("────────────────────");
        connector.setFont(Font.font("Consolas", 11));
        connector.setTextFill(Color.web("#30363d"));
        Label tgtLbl = classBox(targetClass.getName(), "#1a7f37");

        row.getChildren().addAll(srcLbl, connector, tgtLbl);
        return row;
    }

    private HBox buildCardinalityRow() {
        HBox row = new HBox(20);
        row.setAlignment(Pos.CENTER);

        // Source multiplicity
        VBox srcBox = new VBox(6);
        srcBox.setAlignment(Pos.CENTER);
        Label srcLbl = miniLabel("Côté  " + sourceClass.getName());
        srcMultiCombo = multiCombo(relation.getSourceMultiplicity());
        srcBox.getChildren().addAll(srcLbl, srcMultiCombo);

        Label arrow = new Label("⟷");
        arrow.setFont(Font.font("Consolas", FontWeight.BOLD, 18));
        arrow.setTextFill(Color.web("#58a6ff"));

        // Target multiplicity
        VBox tgtBox = new VBox(6);
        tgtBox.setAlignment(Pos.CENTER);
        Label tgtLbl = miniLabel("Côté  " + targetClass.getName());
        tgtMultiCombo = multiCombo(relation.getTargetMultiplicity());
        tgtBox.getChildren().addAll(tgtLbl, tgtMultiCombo);

        row.getChildren().addAll(srcBox, arrow, tgtBox);

        // Semantic hint
        semanticHintLabel = new Label();
        semanticHintLabel.setFont(Font.font("Consolas", 10));
        semanticHintLabel.setTextFill(Color.web("#8b949e"));
        semanticHintLabel.setWrapText(true);

        VBox wrapper = new VBox(10, row, semanticHintLabel);
        wrapper.setAlignment(Pos.CENTER);
        HBox outer = new HBox(wrapper);
        outer.setAlignment(Pos.CENTER);
        return outer;
    }

    private VBox buildOwnerBox() {
        VBox box = new VBox(8);

        Label title = sectionLabel("⚓  Côté Propriétaire (Owner JPA)");

        // Disable owner for inheritance/realization/dependency
        boolean ownerEditable = relation.getType() != RelationType.INHERITANCE
                && relation.getType() != RelationType.REALIZATION
                && relation.getType() != RelationType.DEPENDENCY;

        HBox row = new HBox(12);
        row.setAlignment(Pos.CENTER_LEFT);

        ownerCombo = new ComboBox<>(FXCollections.observableArrayList(OwnerSide.values()));
        ownerCombo.setValue(relation.getOwnerSide());
        ownerCombo.setDisable(!ownerEditable);
        ownerCombo.setCellFactory(lv -> ownerCell());
        ownerCombo.setButtonCell(ownerCell());
        ownerCombo.setStyle(comboStyle());
        ownerCombo.setPrefWidth(200);

        Label hint = new Label(ownerEditable
                ? "Le propriétaire porte le @JoinColumn (FK en base)"
                : "Non applicable pour ce type de relation");
        hint.setFont(Font.font("Consolas", 10));
        hint.setTextFill(Color.web("#8b949e"));

        row.getChildren().addAll(ownerCombo, hint);
        box.getChildren().addAll(title, row);
        return box;
    }

    private VBox buildLabelBox() {
        VBox box = new VBox(6);
        Label title = sectionLabel("🏷  Label de la relation (optionnel)");
        labelField = new TextField(relation.getLabel());
        labelField.setStyle(fieldStyle());
        labelField.setPromptText("ex: contient, appartient à...");
        box.getChildren().addAll(title, labelField);
        return box;
    }

    private VBox buildJpaPreview() {
        VBox box = new VBox(8);
        Label title = sectionLabel("⚡  Aperçu de la génération JPA");

        jpaPreviewLabel = new Label();
        jpaPreviewLabel.setFont(Font.font("Consolas", 11));
        jpaPreviewLabel.setTextFill(Color.web("#56d364"));
        jpaPreviewLabel.setWrapText(true);
        jpaPreviewLabel.setStyle("-fx-background-color: #161b22; -fx-padding: 10; -fx-background-radius: 4;");
        jpaPreviewLabel.setMaxWidth(Double.MAX_VALUE);

        box.getChildren().addAll(title, jpaPreviewLabel);
        return box;
    }

    private void refreshPreview() {
        Multiplicity srcM = srcMultiCombo.getValue();
        Multiplicity tgtM = tgtMultiCombo.getValue();
        OwnerSide owner = ownerCombo.getValue();

        // Temporary apply to compute preview
        relation.setSourceMultiplicity(srcM);
        relation.setTargetMultiplicity(tgtM);
        relation.setOwnerSide(owner);

        String srcName = sourceClass.getName();
        String tgtName = targetClass.getName();

        String preview = buildJpaAnnotationPreview(srcName, tgtName, srcM, tgtM, owner, relation.getType());
        jpaPreviewLabel.setText(preview);

        String hint = buildSemanticHint(srcM, tgtM, relation.getType());
        semanticHintLabel.setText(hint);
    }

    private String buildJpaAnnotationPreview(String src, String tgt, Multiplicity srcM, Multiplicity tgtM,
                                              OwnerSide owner, RelationType type) {
        if (type == RelationType.INHERITANCE)
            return "// " + src + " extends " + tgt + "\n// Héritage JPA — pas d'annotation de relation";
        if (type == RelationType.DEPENDENCY)
            return "// Dépendance — pas d'annotation JPA générée";

        boolean srcMany = srcM.isMany();
        boolean tgtMany = tgtM.isMany();
        boolean srcRequired = srcM.isRequired();
        boolean tgtRequired = tgtM.isRequired();

        StringBuilder sb = new StringBuilder();
        sb.append("// Dans ").append(src).append(".java :\n");

        if (!srcMany && !tgtMany) {
            // 1..1 ou 0..1
            if (owner == OwnerSide.SOURCE) {
                sb.append("@OneToOne\n");
                sb.append("@JoinColumn(name = \"").append(tgt.toLowerCase()).append("_id\"");
                if (tgtRequired) sb.append(", nullable = false");
                sb.append(")\n");
                sb.append("private ").append(tgt).append(" ").append(tgt.toLowerCase()).append(";\n\n");
                sb.append("// Dans ").append(tgt).append(".java :\n");
                sb.append("@OneToOne(mappedBy = \"").append(tgt.toLowerCase()).append("\")\n");
                sb.append("private ").append(src).append(" ").append(src.toLowerCase()).append(";");
            } else {
                sb.append("@OneToOne(mappedBy = \"").append(src.toLowerCase()).append("\")\n");
                sb.append("private ").append(tgt).append(" ").append(tgt.toLowerCase()).append(";\n\n");
                sb.append("// Dans ").append(tgt).append(".java :\n");
                sb.append("@OneToOne\n");
                sb.append("@JoinColumn(name = \"").append(src.toLowerCase()).append("_id\"");
                if (srcRequired) sb.append(", nullable = false");
                sb.append(")\n");
                sb.append("private ").append(src).append(" ").append(src.toLowerCase()).append(";");
            }
        } else if (!srcMany && tgtMany) {
            // OneToMany / ManyToOne
            String cascade = type == RelationType.COMPOSITION
                    ? ", cascade = CascadeType.ALL, orphanRemoval = true" : "";
            sb.append("@OneToMany(mappedBy = \"").append(src.toLowerCase()).append("\"").append(cascade).append(")\n");
            sb.append("private List<").append(tgt).append("> ").append(tgt.toLowerCase()).append("s = new ArrayList<>();\n\n");
            sb.append("// Dans ").append(tgt).append(".java :\n");
            sb.append("@ManyToOne(fetch = FetchType.LAZY");
            if (srcRequired) sb.append(", optional = false");
            sb.append(")\n");
            sb.append("@JoinColumn(name = \"").append(src.toLowerCase()).append("_id\"");
            if (srcRequired) sb.append(", nullable = false");
            sb.append(")\n");
            sb.append("private ").append(src).append(" ").append(src.toLowerCase()).append(";");
        } else if (srcMany && !tgtMany) {
            // ManyToOne / OneToMany (inversé)
            String cascade = type == RelationType.COMPOSITION
                    ? ", cascade = CascadeType.ALL, orphanRemoval = true" : "";
            sb.append("@ManyToOne(fetch = FetchType.LAZY");
            if (tgtRequired) sb.append(", optional = false");
            sb.append(")\n");
            sb.append("@JoinColumn(name = \"").append(tgt.toLowerCase()).append("_id\"");
            if (tgtRequired) sb.append(", nullable = false");
            sb.append(")\n");
            sb.append("private ").append(tgt).append(" ").append(tgt.toLowerCase()).append(";\n\n");
            sb.append("// Dans ").append(tgt).append(".java :\n");
            sb.append("@OneToMany(mappedBy = \"").append(tgt.toLowerCase()).append("\"").append(cascade).append(")\n");
            sb.append("private List<").append(src).append("> ").append(src.toLowerCase()).append("s = new ArrayList<>();");
        } else {
            // ManyToMany
            if (owner == OwnerSide.SOURCE) {
                sb.append("@ManyToMany\n");
                sb.append("@JoinTable(name = \"").append(src.toLowerCase()).append("_").append(tgt.toLowerCase()).append("\",\n");
                sb.append("    joinColumns = @JoinColumn(name = \"").append(src.toLowerCase()).append("_id\"),\n");
                sb.append("    inverseJoinColumns = @JoinColumn(name = \"").append(tgt.toLowerCase()).append("_id\"))\n");
                sb.append("private List<").append(tgt).append("> ").append(tgt.toLowerCase()).append("s = new ArrayList<>();\n\n");
                sb.append("// Dans ").append(tgt).append(".java :\n");
                sb.append("@ManyToMany(mappedBy = \"").append(tgt.toLowerCase()).append("s\")\n");
                sb.append("private List<").append(src).append("> ").append(src.toLowerCase()).append("s = new ArrayList<>();");
            } else {
                sb.append("@ManyToMany(mappedBy = \"").append(src.toLowerCase()).append("s\")\n");
                sb.append("private List<").append(tgt).append("> ").append(tgt.toLowerCase()).append("s = new ArrayList<>();\n\n");
                sb.append("// Dans ").append(tgt).append(".java :\n");
                sb.append("@ManyToMany\n");
                sb.append("@JoinTable(name = \"").append(tgt.toLowerCase()).append("_").append(src.toLowerCase()).append("\",\n");
                sb.append("    joinColumns = @JoinColumn(name = \"").append(tgt.toLowerCase()).append("_id\"),\n");
                sb.append("    inverseJoinColumns = @JoinColumn(name = \"").append(src.toLowerCase()).append("_id\"))\n");
                sb.append("private List<").append(src).append("> ").append(src.toLowerCase()).append("s = new ArrayList<>();");
            }
        }

        return sb.toString();
    }

    private String buildSemanticHint(Multiplicity srcM, Multiplicity tgtM, RelationType type) {
        boolean srcMany = srcM.isMany();
        boolean tgtMany = tgtM.isMany();
        String srcN = sourceClass.getName();
        String tgtN = targetClass.getName();

        if (!srcMany && !tgtMany) return "💡 OneToOne — " + srcN + " est lié à exactement un " + tgtN;
        if (!srcMany && tgtMany) return "💡 OneToMany / ManyToOne — Un " + srcN + " peut avoir plusieurs " + tgtN;
        if (srcMany && !tgtMany) return "💡 ManyToOne / OneToMany — Plusieurs " + srcN + " pour un seul " + tgtN;
        return "💡 ManyToMany — Table de jointure générée entre " + srcN + " et " + tgtN;
    }

    private void applyChanges() {
        relation.setSourceMultiplicity(srcMultiCombo.getValue());
        relation.setTargetMultiplicity(tgtMultiCombo.getValue());
        relation.setOwnerSide(ownerCombo.getValue());
        relation.setLabel(labelField.getText().trim());
    }

    // ── Factory helpers ──────────────────────────────────────────────────────

    private ComboBox<Multiplicity> multiCombo(Multiplicity initial) {
        ComboBox<Multiplicity> cb = new ComboBox<>(FXCollections.observableArrayList(Multiplicity.values()));
        cb.setValue(initial);
        cb.setStyle(comboStyle());
        cb.setPrefWidth(120);
        cb.setCellFactory(lv -> new ListCell<>() {
            @Override protected void updateItem(Multiplicity m, boolean empty) {
                super.updateItem(m, empty);
                if (empty || m == null) { setText(null); return; }
                setText(m.getLabel());
                setFont(Font.font("Consolas", FontWeight.BOLD, 13));
                setTextFill(Color.web("#58a6ff"));
                setStyle("-fx-background-color: #21262d;");
            }
        });
        cb.setButtonCell(new ListCell<>() {
            @Override protected void updateItem(Multiplicity m, boolean empty) {
                super.updateItem(m, empty);
                if (empty || m == null) { setText(null); return; }
                setText(m.getLabel());
                setFont(Font.font("Consolas", FontWeight.BOLD, 13));
                setTextFill(Color.web("#58a6ff"));
            }
        });
        return cb;
    }

    private ListCell<OwnerSide> ownerCell() {
        return new ListCell<>() {
            @Override protected void updateItem(OwnerSide s, boolean empty) {
                super.updateItem(s, empty);
                if (empty || s == null) { setText(null); return; }
                setText(s.getDisplay());
                setFont(Font.font("Consolas", 12));
                setTextFill(Color.web("#f0883e"));
                setStyle("-fx-background-color: #21262d;");
            }
        };
    }

    private Label classBox(String name, String color) {
        Label lbl = new Label(" " + name + " ");
        lbl.setFont(Font.font("Consolas", FontWeight.BOLD, 12));
        lbl.setTextFill(Color.web(color));
        lbl.setStyle("-fx-background-color: #21262d; -fx-border-color: " + color + "; " +
                     "-fx-border-radius: 4; -fx-background-radius: 4; -fx-padding: 5 10;");
        return lbl;
    }

    private Label sectionLabel(String text) {
        Label lbl = new Label(text);
        lbl.setFont(Font.font("Consolas", FontWeight.BOLD, 12));
        lbl.setTextFill(Color.web("#c9d1d9"));
        return lbl;
    }

    private Label miniLabel(String text) {
        Label lbl = new Label(text);
        lbl.setFont(Font.font("Consolas", 10));
        lbl.setTextFill(Color.web("#8b949e"));
        return lbl;
    }

    private String fieldStyle() {
        return "-fx-background-color: #21262d; -fx-text-fill: #c9d1d9; -fx-border-color: #30363d; " +
               "-fx-font-family: Consolas; -fx-border-radius: 4;";
    }

    private String comboStyle() {
        return "-fx-background-color: #21262d; -fx-border-color: #30363d; -fx-border-radius: 4;";
    }

    private void styleDialog() {
        getDialogPane().setStyle("-fx-background-color: #0d1117; -fx-border-color: #30363d;");
        getDialogPane().lookupButton(ButtonType.OK).setStyle(
                "-fx-background-color: #1a7f37; -fx-text-fill: white; -fx-font-family: Consolas; -fx-font-weight: bold;");
        getDialogPane().lookupButton(ButtonType.CANCEL).setStyle(
                "-fx-background-color: #30363d; -fx-text-fill: white; -fx-font-family: Consolas;");
    }
}
