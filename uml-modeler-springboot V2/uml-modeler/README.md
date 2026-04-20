# UML Modeler → Spring Boot Generator

Application JavaFX 22 permettant de modéliser des diagrammes de classes UML et de générer un projet Spring Boot 3.x complet.

## Prérequis

- Java 22+ (avec JDK)
- Maven 3.9+
- JavaFX 22 (inclus via Maven)

## Lancement

```bash
mvn javafx:run
```

Ou compiler et exécuter le JAR :

```bash
mvn clean package
java --enable-preview -jar target/uml-modeler-1.0.0.jar
```

---

## Fonctionnalités

### Éditeur de Diagrammes

| Action | Description |
|---|---|
| `+ Classe` ou `Ctrl+K` | Ajouter une nouvelle classe |
| Double-clic sur une classe | Éditer (attributs, méthodes, type) |
| Panel gauche | Sélectionner le type de relation, puis cliquer Source → Cible |
| `Delete` | Supprimer la sélection |
| `Escape` | Annuler le tracé de relation |
| Glisser-déposer | Repositionner les classes |

### Types de Relations supportés

- **Héritage** — Flèche avec triangle creux (extends)
- **Composition** — Losange plein (one-to-many avec cascade)
- **Agrégation** — Losange vide (many-to-many)
- **Association** — Flèche simple (many-to-one)
- **Dépendance** — Flèche pointillée
- **Réalisation** — Flèche triangle + pointillé (implements)

### Persistance

- Sauvegarder le diagramme en **JSON** (`.uml.json`) : `Ctrl+S`
- Rouvrir un diagramme existant : `Ctrl+O`

---

## Génération de Code (`Ctrl+G`)

Sélectionnez les entités à générer via la **Checklist**, configurez :
- **Package de base** (ex: `com.monentreprise.monapp`)
- **Nom du projet**

Le générateur produit pour chaque entité :

```
src/main/java/{package}/
├── entity/
│   ├── BaseEntity.java          ← @MappedSuperclass avec @Id, @CreatedDate, @LastModifiedDate
│   └── {Entity}.java            ← @Entity + annotations JPA (relations, colonnes)
├── repository/
│   └── {Entity}Repository.java  ← extends JpaRepository<Entity, Long>
├── dto/
│   └── {Entity}Dto.java         ← Lombok @Data @Builder (Request + Response)
├── service/
│   ├── {Entity}Service.java     ← Interface avec CRUD
│   └── impl/
│       └── {Entity}ServiceImpl.java  ← @Service @Transactional avec logique CRUD
└── controller/
    └── {Entity}Controller.java  ← @RestController GET/POST/PUT/DELETE
```

Plus `pom.xml` Spring Boot 3.x et `application.properties`.

### Traduction des Relations UML → JPA

| Relation UML | Annotation JPA générée |
|---|---|
| Composition (source→cible) | `@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)` |
| Composition (cible→source) | `@ManyToOne` |
| Agrégation | `@ManyToMany` avec `@JoinTable` |
| Association | `@ManyToOne` |
| Héritage | `extends ParentClass` |

---

## Stack Générée

- Spring Boot **3.3.x**
- Spring Data JPA + Hibernate
- **Lombok** (réduction boilerplate)
- H2 (base de données en mémoire par défaut, remplaçable)
- Java **22** avec `--enable-preview`

---

## Architecture du Projet UML Modeler

```
com.umlmodeler/
├── MainApp.java
├── model/
│   ├── UmlDiagram.java
│   ├── UmlClass.java
│   ├── UmlAttribute.java
│   ├── UmlMethod.java
│   └── UmlRelation.java
├── ui/
│   ├── MainWindow.java
│   ├── DiagramCanvas.java
│   ├── ClassEditDialog.java
│   ├── GenerateCodeDialog.java
│   ├── nodes/
│   │   └── ClassNode.java
│   └── relations/
│       └── RelationLine.java
├── engine/
│   ├── SpringBootGenerator.java
│   └── ProjectExporter.java
└── util/
    └── DiagramSerializer.java
```
