package com.umlmodeler.ui;

import com.umlmodeler.engine.ProjectExporter;
import com.umlmodeler.engine.SpringBootGenerator;
import com.umlmodeler.model.UmlClass;
import com.umlmodeler.model.UmlDiagram;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.DirectoryChooser;
import javafx.stage.FileChooser;
import javafx.stage.Modality;
import javafx.stage.Window;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

public class GenerateCodeDialog extends Dialog<Void> {

    private final UmlDiagram diagram;
    private final Window owner;
    private final Map<UmlClass, CheckBox> checkboxes = new LinkedHashMap<>();
    private TextField packageField;
    private TextField projectField;
    private TextArea previewArea;

    public GenerateCodeDialog(UmlDiagram diagram, Window owner) {
        this.diagram = diagram;
        this.owner = owner;

        initOwner(owner);
        initModality(Modality.APPLICATION_MODAL);
        setTitle("🚀 Générer le code Spring Boot");
        setResizable(true);

        getDialogPane().setContent(buildContent());
        getDialogPane().getButtonTypes().add(ButtonType.CLOSE);
        getDialogPane().setPrefSize(800, 600);
        styleDialog();
    }

    private VBox buildContent() {
        VBox root = new VBox(16);
        root.setPadding(new Insets(20));
        root.setStyle("-fx-background-color: #0d1117;");

        // Title
        Label title = new Label("Configuration de la génération");
        title.setFont(Font.font("Consolas", FontWeight.BOLD, 16));
        title.setTextFill(Color.web("#63b3ed"));

        // Package and project name
        HBox configRow = new HBox(16);
        configRow.setAlignment(Pos.CENTER_LEFT);

        VBox pkgBox = new VBox(4);
        Label pkgLbl = styledLabel("Package de base :");
        packageField = new TextField("com.alyx");
        packageField.setStyle(fieldStyle());
        packageField.setPrefWidth(220);
        pkgBox.getChildren().addAll(pkgLbl, packageField);

        VBox projBox = new VBox(4);
        Label projLbl = styledLabel("Nom du projet :");
        projectField = new TextField("src\\main\\java");
        projectField.setStyle(fieldStyle());
        projectField.setPrefWidth(160);
        projBox.getChildren().addAll(projLbl, projectField);

        configRow.getChildren().addAll(pkgBox, projBox);

        // Checklist
        Label selectLabel = styledLabel("Entités à générer :");
        selectLabel.setFont(Font.font("Consolas", FontWeight.BOLD, 13));

        VBox checklistBox = new VBox(6);
        checklistBox.setStyle("-fx-background-color: #161b22; -fx-border-color: #30363d; -fx-border-radius: 4; -fx-background-radius: 4;");
        checklistBox.setPadding(new Insets(12));

        // Select all
        CheckBox selectAll = new CheckBox("Tout sélectionner");
        selectAll.setStyle("-fx-font-family: Consolas; -fx-font-weight: bold;");
        selectAll.setTextFill(Color.web("#58a6ff"));
        selectAll.setSelected(true);
        selectAll.setOnAction(e -> checkboxes.values().forEach(cb -> cb.setSelected(selectAll.isSelected())));
        checklistBox.getChildren().add(selectAll);
        checklistBox.getChildren().add(new Separator());

        if (diagram.getClasses().isEmpty()) {
            Label empty = styledLabel("Aucune classe dans le diagramme.");
            checklistBox.getChildren().add(empty);
        } else {
            for (UmlClass cls : diagram.getClasses()) {
                HBox row = new HBox(10);
                row.setAlignment(Pos.CENTER_LEFT);

                CheckBox cb = new CheckBox();
                cb.setSelected(true);
                checkboxes.put(cls, cb);

                Label icon = new Label(cls.isInterface() ? "⬡" : (cls.isAbstract() ? "◈" : "▣"));
                icon.setTextFill(Color.web(cls.isInterface() ? "#d2a8ff" : (cls.isAbstract() ? "#f0883e" : "#56d364")));

                Label clsName = new Label(cls.getName());
                clsName.setFont(Font.font("Consolas", FontWeight.BOLD, 12));
                clsName.setTextFill(Color.web("#e6edf3"));

                Label info = new Label(String.format("(%d attrs, %d méths)",
                        cls.getAttributes().size(), cls.getMethods().size()));
                info.setFont(Font.font("Consolas", 10));
                info.setTextFill(Color.web("#8b949e"));

                row.getChildren().addAll(cb, icon, clsName, info);
                checklistBox.getChildren().add(row);
            }
        }

        ScrollPane scrollPane = new ScrollPane(checklistBox);
        scrollPane.setStyle("-fx-background-color: transparent; -fx-background: #161b22;");
        scrollPane.setPrefHeight(180);
        scrollPane.setFitToWidth(true);

        // Preview area
        Label previewLabel = styledLabel("Aperçu des fichiers à générer :");
        previewArea = new TextArea();
        previewArea.setStyle("-fx-background-color: #161b22; -fx-text-fill: #8b949e; -fx-font-family: Consolas; -fx-font-size: 11;");
        previewArea.setPrefHeight(120);
        previewArea.setEditable(false);

        // Update preview on change
        Runnable updatePreview = () -> {
            List<UmlClass> selected = getSelectedClasses();
            if (selected.isEmpty()) {
                previewArea.setText("Aucune classe sélectionnée.");
                return;
            }
            StringBuilder sb = new StringBuilder("Fichiers qui seront générés :\n\n");
            String pkg = packageField.getText().replace(".", "/");
            sb.append("  BaseEntity.java\n");
            for (UmlClass cls : selected) {
                sb.append("  entity/").append(cls.getName()).append(".java\n");
                sb.append("  repository/").append(cls.getName()).append("Repository.java\n");
                sb.append("  dto/").append(cls.getName()).append("Dto.java\n");
                sb.append("  service/").append(cls.getName()).append("Service.java\n");
                sb.append("  service/impl/").append(cls.getName()).append("ServiceImpl.java\n");
                sb.append("  controller/").append(cls.getName()).append("Controller.java\n");
            }
            sb.append("  ").append(capitalize(projectField.getText())).append("Application.java\n");
            sb.append("  pom.xml\n  application.properties\n");
            sb.append("\nTotal : ").append(selected.size() * 6 + 4).append(" fichiers");
            previewArea.setText(sb.toString());
        };

        checkboxes.values().forEach(cb -> cb.setOnAction(e -> updatePreview.run()));
        packageField.textProperty().addListener((o, ov, nv) -> updatePreview.run());
        projectField.textProperty().addListener((o, ov, nv) -> updatePreview.run());
        updatePreview.run();

        // Buttons
        HBox btnRow = new HBox(12);
        btnRow.setAlignment(Pos.CENTER_RIGHT);

        Button generateZipBtn = bigButton("📦 Exporter en ZIP", "#2b6cb0");
        generateZipBtn.setOnAction(e -> generateZip());

        Button generateDirBtn = bigButton("📁 Exporter dans un dossier", "#276749");
        generateDirBtn.setOnAction(e -> generateDirectory());

        btnRow.getChildren().addAll(generateDirBtn, generateZipBtn);

        root.getChildren().addAll(title, configRow, selectLabel, scrollPane, previewLabel, previewArea, btnRow);
        return root;
    }

