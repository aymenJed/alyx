package com.umlmodeler.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UmlDiagram {
    private String name = "Nouveau Diagramme";
    private String version = "1.0";
    private List<UmlClass> classes = new ArrayList<>();
    private List<UmlRelation> relations = new ArrayList<>();

    public UmlDiagram() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public List<UmlClass> getClasses() { return classes; }
    public void setClasses(List<UmlClass> classes) { this.classes = classes; }

    public List<UmlRelation> getRelations() { return relations; }
    public void setRelations(List<UmlRelation> relations) { this.relations = relations; }

    public void addClass(UmlClass umlClass) { classes.add(umlClass); }
    public void addRelation(UmlRelation relation) { relations.add(relation); }

    public void removeClass(UmlClass umlClass) {
        classes.remove(umlClass);
        relations.removeIf(r -> r.getSourceId().equals(umlClass.getId()) || r.getTargetId().equals(umlClass.getId()));
    }

    public void removeRelation(UmlRelation relation) { relations.remove(relation); }

    public Optional<UmlClass> findClassById(String id) {
        return classes.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public List<UmlRelation> getRelationsForClass(String classId) {
        return relations.stream()
                .filter(r -> r.getSourceId().equals(classId) || r.getTargetId().equals(classId))
                .toList();
    }

    public void clear() {
        classes.clear();
        relations.clear();
    }
}
