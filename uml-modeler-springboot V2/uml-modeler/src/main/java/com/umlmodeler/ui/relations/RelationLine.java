package com.umlmodeler.ui.relations;

import com.umlmodeler.model.UmlClass;
import com.umlmodeler.model.UmlRelation;
import com.umlmodeler.model.UmlRelation.Multiplicity;
import com.umlmodeler.ui.RelationEditDialog;
import com.umlmodeler.ui.nodes.ClassNode;
import javafx.scene.Group;
import javafx.scene.control.Label;
import javafx.scene.input.MouseButton;
import javafx.scene.paint.Color;
import javafx.scene.shape.*;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

import java.util.function.BiConsumer;

public class RelationLine extends Group {

    private final UmlRelation relation;
    private final ClassNode sourceNode;
    private final ClassNode targetNode;
    private boolean selected = false;
    private BiConsumer<UmlRelation, Boolean> onEdited;

    private static Color typeColor(UmlRelation.RelationType type) {
        return switch (type) {
            case INHERITANCE  -> Color.web("#d2a8ff");
            case COMPOSITION  -> Color.web("#56d364");
            case AGGREGATION  -> Color.web("#58a6ff");
            case ASSOCIATION  -> Color.web("#f0883e");
            case DEPENDENCY   -> Color.web("#ffa657");
            case REALIZATION  -> Color.web("#ff7b72");
        };
    }

    public RelationLine(UmlRelation relation, ClassNode sourceNode, ClassNode targetNode) {
        this.relation = relation;
        this.sourceNode = sourceNode;
        this.targetNode = targetNode;
        update();
    }

    public void update() {
        getChildren().clear();

        double sx = sourceNode.getCenterX();
        double sy = sourceNode.getCenterY();
        double tx = targetNode.getCenterX();
        double ty = targetNode.getCenterY();

        double[] srcPt = sourceNode.getConnectionPoint(tx, ty);
        double[] tgtPt = targetNode.getConnectionPoint(sx, sy);

        double x1 = srcPt[0], y1 = srcPt[1];
        double x2 = tgtPt[0], y2 = tgtPt[1];

        Color baseColor = typeColor(relation.getType());
        Color lineColor = selected ? Color.web("#63b3ed") : baseColor.deriveColor(0, 1, 0.85, 1);

        Line line = new Line(x1, y1, x2, y2);
        line.setStrokeWidth(selected ? 2.2 : 1.6);
        line.setStroke(lineColor);

        if (relation.getType() == UmlRelation.RelationType.DEPENDENCY
                || relation.getType() == UmlRelation.RelationType.REALIZATION) {
            line.getStrokeDashArray().addAll(9.0, 4.0);
        }

        Line hitArea = new Line(x1, y1, x2, y2);
        hitArea.setStrokeWidth(12);
        hitArea.setStroke(Color.TRANSPARENT);
        hitArea.setOnMouseClicked(e -> {
            if (e.getButton() == MouseButton.PRIMARY) {
                if (e.getClickCount() == 2) openEditDialog();
                else setSelected(!selected);
                e.consume();
            }
        });

        getChildren().addAll(line, hitArea);

        double angle = Math.atan2(y2 - y1, x2 - x1);
        drawEndMarkers(x1, y1, x2, y2, angle, lineColor);

        // Label de relation
        if (relation.getLabel() != null && !relation.getLabel().isEmpty()) {
            double mx = (x1 + x2) / 2;
            double my = (y1 + y2) / 2;
            double nx = -Math.sin(angle) * 14;
            double ny =  Math.cos(angle) * 14;
            Label lbl = floatingLabel(relation.getLabel(), mx + nx, my + ny,
                    Font.font("Consolas", FontWeight.BOLD, 10), Color.web("#c9d1d9"));
            getChildren().add(lbl);
        }

        // Cardinalités source et cible
        String srcMult = relation.getSourceMultiplicity() != null
                ? relation.getSourceMultiplicity().getLabel() : "";
        String tgtMult = relation.getTargetMultiplicity() != null
                ? relation.getTargetMultiplicity().getLabel() : "";

        if (!srcMult.isEmpty()) {
            double ox = x1 + (x2 - x1) * 0.14;
            double oy = y1 + (y2 - y1) * 0.14;
            double nx = -Math.sin(angle) * 14;
            double ny =  Math.cos(angle) * 14;
            getChildren().add(floatingLabel(srcMult, ox + nx, oy + ny,
                    Font.font("Consolas", FontWeight.BOLD, 11), Color.web("#90cdf4")));
        }

        if (!tgtMult.isEmpty()) {
            double ox = x2 + (x1 - x2) * 0.14;
            double oy = y2 + (y1 - y2) * 0.14;
            double nx = -Math.sin(angle) * 14;
            double ny =  Math.cos(angle) * 14;
            getChildren().add(floatingLabel(tgtMult, ox + nx, oy + ny,
                    Font.font("Consolas", FontWeight.BOLD, 11), Color.web("#90cdf4")));
        }

        // Indicateur owner (⚓)
        if (relation.getType() != UmlRelation.RelationType.INHERITANCE
                && relation.getType() != UmlRelation.RelationType.REALIZATION
                && relation.getType() != UmlRelation.RelationType.DEPENDENCY) {
            boolean ownerIsSource = relation.getOwnerSide() == UmlRelation.OwnerSide.SOURCE;
            double ownerX = ownerIsSource ? x1 + (x2 - x1) * 0.25 : x2 + (x1 - x2) * 0.25;
            double ownerY = ownerIsSource ? y1 + (y2 - y1) * 0.25 : y2 + (y1 - y2) * 0.25;
            double nx = -Math.sin(angle) * 16;
            double ny =  Math.cos(angle) * 16;
            Label ownerLbl = floatingLabel("⚓", ownerX + nx, ownerY + ny,
                    Font.font("Consolas", 9), Color.web("#ffa657"));
            ownerLbl.setOpacity(selected ? 1.0 : 0.5);
            getChildren().add(ownerLbl);
        }
    }

