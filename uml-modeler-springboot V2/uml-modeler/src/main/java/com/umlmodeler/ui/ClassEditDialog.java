package com.umlmodeler.ui;

import com.umlmodeler.model.UmlAttribute;
import com.umlmodeler.model.UmlClass;
import com.umlmodeler.model.UmlMethod;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.stage.Modality;

public class ClassEditDialog extends Dialog<UmlClass> {
    private final UmlClass umlClass;
    private final TextField nameField;
    private final TextField packageField;
    private final CheckBox abstractCheck;
    private final CheckBox interfaceCheck;
    private final ListView<UmlAttribute> attributeList;
    private final ListView<UmlMethod> methodList;

    public ClassEditDialog(UmlClass umlClass) {
        this.umlClass = umlClass;
        initModality(Modality.APPLICATION_MODAL);
        setTitle("Éditer la classe : " + umlClass.getName());

        nameField = new TextField(umlClass.getName());
        packageField = new TextField(umlClass.getPackageName() != null ? umlClass.getPackageName() : "");
        packageField.setPromptText("ex: com.alyx.client");
        abstractCheck = new CheckBox("Abstraite");
        abstractCheck.setSelected(umlClass.isAbstract());
        interfaceCheck = new CheckBox("Interface");
        interfaceCheck.setSelected(umlClass.isInterface());

        attributeList = new ListView<>(FXCollections.observableArrayList(umlClass.getAttributes()));
        attributeList.setPrefHeight(120);

        methodList = new ListView<>(FXCollections.observableArrayList(umlClass.getMethods()));
        methodList.setPrefHeight(120);

        VBox content = buildContent();
        content.getStylesheets().add(getClass().getResource("/style.css") != null
                ? getClass().getResource("/style.css").toExternalForm() : "");

        getDialogPane().setContent(content);
        getDialogPane().getButtonTypes().addAll(ButtonType.OK, ButtonType.CANCEL);
        styleDialogPane();

        setResultConverter(btn -> {
            if (btn == ButtonType.OK) {
                applyChanges();
                return umlClass;
            }
            return null;
        });
    }

    private void styleDialogPane() {
        getDialogPane().setStyle(
                "-fx-background-color: #1a1a2e; -fx-border-color: #4a5568; -fx-border-width: 1;"
        );
        getDialogPane().lookupButton(ButtonType.OK).setStyle(
                "-fx-background-color: #3182ce; -fx-text-fill: white; -fx-font-family: Consolas;"
        );
        getDialogPane().lookupButton(ButtonType.CANCEL).setStyle(
                "-fx-background-color: #4a5568; -fx-text-fill: white; -fx-font-family: Consolas;"
        );
    }

    private VBox buildContent() {
        VBox root = new VBox(12);
        root.setPadding(new Insets(16));
        root.setStyle("-fx-background-color: #1a1a2e;");
        root.setPrefWidth(480);

        // Class info
        Label nameLabel = styledLabel("Nom de la classe :");
        nameField.setStyle(fieldStyle());

        Label pkgLabel = styledLabel("Package :");
        packageField.setStyle(fieldStyle());

        HBox flags = new HBox(20, abstractCheck, interfaceCheck);
        styleCheck(abstractCheck);
        styleCheck(interfaceCheck);

        // Attributes section
        Label attrLabel = styledLabel("Attributs :");
        HBox attrControls = buildAttributeControls();

        // Methods section
        Label methLabel = styledLabel("Méthodes :");
        HBox methControls = buildMethodControls();

        root.getChildren().addAll(
                nameLabel, nameField,
                pkgLabel, packageField,
                flags,
                new Separator(),
                attrLabel, attributeList, attrControls,
                new Separator(),
                methLabel, methodList, methControls
        );
        return root;
    }

