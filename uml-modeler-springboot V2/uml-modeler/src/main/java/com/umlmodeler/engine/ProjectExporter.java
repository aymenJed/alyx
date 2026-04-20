package com.umlmodeler.engine;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ProjectExporter {

    /**
     * Export files as a ZIP archive.
     */
    public static void exportAsZip(Map<String, String> files, File outputZip, String projectRoot) throws IOException {
        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(outputZip), StandardCharsets.UTF_8)) {
            for (Map.Entry<String, String> entry : files.entrySet()) {
                String path = projectRoot + "/" + entry.getKey();
                ZipEntry ze = new ZipEntry(path);
                zos.putNextEntry(ze);
                zos.write(entry.getValue().getBytes(StandardCharsets.UTF_8));
                zos.closeEntry();
            }
        }
    }

    /**
     * Export files to a directory.
     */
    public static void exportToDirectory(Map<String, String> files, File outputDir, String projectRoot) throws IOException {
        for (Map.Entry<String, String> entry : files.entrySet()) {
            File outFile = new File(outputDir, projectRoot + File.separator + entry.getKey().replace("/", File.separator));
            outFile.getParentFile().mkdirs();
            try (FileWriter fw = new FileWriter(outFile, StandardCharsets.UTF_8)) {
                fw.write(entry.getValue());
            }
        }
    }

    /**
     * Get file count summary.
     */
    public static String getSummary(Map<String, String> files) {
        long entities = files.keySet().stream().filter(k -> k.contains("/entity/") && !k.contains("BaseEntity")).count();
        long repos = files.keySet().stream().filter(k -> k.contains("/repository/")).count();
        long dtos = files.keySet().stream().filter(k -> k.contains("/dto/")).count();
        long services = files.keySet().stream().filter(k -> k.contains("/service/") && !k.contains("impl")).count();
        long impls = files.keySet().stream().filter(k -> k.contains("/impl/")).count();
        long controllers = files.keySet().stream().filter(k -> k.contains("/controller/")).count();

        return String.format("""
                📦 Génération terminée !
                
                Fichiers générés :
                  • Entités JPA     : %d (+ BaseEntity)
                  • Repositories    : %d
                  • DTOs            : %d
                  • Services        : %d interfaces + %d implémentations
                  • Controllers     : %d
                  • Config          : pom.xml + application.properties
                
                Total : %d fichiers
                """, entities, repos, dtos, services, impls, controllers, files.size());
    }
}