    private void drawEndMarkers(double x1, double y1, double x2, double y2,
                                 double angle, Color color) {
        double arrowSize = 13;
        double diamondSize = 11;
        switch (relation.getType()) {
            case INHERITANCE, REALIZATION -> drawHollowTriangle(x2, y2, angle, arrowSize, color);
            case COMPOSITION -> {
                drawDiamond(x1, y1, angle + Math.PI, diamondSize, color, true);
                drawOpenArrow(x2, y2, angle, arrowSize, color);
            }
            case AGGREGATION -> {
                drawDiamond(x1, y1, angle + Math.PI, diamondSize, color, false);
                drawOpenArrow(x2, y2, angle, arrowSize, color);
            }
            case ASSOCIATION, DEPENDENCY -> drawOpenArrow(x2, y2, angle, arrowSize, color);
        }
    }

    private void drawHollowTriangle(double px, double py, double angle, double size, Color color) {
        double ax1 = px - size * Math.cos(angle - Math.PI / 6);
        double ay1 = py - size * Math.sin(angle - Math.PI / 6);
        double ax2 = px - size * Math.cos(angle + Math.PI / 6);
        double ay2 = py - size * Math.sin(angle + Math.PI / 6);
        Polygon tri = new Polygon(px, py, ax1, ay1, ax2, ay2);
        tri.setFill(Color.web("#0d1117"));
        tri.setStroke(color);
        tri.setStrokeWidth(1.6);
        getChildren().add(tri);
    }

    private void drawDiamond(double px, double py, double angle, double size, Color color, boolean filled) {
        double dx = size * Math.cos(angle);
        double dy = size * Math.sin(angle);
        double ox = size * 0.55 * Math.cos(angle + Math.PI / 2);
        double oy = size * 0.55 * Math.sin(angle + Math.PI / 2);
        Polygon diamond = new Polygon(px, py, px + ox, py + oy, px + dx, py + dy, px - ox, py - oy);
        diamond.setStroke(color);
        diamond.setStrokeWidth(1.6);
        diamond.setFill(filled ? color : Color.web("#0d1117"));
        getChildren().add(diamond);
    }

    private void drawOpenArrow(double x, double y, double angle, double size, Color color) {
        Line l1 = new Line(x, y,
                x - size * Math.cos(angle - Math.PI / 7),
                y - size * Math.sin(angle - Math.PI / 7));
        Line l2 = new Line(x, y,
                x - size * Math.cos(angle + Math.PI / 7),
                y - size * Math.sin(angle + Math.PI / 7));
        l1.setStroke(color); l1.setStrokeWidth(1.6);
        l2.setStroke(color); l2.setStrokeWidth(1.6);
        getChildren().addAll(l1, l2);
    }

    private Label floatingLabel(String text, double x, double y, Font font, Color fill) {
        Label lbl = new Label(text);
        lbl.setFont(font);
        lbl.setTextFill(fill);
        lbl.setMouseTransparent(true);
        lbl.setLayoutX(x - text.length() * 3.5);
        lbl.setLayoutY(y - 7);
        return lbl;
    }

    private void openEditDialog() {
        UmlClass srcClass = sourceNode.getUmlClass();
        UmlClass tgtClass = targetNode.getUmlClass();
        RelationEditDialog dlg = new RelationEditDialog(relation, srcClass, tgtClass);
        dlg.showAndWait().ifPresent(updated -> {
            update();
            if (onEdited != null) onEdited.accept(updated, true);
        });
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
        update();
    }

    public boolean isSelected() { return selected; }
    public void setOnEdited(BiConsumer<UmlRelation, Boolean> handler) { this.onEdited = handler; }
    public UmlRelation getRelation() { return relation; }
    public ClassNode getSourceNode() { return sourceNode; }
    public ClassNode getTargetNode() { return targetNode; }
}
