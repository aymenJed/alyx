package com.umlmodeler.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UmlMethod {
    private String name;
    private String returnType = "void";
    private List<String> parameters = new ArrayList<>();
    private UmlAttribute.Visibility visibility = UmlAttribute.Visibility.PUBLIC;

    public UmlMethod() {}

    public UmlMethod(String name, String returnType) {
        this.name = name;
        this.returnType = returnType;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getReturnType() { return returnType; }
    public void setReturnType(String returnType) { this.returnType = returnType; }

    public List<String> getParameters() { return parameters; }
    public void setParameters(List<String> parameters) { this.parameters = parameters; }

    public UmlAttribute.Visibility getVisibility() { return visibility; }
    public void setVisibility(UmlAttribute.Visibility visibility) { this.visibility = visibility; }

    @Override
    public String toString() {
        String params = String.join(", ", parameters);
        return visibility.getSymbol() + " " + name + "(" + params + ") : " + returnType;
    }
}