    private void generateZip() {
        List<UmlClass> selected = getSelectedClasses();
        if (selected.isEmpty()) {
            showAlert("Veuillez sélectionner au moins une classe.");
            return;
        }

        FileChooser fc = new FileChooser();
        fc.setTitle("Sauvegarder le ZIP");
        fc.setInitialFileName(projectField.getText() + "-springboot.zip");
        fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("ZIP", "*.zip"));
        File file = fc.showSaveDialog(owner);
        if (file == null) return;

        try {
            SpringBootGenerator gen = new SpringBootGenerator(diagram, packageField.getText(), projectField.getText());
            Map<String, String> files = gen.generate(selected);
            ProjectExporter.exportAsZip(files, file, projectField.getText());
            showSuccess(ProjectExporter.getSummary(files) + "\n✅ ZIP créé : " + file.getAbsolutePath());
        } catch (Exception ex) {
            showAlert("Erreur lors de la génération : " + ex.getMessage());
            ex.printStackTrace();
        }
    }

    private void generateDirectory() {
        List<UmlClass> selected = getSelectedClasses();
        if (selected.isEmpty()) {
            showAlert("Veuillez sélectionner au moins une classe.");
            return;
        }

        DirectoryChooser dc = new DirectoryChooser();
        dc.setTitle("Choisir le dossier de destination");
        File dir = dc.showDialog(owner);
        if (dir == null) return;

        try {
            SpringBootGenerator gen = new SpringBootGenerator(diagram, packageField.getText(), projectField.getText());
            Map<String, String> files = gen.generate(selected);
            ProjectExporter.exportToDirectory(files, dir, projectField.getText());
            showSuccess(ProjectExporter.getSummary(files) + "\n✅ Dossier créé : " + dir.getAbsolutePath() + "/" + projectField.getText());
        } catch (Exception ex) {
            showAlert("Erreur lors de la génération : " + ex.getMessage());
            ex.printStackTrace();
        }
    }

    private List<UmlClass> getSelectedClasses() {
        return checkboxes.entrySet().stream()
                .filter(e -> e.getValue().isSelected())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    private void showAlert(String message) {
        Alert alert = new Alert(Alert.AlertType.WARNING, message, ButtonType.OK);
        alert.initOwner(owner);
        alert.showAndWait();
    }

    private void showSuccess(String message) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.initOwner(owner);
        alert.setTitle("Génération réussie");
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }

    private void styleDialog() {
        getDialogPane().setStyle("-fx-background-color: #0d1117; -fx-border-color: #30363d;");
        getDialogPane().lookupButton(ButtonType.CLOSE)
                .setStyle("-fx-background-color: #4a5568; -fx-text-fill: white; -fx-font-family: Consolas;");
    }

    private Label styledLabel(String text) {
        Label lbl = new Label(text);
        lbl.setTextFill(Color.web("#c9d1d9"));
        lbl.setFont(Font.font("Consolas", 12));
        return lbl;
    }

    private String fieldStyle() {
        return "-fx-background-color: #21262d; -fx-text-fill: #c9d1d9; -fx-border-color: #30363d; " +
               "-fx-font-family: Consolas; -fx-border-radius: 4;";
    }

    private Button bigButton(String text, String color) {
        Button btn = new Button(text);
        btn.setStyle("-fx-background-color: " + color + "; -fx-text-fill: white; -fx-font-family: Consolas; " +
                     "-fx-font-weight: bold; -fx-padding: 10 20; -fx-background-radius: 5; -fx-cursor: hand;");
        return btn;
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}
