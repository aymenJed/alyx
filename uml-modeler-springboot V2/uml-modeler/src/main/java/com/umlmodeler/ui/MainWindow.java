package com.umlmodeler.ui;

import com.umlmodeler.model.UmlClass;
import com.umlmodeler.model.UmlDiagram;
import com.umlmodeler.model.UmlRelation;
import com.umlmodeler.ui.nodes.ClassNode;
import com.umlmodeler.util.DiagramSerializer;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyCodeCombination;
import javafx.scene.input.KeyCombination;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontPosture;
import javafx.scene.text.FontWeight;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

public class MainWindow {

    // ── Inner type for tree nodes ──────────────────────────────────────────────
    private record PkgNode(String label, UmlClass cls) {
        boolean isClass() { return cls != null; }
        @Override public String toString() { return label; }
    }

    // ── Fields ─────────────────────────────────────────────────────────────────
    private final Stage stage;
    private UmlDiagram diagram;
    private DiagramCanvas canvas;
    private Label statusLabel;
    private boolean modified = false;
    private File currentFile = null;

    private TreeView<PkgNode> packageTreeView;

    // Relation drawing mode
    private UmlRelation.RelationType selectedRelationType = null;
    private ToggleGroup relationToggle;

    public MainWindow(Stage stage) {
        this.stage = stage;
        this.diagram = new UmlDiagram();
    }

    public void show() {
        BorderPane root = new BorderPane();
        root.setStyle("-fx-background-color: #0d1117;");

        // Top: menu bar + toolbar
        VBox topArea = new VBox();
        topArea.getChildren().addAll(buildMenuBar(), buildToolbar());
        root.setTop(topArea);

        // Center: canvas in a scrollpane
        canvas = new DiagramCanvas(diagram);
        canvas.setOnChange(() -> { setModified(true); refreshPackageTree(); });

        ScrollPane scroll = new ScrollPane(canvas);
        scroll.setStyle("-fx-background-color: #0d1117; -fx-background: #0d1117;");
        scroll.setPannable(true);
        scroll.setHbarPolicy(ScrollPane.ScrollBarPolicy.AS_NEEDED);
        scroll.setVbarPolicy(ScrollPane.ScrollBarPolicy.AS_NEEDED);
        root.setCenter(scroll);

        // Left: tools panel
        root.setLeft(buildToolsPanel());

        // Right: package tree panel
        root.setRight(buildPackageTreePanel());

        // Bottom: status bar
        root.setBottom(buildStatusBar());

        Scene scene = new Scene(root, 1400, 800);
        setupKeyShortcuts(scene);

        stage.setTitle("UML Modeler → Spring Boot Generator");
        stage.setScene(scene);
        stage.setOnCloseRequest(e -> {
            if (modified) {
                Alert confirm = new Alert(Alert.AlertType.CONFIRMATION,
                        "Des modifications non sauvegardées. Quitter quand même ?",
                        ButtonType.YES, ButtonType.NO);
                confirm.setTitle("Quitter");
                Optional<ButtonType> res = confirm.showAndWait();
                if (res.isEmpty() || res.get() != ButtonType.YES) {
                    e.consume();
                }
            }
        });
        stage.show();
        updateStatus("Prêt. Double-cliquez sur une classe pour l'éditer.");
    }

