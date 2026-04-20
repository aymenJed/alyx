package com.umlmodeler.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.umlmodeler.model.UmlDiagram;

import java.io.File;
import java.io.IOException;

public class DiagramSerializer {
    private static final ObjectMapper mapper = new ObjectMapper()
            .enable(SerializationFeature.INDENT_OUTPUT);

    public static void save(UmlDiagram diagram, File file) throws IOException {
        mapper.writeValue(file, diagram);
    }

    public static UmlDiagram load(File file) throws IOException {
        return mapper.readValue(file, UmlDiagram.class);
    }

    public static String toJson(UmlDiagram diagram) throws IOException {
        return mapper.writeValueAsString(diagram);
    }

    public static UmlDiagram fromJson(String json) throws IOException {
        return mapper.readValue(json, UmlDiagram.class);
    }

    public static UmlDiagram deepCopy(UmlDiagram diagram) throws IOException {
        return fromJson(toJson(diagram));
    }
}
