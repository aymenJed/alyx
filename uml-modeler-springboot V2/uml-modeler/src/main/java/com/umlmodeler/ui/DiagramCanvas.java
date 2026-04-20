package com.umlmodeler.ui;

import com.umlmodeler.model.UmlClass;
import com.umlmodeler.ui.RelationEditDialog;
import com.umlmodeler.model.UmlDiagram;
import com.umlmodeler.model.UmlRelation;
import com.umlmodeler.ui.nodes.ClassNode;
import com.umlmodeler.ui.relations.RelationLine;
import javafx.scene.Cursor;
import javafx.scene.control.ContextMenu;
import javafx.scene.control.MenuItem;
import javafx.scene.control.TextInputDialog;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Line;

import java.util.*;

public class DiagramCanvas extends Pane {
    private final UmlDiagram diagram;
    private final Map<String, ClassNode> classNodes = new LinkedHashMap<>();
    private final List<RelationLine> relationLines = new ArrayList<>();

    // Relation drawing state
    private boolean drawingRelation = false;
    private UmlRelation.RelationType pendingRelationType = null;
    private ClassNode relationSource = null;
    private Line previewLine = null;

    // Selection
    private ClassNode selectedNode = null;
    private RelationLine selectedRelation = null;

    private Runnable onChange;

    public DiagramCanvas(UmlDiagram diagram) {
        this.diagram = diagram;
        setStyle("-fx-background-color: #0d1117;");
        setPrefSize(2000, 1500);
        setupContextMenu();
        setupMouseHandlers();
        redrawAll();
    }

    private void setupContextMenu() {
        ContextMenu ctxMenu = new ContextMenu();
        MenuItem addClassItem = new MenuItem("➕ Nouvelle Classe");
        addClassItem.setOnAction(e -> {
            // Will be handled by toolbar
        });
        ctxMenu.getItems().add(addClassItem);

        setOnContextMenuRequested(e -> {
            if (!drawingRelation) ctxMenu.show(this, e.getScreenX(), e.getScreenY());
        });
    }

    private void setupMouseHandlers() {
        setOnMouseMoved(e -> {
            if (drawingRelation && previewLine != null) {
                previewLine.setEndX(e.getX());
                previewLine.setEndY(e.getY());
            }
        });

        setOnMouseClicked(e -> {
            if (e.getButton() == MouseButton.PRIMARY && drawingRelation) {
                cancelRelationDrawing();
            }
            if (e.getButton() == MouseButton.PRIMARY) {
                deselectAll();
            }
        });
    }

    public ClassNode addNewClass(double x, double y, String name) {
        UmlClass umlClass = new UmlClass(name, x, y);
        diagram.addClass(umlClass);
        ClassNode node = createClassNode(umlClass);
        if (onChange != null) onChange.run();
        return node;
    }

    private ClassNode createClassNode(UmlClass umlClass) {
        ClassNode node = new ClassNode(umlClass);

        node.setOnSelected(n -> {
            if (drawingRelation && relationSource != null && n != relationSource) {
                finishRelationDrawing(n);
            } else {
                selectNode(n);
            }
        });

        node.setOnMoved(n -> {
            updateRelationsForNode(n);
            if (onChange != null) onChange.run();
        });

        node.setOnMouseClicked(e -> {
            if (e.getButton() == MouseButton.PRIMARY && e.getClickCount() == 2) {
                openClassEditor(node);
                e.consume();
            }
        });

        classNodes.put(umlClass.getId(), node);
        getChildren().add(node);
        return node;
    }

    public void openClassEditor(ClassNode node) {
        ClassEditDialog dialog = new ClassEditDialog(node.getUmlClass());
        dialog.showAndWait().ifPresent(cls -> {
            node.refresh();
            updateRelationsForNode(node);
            if (onChange != null) onChange.run();
        });
    }

    public void startRelationDrawing(UmlRelation.RelationType type) {
        drawingRelation = true;
        pendingRelationType = type;
        relationSource = null;
        setCursor(Cursor.CROSSHAIR);

        // Override node selection for source picking
        for (ClassNode node : classNodes.values()) {
            node.setOnSelected(n -> {
                if (relationSource == null) {
                    relationSource = n;
                    startPreviewLine(n);
                } else if (n != relationSource) {
                    finishRelationDrawing(n);
                }
            });
        }
    }

