package com.umlmodeler.ui.nodes;

import com.umlmodeler.model.UmlAttribute;
import com.umlmodeler.model.UmlClass;
import com.umlmodeler.model.UmlMethod;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Cursor;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

import java.util.function.Consumer;

public class ClassNode extends VBox {
    private final UmlClass umlClass;
    private double dragOffsetX, dragOffsetY;
    private Consumer<ClassNode> onSelected;
    private Consumer<ClassNode> onMoved;
    private boolean selected = false;

    // Sections
    private final Label packageLabel;
    private final Label titleLabel;
    private final VBox attributesSection;
    private final VBox methodsSection;

    // Resize handle
    private static final double MIN_WIDTH = 180;
    private static final double MIN_HEIGHT = 80;

    public ClassNode(UmlClass umlClass) {
        this.umlClass = umlClass;
        this.packageLabel = new Label();
        this.titleLabel = new Label();
        this.attributesSection = new VBox(2);
        this.methodsSection = new VBox(2);

        buildUI();
        setupDrag();
        setLayoutX(umlClass.getX());
        setLayoutY(umlClass.getY());
        setPrefWidth(umlClass.getWidth());
    }

    private void buildUI() {
        setStyle(normalStyle());
        setMinWidth(MIN_WIDTH);
        setCursor(Cursor.MOVE);

        // Title section — package (italic gray) stacked above class name (bold white)
        VBox titleBox = new VBox(1);
        titleBox.setAlignment(Pos.CENTER);
        titleBox.setPadding(new Insets(6, 10, 6, 10));
        titleBox.setStyle("-fx-background-color: #1a1a2e; -fx-background-radius: 6 6 0 0;");

        packageLabel.setFont(Font.font("Consolas", javafx.scene.text.FontPosture.ITALIC, 9));
        packageLabel.setTextFill(Color.web("#718096"));
        packageLabel.setVisible(false);

        titleLabel.setFont(Font.font("Consolas", FontWeight.BOLD, 13));
        titleLabel.setTextFill(Color.web("#e2e8f0"));
        titleBox.getChildren().addAll(packageLabel, titleLabel);

        // Separator
        Region sep1 = new Region();
        sep1.setPrefHeight(1);
        sep1.setStyle("-fx-background-color: #4a5568;");

        // Attributes section
        attributesSection.setPadding(new Insets(6, 10, 6, 10));
        attributesSection.setStyle("-fx-background-color: #16213e;");

        // Separator
        Region sep2 = new Region();
        sep2.setPrefHeight(1);
        sep2.setStyle("-fx-background-color: #4a5568;");

        // Methods section
        methodsSection.setPadding(new Insets(6, 10, 6, 10));
        methodsSection.setStyle("-fx-background-color: #0f3460;");

        getChildren().addAll(titleBox, sep1, attributesSection, sep2, methodsSection);
        refresh();
    }

    public void refresh() {
        // Package label (shown only when set)
        String pkg = umlClass.getPackageName();
        if (pkg != null && !pkg.isBlank()) {
            packageLabel.setText(pkg);
            packageLabel.setVisible(true);
        } else {
            packageLabel.setVisible(false);
        }

        // Title
        String prefix = umlClass.isInterface() ? "«interface»\n" : (umlClass.isAbstract() ? "«abstract»\n" : "");
        titleLabel.setText(prefix + umlClass.getName());

        // Attributes
        attributesSection.getChildren().clear();
        if (umlClass.getAttributes().isEmpty()) {
            Label empty = new Label("(aucun attribut)");
            empty.setTextFill(Color.web("#718096"));
            empty.setFont(Font.font("Consolas", 10));
            attributesSection.getChildren().add(empty);
        } else {
            for (UmlAttribute attr : umlClass.getAttributes()) {
                Label lbl = new Label(attr.toString());
                lbl.setTextFill(getTypeColor(attr.getType()));
                lbl.setFont(Font.font("Consolas", 11));
                attributesSection.getChildren().add(lbl);
            }
        }

        // Methods
        methodsSection.getChildren().clear();
        if (umlClass.getMethods().isEmpty()) {
            Label empty = new Label("(aucune méthode)");
            empty.setTextFill(Color.web("#718096"));
            empty.setFont(Font.font("Consolas", 10));
            methodsSection.getChildren().add(empty);
        } else {
            for (UmlMethod method : umlClass.getMethods()) {
                Label lbl = new Label(method.toString());
                lbl.setTextFill(Color.web("#90cdf4"));
                lbl.setFont(Font.font("Consolas", 11));
                methodsSection.getChildren().add(lbl);
            }
        }

        // Update size
        double height = 36 + Math.max(1, umlClass.getAttributes().size()) * 20 + 12
                + Math.max(1, umlClass.getMethods().size()) * 20 + 12;
        umlClass.setHeight(height);
    }