    private MenuBar buildMenuBar() {
        MenuBar menuBar = new MenuBar();
        menuBar.setStyle("-fx-background-color: #161b22; -fx-border-color: #30363d; -fx-border-width: 0 0 1 0;");

        // File menu
        Menu fileMenu = styledMenu("Fichier");
        MenuItem newItem = menuItem("Nouveau", "Ctrl+N");
        newItem.setOnAction(e -> newDiagram());
        MenuItem openItem = menuItem("Ouvrir...", "Ctrl+O");
        openItem.setOnAction(e -> openDiagram());
        MenuItem saveItem = menuItem("Sauvegarder", "Ctrl+S");
        saveItem.setOnAction(e -> saveDiagram(false));
        MenuItem saveAsItem = menuItem("Sauvegarder sous...", null);
        saveAsItem.setOnAction(e -> saveDiagram(true));
        MenuItem exitItem = menuItem("Quitter", null);
        exitItem.setOnAction(e -> stage.fireEvent(new javafx.stage.WindowEvent(stage, javafx.stage.WindowEvent.WINDOW_CLOSE_REQUEST)));
        fileMenu.getItems().addAll(newItem, openItem, new SeparatorMenuItem(), saveItem, saveAsItem, new SeparatorMenuItem(), exitItem);

        // Edit menu
        Menu editMenu = styledMenu("Édition");
        MenuItem deleteItem = menuItem("Supprimer sélection", "Delete");
        deleteItem.setOnAction(e -> canvas.deleteSelected());
        MenuItem addClassItem = menuItem("Ajouter une classe", "Ctrl+K");
        addClassItem.setOnAction(e -> promptAddClass());
        editMenu.getItems().addAll(addClassItem, new SeparatorMenuItem(), deleteItem);

        // Generate menu
        Menu generateMenu = styledMenu("Générer");
        MenuItem generateItem = menuItem("Générer code Spring Boot...", "Ctrl+G");
        generateItem.setOnAction(e -> openGenerateDialog());
        generateMenu.getItems().add(generateItem);

        // Help menu
        Menu helpMenu = styledMenu("Aide");
        MenuItem aboutItem = menuItem("À propos", null);
        aboutItem.setOnAction(e -> showAbout());
        helpMenu.getItems().add(aboutItem);

        menuBar.getMenus().addAll(fileMenu, editMenu, generateMenu, helpMenu);
        return menuBar;
    }

    private ToolBar buildToolbar() {
        ToolBar toolbar = new ToolBar();
        toolbar.setStyle("-fx-background-color: #161b22; -fx-border-color: #30363d; -fx-border-width: 0 0 1 0; -fx-padding: 4 8;");

        Button newBtn = toolbarButton("📄 Nouveau", "#21262d");
        newBtn.setOnAction(e -> newDiagram());

        Button openBtn = toolbarButton("📂 Ouvrir", "#21262d");
        openBtn.setOnAction(e -> openDiagram());

        Button saveBtn = toolbarButton("💾 Sauver", "#21262d");
        saveBtn.setOnAction(e -> saveDiagram(false));

        Separator sep1 = new Separator();
        sep1.setStyle("-fx-background-color: #30363d;");

        Button addClassBtn = toolbarButton("+ Classe", "#1f6feb");
        addClassBtn.setOnAction(e -> promptAddClass());

        Button deleteBtn = toolbarButton("🗑 Suppr.", "#6e0000");
        deleteBtn.setOnAction(e -> canvas.deleteSelected());

        Separator sep2 = new Separator();

        Button generateBtn = toolbarButton("🚀 Générer", "#1a7f37");
        generateBtn.setStyle(generateBtn.getStyle() + "-fx-font-weight: bold;");
        generateBtn.setOnAction(e -> openGenerateDialog());

        toolbar.getItems().addAll(newBtn, openBtn, saveBtn, sep1, addClassBtn, deleteBtn, sep2, generateBtn);
        return toolbar;
    }

