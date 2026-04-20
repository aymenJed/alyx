package com.umlmodeler.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UmlClass {
    private String id;
    private String name;
    private double x;
    private double y;
    private double width = 200;
    private double height = 120;
    private List<UmlAttribute> attributes = new ArrayList<>();
    private List<UmlMethod> methods = new ArrayList<>();
    private boolean isAbstract = false;
    private boolean isInterface = false;
    private String packageName = "";

    public UmlClass() {
        this.id = UUID.randomUUID().toString();
    }

    public UmlClass(String name, double x, double y) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.x = x;
        this.y = y;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getX() { return x; }
    public void setX(double x) { this.x = x; }

    public double getY() { return y; }
    public void setY(double y) { this.y = y; }

    public double getWidth() { return width; }
    public void setWidth(double width) { this.width = width; }

    public double getHeight() { return height; }
    public void setHeight(double height) { this.height = height; }

    public List<UmlAttribute> getAttributes() { return attributes; }
    public void setAttributes(List<UmlAttribute> attributes) { this.attributes = attributes; }

    public List<UmlMethod> getMethods() { return methods; }
    public void setMethods(List<UmlMethod> methods) { this.methods = methods; }

    public boolean isAbstract() { return isAbstract; }
    public void setAbstract(boolean anAbstract) { isAbstract = anAbstract; }

    public boolean isInterface() { return isInterface; }
    public void setInterface(boolean anInterface) { isInterface = anInterface; }

    public String getPackageName() { return packageName; }
    public void setPackageName(String packageName) { this.packageName = packageName == null ? "" : packageName; }

    public void addAttribute(UmlAttribute attr) { attributes.add(attr); }
    public void addMethod(UmlMethod method) { methods.add(method); }

    @Override
    public String toString() { return name; }
}