    private HBox buildAttributeControls() {
        TextField attrName = new TextField();
        attrName.setPromptText("nom");
        attrName.setStyle(fieldStyle());
        attrName.setPrefWidth(120);

        TextField attrType = new TextField();
        attrType.setPromptText("type");
        attrType.setStyle(fieldStyle());
        attrType.setPrefWidth(100);

        ComboBox<UmlAttribute.Visibility> visCombo = new ComboBox<>(
                FXCollections.observableArrayList(UmlAttribute.Visibility.values()));
        visCombo.setValue(UmlAttribute.Visibility.PRIVATE);
        visCombo.setStyle(fieldStyle());

        Button addBtn = actionButton("+ Ajouter");
        addBtn.setOnAction(e -> {
            if (!attrName.getText().isBlank() && !attrType.getText().isBlank()) {
                UmlAttribute attr = new UmlAttribute(attrName.getText().trim(), attrType.getText().trim(), visCombo.getValue());
                attributeList.getItems().add(attr);
                attrName.clear();
                attrType.clear();
            }
        });

        Button removeBtn = actionButton("- Retirer");
        removeBtn.setStyle(removeStyle());
        removeBtn.setOnAction(e -> {
            UmlAttribute sel = attributeList.getSelectionModel().getSelectedItem();
            if (sel != null) attributeList.getItems().remove(sel);
        });

        HBox box = new HBox(8, attrName, attrType, visCombo, addBtn, removeBtn);
        box.setAlignment(javafx.geometry.Pos.CENTER_LEFT);
        return box;
    }

    private HBox buildMethodControls() {
        TextField methName = new TextField();
        methName.setPromptText("nom");
        methName.setStyle(fieldStyle());
        methName.setPrefWidth(120);

        TextField methReturn = new TextField("void");
        methReturn.setStyle(fieldStyle());
        methReturn.setPrefWidth(90);

        TextField methParams = new TextField();
        methParams.setPromptText("params (séparés par ,)");
        methParams.setStyle(fieldStyle());
        methParams.setPrefWidth(140);

        Button addBtn = actionButton("+ Ajouter");
        addBtn.setOnAction(e -> {
            if (!methName.getText().isBlank()) {
                UmlMethod method = new UmlMethod(methName.getText().trim(), methReturn.getText().trim());
                if (!methParams.getText().isBlank()) {
                    for (String p : methParams.getText().split(",")) {
                        method.getParameters().add(p.trim());
                    }
                }
                methodList.getItems().add(method);
                methName.clear();
                methReturn.setText("void");
                methParams.clear();
            }
        });

        Button removeBtn = actionButton("- Retirer");
        removeBtn.setStyle(removeStyle());
        removeBtn.setOnAction(e -> {
            UmlMethod sel = methodList.getSelectionModel().getSelectedItem();
            if (sel != null) methodList.getItems().remove(sel);
        });

        HBox box = new HBox(8, methName, methReturn, methParams, addBtn, removeBtn);
        box.setAlignment(javafx.geometry.Pos.CENTER_LEFT);
        return box;
    }

    private void applyChanges() {
        umlClass.setName(nameField.getText().trim());
        umlClass.setPackageName(packageField.getText().trim());
        umlClass.setAbstract(abstractCheck.isSelected());
        umlClass.setInterface(interfaceCheck.isSelected());
        umlClass.setAttributes(new java.util.ArrayList<>(attributeList.getItems()));
        umlClass.setMethods(new java.util.ArrayList<>(methodList.getItems()));
    }

    private Label styledLabel(String text) {
        Label lbl = new Label(text);
        lbl.setTextFill(Color.web("#e2e8f0"));
        lbl.setFont(javafx.scene.text.Font.font("Consolas", 12));
        return lbl;
    }

    private String fieldStyle() {
        return "-fx-background-color: #2d3748; -fx-text-fill: #e2e8f0; -fx-border-color: #4a5568; " +
               "-fx-border-radius: 3; -fx-font-family: Consolas;";
    }

    private Button actionButton(String text) {
        Button btn = new Button(text);
        btn.setStyle("-fx-background-color: #2b6cb0; -fx-text-fill: white; -fx-font-family: Consolas; " +
                     "-fx-cursor: hand; -fx-background-radius: 3;");
        return btn;
    }

    private String removeStyle() {
        return "-fx-background-color: #742a2a; -fx-text-fill: white; -fx-font-family: Consolas; " +
               "-fx-cursor: hand; -fx-background-radius: 3;";
    }

    private void styleCheck(CheckBox cb) {
        cb.setTextFill(Color.web("#e2e8f0"));
        cb.setStyle("-fx-font-family: Consolas;");
    }
}