    private Color getTypeColor(String type) {
        if (type == null) return Color.web("#e2e8f0");
        return switch (type.toLowerCase()) {
            case "string" -> Color.web("#68d391");
            case "int", "integer", "long" -> Color.web("#f6ad55");
            case "boolean" -> Color.web("#fc8181");
            case "double", "float" -> Color.web("#b794f4");
            default -> Color.web("#e2e8f0");
        };
    }

    private void setupDrag() {
        setOnMousePressed(e -> {
            dragOffsetX = e.getX();
            dragOffsetY = e.getY();
            setSelected(true);
            if (onSelected != null) onSelected.accept(this);
            e.consume();
        });

        setOnMouseDragged(e -> {
            double newX = getLayoutX() + e.getX() - dragOffsetX;
            double newY = getLayoutY() + e.getY() - dragOffsetY;
            newX = Math.max(0, newX);
            newY = Math.max(0, newY);
            setLayoutX(newX);
            setLayoutY(newY);
            umlClass.setX(newX);
            umlClass.setY(newY);
            if (onMoved != null) onMoved.accept(this);
            e.consume();
        });
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
        setStyle(selected ? selectedStyle() : normalStyle());
    }

    private String normalStyle() {
        return "-fx-border-color: #4a5568; -fx-border-width: 1.5; -fx-border-radius: 6; " +
               "-fx-background-radius: 6; -fx-effect: dropshadow(gaussian, rgba(0,0,0,0.4), 8, 0, 2, 2);";
    }

    private String selectedStyle() {
        return "-fx-border-color: #63b3ed; -fx-border-width: 2; -fx-border-radius: 6; " +
               "-fx-background-radius: 6; -fx-effect: dropshadow(gaussian, rgba(99,179,237,0.5), 12, 0, 0, 0);";
    }

    public UmlClass getUmlClass() { return umlClass; }
    public boolean isSelected() { return selected; }

    public double getCenterX() { return getLayoutX() + getWidth() / 2; }
    public double getCenterY() { return getLayoutY() + getHeight() / 2; }

    // Connection point on border
    public double[] getConnectionPoint(double fromX, double fromY) {
        double cx = getLayoutX() + getWidth() / 2;
        double cy = getLayoutY() + getHeight() / 2;
        double dx = fromX - cx;
        double dy = fromY - cy;
        double w = getWidth() / 2;
        double h = getHeight() / 2;

        if (dx == 0 && dy == 0) return new double[]{cx, cy};

        double scaleX = (dx != 0) ? w / Math.abs(dx) : Double.MAX_VALUE;
        double scaleY = (dy != 0) ? h / Math.abs(dy) : Double.MAX_VALUE;
        double scale = Math.min(scaleX, scaleY);

        return new double[]{cx + dx * scale, cy + dy * scale};
    }

    public void setOnSelected(Consumer<ClassNode> handler) { this.onSelected = handler; }
    public void setOnMoved(Consumer<ClassNode> handler) { this.onMoved = handler; }
}
