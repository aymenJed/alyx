package com.umlmodeler.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UmlAttribute {
    private String name;
    private String type;
    private Visibility visibility = Visibility.PRIVATE;

    public enum Visibility {
        PUBLIC("+"), PRIVATE("-"), PROTECTED("#"), PACKAGE("~");
        private final String symbol;
        Visibility(String symbol) { this.symbol = symbol; }
        public String getSymbol() { return symbol; }
    }

    public UmlAttribute() {}

    public UmlAttribute(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public UmlAttribute(String name, String type, Visibility visibility) {
        this.name = name;
        this.type = type;
        this.visibility = visibility;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Visibility getVisibility() { return visibility; }
    public void setVisibility(Visibility visibility) { this.visibility = visibility; }

    @Override
    public String toString() {
        return visibility.getSymbol() + " " + name + " : " + type;
    }
}