    private VBox buildToolsPanel() {
        VBox panel = new VBox(8);
        panel.setPadding(new Insets(12, 8, 12, 8));
        panel.setPrefWidth(160);
        panel.setStyle("-fx-background-color: #161b22; -fx-border-color: #30363d; -fx-border-width: 0 1 0 0;");

        Label title = new Label("RELATIONS");
        title.setFont(Font.font("Consolas", FontWeight.BOLD, 10));
        title.setTextFill(Color.web("#8b949e"));
        title.setPadding(new Insets(0, 0, 4, 0));

        relationToggle = new ToggleGroup();

        ToggleButton inheritBtn = relationToggle("↑ Héritage", UmlRelation.RelationType.INHERITANCE, "#d2a8ff");
        ToggleButton composBtn = relationToggle("◆ Composition", UmlRelation.RelationType.COMPOSITION, "#56d364");
        ToggleButton aggrBtn = relationToggle("◇ Agrégation", UmlRelation.RelationType.AGGREGATION, "#58a6ff");
        ToggleButton assocBtn = relationToggle("→ Association", UmlRelation.RelationType.ASSOCIATION, "#f0883e");
        ToggleButton depBtn = relationToggle("⤑ Dépendance", UmlRelation.RelationType.DEPENDENCY, "#ffa657");

        for (ToggleButton btn : new ToggleButton[]{inheritBtn, composBtn, aggrBtn, assocBtn, depBtn}) {
            btn.setToggleGroup(relationToggle);
            btn.setMaxWidth(Double.MAX_VALUE);
        }

        relationToggle.selectedToggleProperty().addListener((obs, old, newToggle) -> {
            if (newToggle != null) {
                UmlRelation.RelationType type = (UmlRelation.RelationType) newToggle.getUserData();
                canvas.startRelationDrawing(type);
                updateStatus("Cliquez sur la classe SOURCE, puis la classe CIBLE");
            } else {
                canvas.cancelRelationDrawing();
                updateStatus("Prêt.");
            }
        });

        canvas.setOnMouseClicked(e -> {
            if (e.getTarget() == canvas && relationToggle.getSelectedToggle() != null) {
                relationToggle.selectToggle(null);
            }
        });

        Separator sep = new Separator();
        sep.setStyle("-fx-background-color: #30363d;");

        Label classTitle = new Label("CLASSES");
        classTitle.setFont(Font.font("Consolas", FontWeight.BOLD, 10));
        classTitle.setTextFill(Color.web("#8b949e"));

        Button addBtn = sideButton("+ Ajouter Classe", "#1f6feb");
        addBtn.setOnAction(e -> promptAddClass());

        Button editBtn = sideButton("✏ Éditer classe", "#21262d");
        editBtn.setOnAction(e -> {
            if (canvas.getSelectedNode() != null) {
                canvas.openClassEditor(canvas.getSelectedNode());
            } else {
                updateStatus("Sélectionnez d'abord une classe.");
            }
        });

        Button delBtn = sideButton("🗑 Supprimer", "#6e0000");
        delBtn.setOnAction(e -> canvas.deleteSelected());

        panel.getChildren().addAll(title, inheritBtn, composBtn, aggrBtn, assocBtn, depBtn,
                sep, classTitle, addBtn, editBtn, delBtn);
        return panel;
    }

    private HBox buildStatusBar() {
        HBox bar = new HBox();
        bar.setPadding(new Insets(4, 12, 4, 12));
        bar.setStyle("-fx-background-color: #161b22; -fx-border-color: #30363d; -fx-border-width: 1 0 0 0;");
        bar.setAlignment(Pos.CENTER_LEFT);

        statusLabel = new Label("Prêt.");
        statusLabel.setFont(Font.font("Consolas", 11));
        statusLabel.setTextFill(Color.web("#8b949e"));

        bar.getChildren().add(statusLabel);
        return bar;
    }