    private void startPreviewLine(ClassNode source) {
        previewLine = new Line(source.getCenterX(), source.getCenterY(),
                               source.getCenterX(), source.getCenterY());
        previewLine.setStroke(Color.web("#63b3ed"));
        previewLine.setStrokeWidth(1.5);
        previewLine.getStrokeDashArray().addAll(6.0, 3.0);
        previewLine.setMouseTransparent(true);
        getChildren().add(previewLine);
    }

    private void finishRelationDrawing(ClassNode target) {
        if (previewLine != null) {
            getChildren().remove(previewLine);
            previewLine = null;
        }

        UmlRelation relation = new UmlRelation(
                relationSource.getUmlClass().getId(),
                target.getUmlClass().getId(),
                pendingRelationType
        );

        ClassNode savedSource = relationSource;
        cancelRelationDrawing(); // reset drawing mode before opening dialog

        RelationEditDialog dlg = new RelationEditDialog(relation, savedSource.getUmlClass(), target.getUmlClass());
        dlg.showAndWait().ifPresent(r -> {
            diagram.addRelation(r);
            createRelationLine(r, classNodes.get(r.getSourceId()), classNodes.get(r.getTargetId()));
            if (onChange != null) onChange.run();
        });
    }

    private RelationLine createRelationLine(UmlRelation relation, ClassNode src, ClassNode tgt) {
        RelationLine line = new RelationLine(relation, src, tgt);
        line.setOnEdited((rel, changed) -> { if (onChange != null) onChange.run(); });
        relationLines.add(line);
        getChildren().add(0, line);
        for (ClassNode n : classNodes.values()) n.toFront();
        return line;
    }

    public void cancelRelationDrawing() {
        drawingRelation = false;
        pendingRelationType = null;
        relationSource = null;
        setCursor(Cursor.DEFAULT);
        if (previewLine != null) {
            getChildren().remove(previewLine);
            previewLine = null;
        }
        // Restore normal node handlers
        for (ClassNode node : classNodes.values()) {
            node.setOnSelected(this::selectNode);
        }
    }

    private void selectNode(ClassNode node) {
        deselectAll();
        selectedNode = node;
        node.setSelected(true);
    }

    public void deselectAll() {
        if (selectedNode != null) {
            selectedNode.setSelected(false);
            selectedNode = null;
        }
        if (selectedRelation != null) {
            selectedRelation.setSelected(false);
            selectedRelation = null;
        }
    }

    public void deleteSelected() {
        if (selectedNode != null) {
            String id = selectedNode.getUmlClass().getId();
            diagram.removeClass(selectedNode.getUmlClass());
            getChildren().remove(selectedNode);
            classNodes.remove(id);

            // Remove associated relation lines
            List<RelationLine> toRemove = relationLines.stream()
                    .filter(r -> r.getSourceNode() == selectedNode || r.getTargetNode() == selectedNode)
                    .toList();
            toRemove.forEach(r -> getChildren().remove(r));
            relationLines.removeAll(toRemove);

            selectedNode = null;
            if (onChange != null) onChange.run();
        } else if (selectedRelation != null) {
            diagram.removeRelation(selectedRelation.getRelation());
            getChildren().remove(selectedRelation);
            relationLines.remove(selectedRelation);
            selectedRelation = null;
            if (onChange != null) onChange.run();
        }
    }

    private void updateRelationsForNode(ClassNode node) {
        relationLines.stream()
                .filter(r -> r.getSourceNode() == node || r.getTargetNode() == node)
                .forEach(RelationLine::update);
    }

    public void redrawAll() {
        getChildren().clear();
        classNodes.clear();
        relationLines.clear();

        // First create all nodes
        for (UmlClass cls : diagram.getClasses()) {
            createClassNode(cls);
        }

        // Then create relation lines
        for (UmlRelation rel : diagram.getRelations()) {
            ClassNode src = classNodes.get(rel.getSourceId());
            ClassNode tgt = classNodes.get(rel.getTargetId());
            if (src != null && tgt != null) {
                createRelationLine(rel, src, tgt);
            }
        }

        // Move nodes to top
        for (ClassNode node : classNodes.values()) {
            node.toFront();
        }
    }

    public void setOnChange(Runnable handler) { this.onChange = handler; }
    public UmlDiagram getDiagram() { return diagram; }
    public ClassNode getSelectedNode() { return selectedNode; }
    public Map<String, ClassNode> getClassNodes() { return classNodes; }
    public boolean isDrawingRelation() { return drawingRelation; }
}