    private void setupKeyShortcuts(Scene scene) {
        scene.setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.DELETE || e.getCode() == KeyCode.BACK_SPACE) {
                canvas.deleteSelected();
            } else if (e.isControlDown() && e.getCode() == KeyCode.S) {
                saveDiagram(false);
            } else if (e.isControlDown() && e.getCode() == KeyCode.O) {
                openDiagram();
            } else if (e.isControlDown() && e.getCode() == KeyCode.N) {
                newDiagram();
            } else if (e.isControlDown() && e.getCode() == KeyCode.G) {
                openGenerateDialog();
            } else if (e.isControlDown() && e.getCode() == KeyCode.K) {
                promptAddClass();
            } else if (e.getCode() == KeyCode.ESCAPE) {
                canvas.cancelRelationDrawing();
                if (relationToggle != null) relationToggle.selectToggle(null);
            }
        });
    }

    // ---- Actions ----

    private void newDiagram() {
        if (modified) {
            Alert confirm = new Alert(Alert.AlertType.CONFIRMATION,
                    "Des modifications non sauvegardées. Continuer ?", ButtonType.YES, ButtonType.NO);
            if (confirm.showAndWait().orElse(ButtonType.NO) != ButtonType.YES) return;
        }
        diagram = new UmlDiagram();
        canvas.getDiagram().clear();
        canvas.getDiagram().setName("Nouveau Diagramme");
        // Reload
        rebuildCanvas();
        currentFile = null;
        setModified(false);
        stage.setTitle("UML Modeler → Spring Boot Generator");
        updateStatus("Nouveau diagramme créé.");
    }

    private void openDiagram() {
        FileChooser fc = new FileChooser();
        fc.setTitle("Ouvrir un diagramme");
        fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("UML Diagram (*.uml.json)", "*.uml.json"));
        File file = fc.showOpenDialog(stage);
        if (file == null) return;
        try {
            diagram = DiagramSerializer.load(file);
            rebuildCanvas();
            currentFile = file;
            setModified(false);
            stage.setTitle("UML Modeler - " + file.getName());
            updateStatus("Diagramme ouvert : " + file.getName() + " (" + diagram.getClasses().size() + " classes)");
        } catch (Exception ex) {
            showError("Impossible d'ouvrir le fichier : " + ex.getMessage());
        }
    }

    private void saveDiagram(boolean saveAs) {
        if (currentFile == null || saveAs) {
            FileChooser fc = new FileChooser();
            fc.setTitle("Sauvegarder le diagramme");
            fc.setInitialFileName("diagram.uml.json");
            fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("UML Diagram (*.uml.json)", "*.uml.json"));
            currentFile = fc.showSaveDialog(stage);
            if (currentFile == null) return;
        }
        try {
            DiagramSerializer.save(canvas.getDiagram(), currentFile);
            setModified(false);
            stage.setTitle("UML Modeler - " + currentFile.getName());
            updateStatus("Sauvegardé : " + currentFile.getName());
        } catch (Exception ex) {
            showError("Erreur de sauvegarde : " + ex.getMessage());
        }
    }

    private void promptAddClass() {
        TextInputDialog dialog = new TextInputDialog("MaClasse");
        dialog.setTitle("Nouvelle Classe");
        dialog.setHeaderText("Nom de la nouvelle classe :");
        dialog.setContentText("Nom :");
        dialog.initOwner(stage);
        dialog.showAndWait().ifPresent(name -> {
            if (!name.isBlank()) {
                double cx = 200 + Math.random() * 400;
                double cy = 200 + Math.random() * 300;
                canvas.addNewClass(cx, cy, name.trim());
                setModified(true);
                updateStatus("Classe '" + name + "' créée. Double-cliquez pour ajouter des attributs.");
            }
        });
    }

    private void openGenerateDialog() {
        if (canvas.getDiagram().getClasses().isEmpty()) {
            showError("Le diagramme est vide. Ajoutez des classes d'abord.");
            return;
        }
        GenerateCodeDialog dialog = new GenerateCodeDialog(canvas.getDiagram(), stage);
        dialog.showAndWait();
    }

    private void rebuildCanvas() {
        // Update canvas diagram
        UmlDiagram cd = canvas.getDiagram();
        cd.getClasses().clear();
        cd.getRelations().clear();
        cd.getClasses().addAll(diagram.getClasses());
        cd.getRelations().addAll(diagram.getRelations());
        cd.setName(diagram.getName());
        canvas.redrawAll();
        canvas.setOnChange(() -> { setModified(true); refreshPackageTree(); });
        refreshPackageTree();
    }

    // ── Package Tree ───────────────────────────────────────────────────────────

    private VBox buildPackageTreePanel() {
        VBox panel = new VBox(8);
        panel.setPrefWidth(230);
        panel.setPadding(new Insets(12, 8, 12, 8));
        panel.setStyle("-fx-background-color: #161b22; -fx-border-color: #30363d; -fx-border-width: 0 0 0 1;");

        Label title = new Label("PACKAGES");
        title.setFont(Font.font("Consolas", FontWeight.BOLD, 10));
        title.setTextFill(Color.web("#8b949e"));
        title.setPadding(new Insets(0, 0, 4, 0));

        packageTreeView = new TreeView<>();
        packageTreeView.setShowRoot(false);
        packageTreeView.setStyle(
                "-fx-background-color: #0d1117; -fx-border-color: #30363d; -fx-border-width: 1;");
        VBox.setVgrow(packageTreeView, Priority.ALWAYS);

        packageTreeView.setCellFactory(tv -> new TreeCell<>() {
            @Override
            protected void updateItem(PkgNode item, boolean empty) {
                super.updateItem(item, empty);
                if (empty || item == null) {
                    setText(null);
                    setStyle("-fx-background-color: transparent;");
                    return;
                }
                setFont(Font.font("Consolas", 11));
                if (item.isClass()) {
                    setText("  \uD83D\uDD37 " + item.label());   // 🔷
                    setTextFill(Color.web("#58a6ff"));
                } else {
                    setText("\uD83D\uDCE6 " + item.label());      // 📦
                    setTextFill(Color.web("#c9d1d9"));
                }
                setStyle("-fx-background-color: transparent;");
            }
        });

        // Clic sur une classe → la sélectionner sur le canvas
        packageTreeView.getSelectionModel().selectedItemProperty().addListener(
                (obs, old, sel) -> {
                    if (sel != null && sel.getValue() != null && sel.getValue().isClass()) {
                        UmlClass cls = sel.getValue().cls();
                        ClassNode node = canvas.getClassNodes().get(cls.getId());
                        if (node != null) {
                            canvas.deselectAll();
                            node.setSelected(true);
                            updateStatus("Classe sélectionnée : " + cls.getName()
                                    + (cls.getPackageName().isBlank() ? "" : "  [" + cls.getPackageName() + "]"));
                        }
                    }
                });

        panel.getChildren().addAll(title, packageTreeView);
        return panel;
    }

    private void refreshPackageTree() {
        if (packageTreeView == null) return;

        TreeItem<PkgNode> root = new TreeItem<>(new PkgNode("root", null));
        // key = full package path (e.g. "com.alyx.client"), value = its TreeItem
        Map<String, TreeItem<PkgNode>> pkgCache = new LinkedHashMap<>();

        // Sort: by package then by class name
        List<UmlClass> sorted = new ArrayList<>(canvas.getDiagram().getClasses());
        sorted.sort(Comparator
                .comparing((UmlClass c) -> c.getPackageName() == null ? "" : c.getPackageName())
                .thenComparing(UmlClass::getName));

        for (UmlClass cls : sorted) {
            String pkg = (cls.getPackageName() == null || cls.getPackageName().isBlank())
                    ? "(défaut)" : cls.getPackageName();

            TreeItem<PkgNode> pkgItem = ensurePackagePath(root, pkgCache, pkg);
            pkgItem.getChildren().add(new TreeItem<>(new PkgNode(cls.getName(), cls)));
        }

        sortTree(root);
        expandAll(root);
        packageTreeView.setRoot(root);
    }

    /** Creates (or retrieves) every intermediate package node for a dot-separated path. */
    private TreeItem<PkgNode> ensurePackagePath(TreeItem<PkgNode> root,
            Map<String, TreeItem<PkgNode>> cache, String fullPkg) {
        if (cache.containsKey(fullPkg)) return cache.get(fullPkg);

        String[] segments = fullPkg.split("\\.");
        StringBuilder path = new StringBuilder();
        TreeItem<PkgNode> current = root;

        for (String seg : segments) {
            if (path.length() > 0) path.append(".");
            path.append(seg);
            String key = path.toString();
            if (!cache.containsKey(key)) {
                TreeItem<PkgNode> node = new TreeItem<>(new PkgNode(seg, null));
                current.getChildren().add(node);
                cache.put(key, node);
            }
            current = cache.get(key);
        }
        return current;
    }

    /** Sorts tree: package nodes first (alphabetically), then class nodes (alphabetically). */
    private void sortTree(TreeItem<PkgNode> item) {
        if (item.getChildren().isEmpty()) return;
        item.getChildren().sort((a, b) -> {
            PkgNode av = a.getValue(), bv = b.getValue();
            if (av.isClass() != bv.isClass()) return av.isClass() ? 1 : -1;
            return av.label().compareToIgnoreCase(bv.label());
        });
        for (TreeItem<PkgNode> child : item.getChildren()) sortTree(child);
    }

    private void expandAll(TreeItem<PkgNode> item) {
        item.setExpanded(true);
        for (TreeItem<PkgNode> child : item.getChildren()) expandAll(child);
    }

    // ── About / Error ──────────────────────────────────────────────────────────

    private void showAbout() {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("À propos");
        alert.setHeaderText("UML Modeler → Spring Boot Generator");
        alert.setContentText("""
                Version 1.0.0
                
                Outil de modélisation UML pour générer des projets Spring Boot 3.x.
                
                Raccourcis clavier :
                  Ctrl+N  : Nouveau diagramme
                  Ctrl+O  : Ouvrir
                  Ctrl+S  : Sauvegarder
                  Ctrl+K  : Ajouter une classe
                  Ctrl+G  : Générer le code
                  Delete  : Supprimer la sélection
                  Escape  : Annuler le tracé de relation
                  
                Double-clic sur une classe pour l'éditer.
                """);
        alert.initOwner(stage);
        alert.showAndWait();
    }

    private void showError(String msg) {
        Alert alert = new Alert(Alert.AlertType.ERROR, msg, ButtonType.OK);
        alert.initOwner(stage);
        alert.showAndWait();
    }

    private void setModified(boolean m) {
        this.modified = m;
        String prefix = m ? "● " : "";
        String base = currentFile != null ? currentFile.getName() : "Sans titre";
        stage.setTitle(prefix + "UML Modeler - " + base);
    }

    private void updateStatus(String msg) {
        statusLabel.setText(msg);
    }

    // ---- UI factory ----

    private Menu styledMenu(String text) {
        Menu m = new Menu(text);
        m.setStyle("-fx-font-family: Consolas;");
        return m;
    }

    private MenuItem menuItem(String text, String shortcut) {
        MenuItem item = new MenuItem(text);
        item.setStyle("-fx-font-family: Consolas;");
        return item;
    }

    private Button toolbarButton(String text, String bg) {
        Button btn = new Button(text);
        btn.setStyle("-fx-background-color: " + bg + "; -fx-text-fill: #c9d1d9; -fx-font-family: Consolas; " +
                     "-fx-font-size: 11; -fx-padding: 5 10; -fx-background-radius: 4; -fx-cursor: hand;");
        btn.setOnMouseEntered(e -> btn.setStyle(btn.getStyle().replace(bg, lighten(bg))));
        btn.setOnMouseExited(e -> btn.setStyle(btn.getStyle().replace(lighten(bg), bg)));
        return btn;
    }

    private ToggleButton relationToggle(String text, UmlRelation.RelationType type, String color) {
        ToggleButton btn = new ToggleButton(text);
        btn.setUserData(type);
        btn.setFont(Font.font("Consolas", 11));
        String base = "-fx-background-color: #21262d; -fx-text-fill: " + color + "; -fx-font-family: Consolas; " +
                      "-fx-padding: 6 10; -fx-background-radius: 4; -fx-cursor: hand; -fx-alignment: CENTER-LEFT;";
        String sel = "-fx-background-color: #30363d; -fx-text-fill: " + color + "; -fx-font-family: Consolas; " +
                     "-fx-padding: 6 10; -fx-background-radius: 4; -fx-border-color: " + color + "; -fx-border-radius: 4; -fx-alignment: CENTER-LEFT;";
        btn.setStyle(base);
        btn.selectedProperty().addListener((obs, old, nv) -> btn.setStyle(nv ? sel : base));
        return btn;
    }

    private Button sideButton(String text, String bg) {
        Button btn = new Button(text);
        btn.setMaxWidth(Double.MAX_VALUE);
        btn.setStyle("-fx-background-color: " + bg + "; -fx-text-fill: #c9d1d9; -fx-font-family: Consolas; " +
                     "-fx-font-size: 11; -fx-padding: 7 10; -fx-background-radius: 4; -fx-cursor: hand; -fx-alignment: CENTER-LEFT;");
        return btn;
    }

    private String lighten(String hex) {
        return hex.equals("#21262d") ? "#30363d" : hex;
    }
}
