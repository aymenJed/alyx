package com.umlmodeler.engine;

import com.umlmodeler.model.*;

import java.util.*;
import java.util.stream.Collectors;

public class SpringBootGenerator {

    private final UmlDiagram diagram;
    private final String basePackage;
    private final String projectName;

    public SpringBootGenerator(UmlDiagram diagram, String basePackage, String projectName) {
        this.diagram = diagram;
        this.basePackage = basePackage;
        this.projectName = projectName;
    }

    /**
     * Generates all files for the selected classes.
     * Returns a map of filePath -> fileContent
     */
    public Map<String, String> generate(List<UmlClass> selectedClasses) {
        Map<String, String> files = new LinkedHashMap<>();

        // Generate BaseEntity
       // files.put("src/main/java/" + toPath(basePackage) + "/entity/BaseEntity.java",
                //generateBaseEntity());

        for (UmlClass cls : selectedClasses) {
            String className = capitalize(cls.getName());
            List<UmlRelation> relations = getRelationsFor(cls, selectedClasses);

            String classPkgPath = toPath(getEffectivePkg(cls));

            files.put(classPkgPath + "/entity/" + className + ".java",
                    generateEntity(cls, relations, selectedClasses));

            files.put(classPkgPath + "/repository/" + className + "Repository.java",
                    generateRepository(cls));

            files.put(classPkgPath + "/dto/" + className + "Dto.java",
                    generateDto(cls));

            files.put(classPkgPath + "/service/" + className + "Service.java",
                    generateServiceInterface(cls));

            files.put(classPkgPath + "/service/impl/" + className + "ServiceImpl.java",
                    generateServiceImpl(cls));

            files.put(classPkgPath + "/controller/" + className + "Controller.java",
                    generateController(cls));
        }

        // Generate pom.xml
        //files.put("pom.xml", generatePom());

        // Generate application.properties
        //files.put("src/main/resources/application.properties", generateApplicationProperties());

        // Generate main application class
       // files.put("src/main/java/" + toPath(basePackage) + "/" + capitalize(projectName) + "Application.java",
                //generateMainApplication());

        return files;
    }

    private String generateBaseEntity() {
        return """
                package %s.entity;
                
                import jakarta.persistence.*;
                import lombok.Getter;
                import lombok.Setter;
                import org.springframework.data.annotation.CreatedDate;
                import org.springframework.data.annotation.LastModifiedDate;
                import org.springframework.data.jpa.domain.support.AuditingEntityListener;
                
                import java.time.LocalDateTime;
                
                @Getter
                @Setter
                @MappedSuperclass
                @EntityListeners(AuditingEntityListener.class)
                public abstract class BaseEntity {
                
                    @Id
                    @GeneratedValue(strategy = GenerationType.IDENTITY)
                    private Long id;
                
                    @CreatedDate
                    @Column(name = "created_at", nullable = false, updatable = false)
                    private LocalDateTime createdAt;
                
                    @LastModifiedDate
                    @Column(name = "updated_at")
                    private LocalDateTime updatedAt;
                }
                """.formatted(basePackage);
    }

    private String generateEntity(UmlClass cls, List<UmlRelation> relations, List<UmlClass> allSelected) {
        String className = capitalize(cls.getName());
        String classId = cls.getId();
        StringBuilder sb = new StringBuilder();
        
        sb.append("package ").append(getEffectivePkg(cls)).append(".entity;\n\n");

        // Determine which relations need collections
        Set<String> imports = new LinkedHashSet<>();
        imports.add("import jakarta.persistence.*;");
        imports.add("import lombok.Getter;");
        imports.add("import lombok.Setter;");
        imports.add("import lombok.NoArgsConstructor;");
        imports.add("import lombok.AllArgsConstructor;");
        imports.add("import com.alyx.common.entity.BaseEntity;");

        boolean needsCollections = relations.stream().anyMatch(r -> {
            UmlRelation.JpaRelationship jpa = r.getJpaRelationship(classId);
            return jpa == UmlRelation.JpaRelationship.ONE_TO_MANY
                || jpa == UmlRelation.JpaRelationship.MANY_TO_MANY_OWNER
                || jpa == UmlRelation.JpaRelationship.MANY_TO_MANY_INVERSE;
        });
        if (needsCollections) {
            imports.add("import java.util.List;");
            imports.add("import java.util.ArrayList;");
        }

        // Type imports based on attribute types
        for (UmlAttribute attr : cls.getAttributes()) {
            String javaType = mapJavaType(attr.getType());
            if (javaType.equals("LocalDate"))     imports.add("import java.time.LocalDate;");
            else if (javaType.equals("LocalDateTime")) imports.add("import java.time.LocalDateTime;");
            else if (javaType.equals("BigDecimal"))    imports.add("import java.math.BigDecimal;");
        }

        // Imports for related entity classes (use each class's own effective package)
        for (UmlRelation rel : relations) {
            if (rel.getType() == UmlRelation.RelationType.INHERITANCE
                    || rel.getType() == UmlRelation.RelationType.REALIZATION
                    || rel.getType() == UmlRelation.RelationType.DEPENDENCY) continue;
            String otherId = rel.getOtherClassId(classId);
            allSelected.stream().filter(c -> c.getId().equals(otherId)).findFirst()
                    .ifPresent(other -> {
                        String otherName = capitalize(other.getName());
                        imports.add("import " + getEffectivePkg(other) + ".entity." + otherName + ";");
                    });
        }

        // Check for parent class (inheritance)
        Optional<UmlRelation> inheritanceRel = relations.stream()
                .filter(r -> r.getType() == UmlRelation.RelationType.INHERITANCE
                        && r.getSourceId().equals(classId))
                .findFirst();

        boolean inheritsFromSelected = inheritanceRel.map(r ->
                allSelected.stream().anyMatch(c -> c.getId().equals(r.getTargetId()))
        ).orElse(false);

        for (String imp : imports) sb.append(imp).append("\n");
        sb.append("\n");

        sb.append("@Getter\n@Setter\n@NoArgsConstructor\n@AllArgsConstructor\n");
        sb.append("@Entity\n");
        sb.append("@Table(name = \"").append(toSnakeCase(cls.getName())).append("\")\n");

        sb.append("public class ").append(className);
        if (inheritsFromSelected) {
            String parentId = inheritanceRel.get().getTargetId();
            allSelected.stream().filter(c -> c.getId().equals(parentId)).findFirst()
                    .ifPresent(parent -> sb.append(" extends ").append(capitalize(parent.getName())));
        } else {
            sb.append(" extends BaseEntity");
        }
        sb.append(" {\n\n");

        // Scalar attributes
        for (UmlAttribute attr : cls.getAttributes()) {
            boolean required = false; // Could be extended later
            sb.append("    @Column(name = \"").append(toSnakeCase(attr.getName())).append("\"");
            if (required) sb.append(", nullable = false");
            sb.append(")\n");
            sb.append("    private ").append(mapJavaType(attr.getType())).append(" ")
                    .append(attr.getName()).append(";\n\n");
        }

        // JPA relation fields — driven by semantic JpaRelationship
        for (UmlRelation rel : relations) {
            if (rel.getType() == UmlRelation.RelationType.INHERITANCE
                    || rel.getType() == UmlRelation.RelationType.REALIZATION
                    || rel.getType() == UmlRelation.RelationType.DEPENDENCY) continue;

            String otherId = rel.getOtherClassId(classId);
            Optional<UmlClass> otherOpt = allSelected.stream()
                    .filter(c -> c.getId().equals(otherId)).findFirst();
            if (otherOpt.isEmpty()) continue;

            UmlClass other = otherOpt.get();
            String otherName = capitalize(other.getName());
            String fieldName = decapitalize(other.getName());
            String ownerMapped = decapitalize(cls.getName());
            boolean isComposition = rel.getType() == UmlRelation.RelationType.COMPOSITION;
            boolean targetRequired = rel.getTargetMultiplicity() != null && rel.getTargetMultiplicity().isRequired();
            boolean sourceRequired = rel.getSourceMultiplicity() != null && rel.getSourceMultiplicity().isRequired();

            UmlRelation.JpaRelationship jpa = rel.getJpaRelationship(classId);

            switch (jpa) {
                case ONE_TO_MANY -> {
                    String cascade = isComposition ? ", cascade = CascadeType.ALL, orphanRemoval = true" : "";
                    sb.append("    @OneToMany(mappedBy = \"").append(ownerMapped)
                      .append("\"").append(cascade).append(")\n");
                    sb.append("    private List<").append(otherName).append("> ")
                      .append(fieldName).append("s = new ArrayList<>();\n\n");
                }
                case MANY_TO_ONE -> {
                    boolean opt = !targetRequired;
                    sb.append("    @ManyToOne(fetch = FetchType.LAZY");
                    if (!opt) sb.append(", optional = false");
                    sb.append(")\n");
                    sb.append("    @JoinColumn(name = \"").append(toSnakeCase(otherName)).append("_id\"");
                    if (!opt) sb.append(", nullable = false");
                    sb.append(")\n");
                    sb.append("    private ").append(otherName).append(" ").append(fieldName).append(";\n\n");
                }
                case ONE_TO_ONE_OWNER -> {
                    sb.append("    @OneToOne\n");
                    sb.append("    @JoinColumn(name = \"").append(toSnakeCase(otherName)).append("_id\"");
                    if (targetRequired) sb.append(", nullable = false");
                    sb.append(")\n");
                    sb.append("    private ").append(otherName).append(" ").append(fieldName).append(";\n\n");
                }
                case ONE_TO_ONE_INVERSE -> {
                    sb.append("    @OneToOne(mappedBy = \"").append(decapitalize(cls.getName())).append("\")\n");
                    sb.append("    private ").append(otherName).append(" ").append(fieldName).append(";\n\n");
                }
                case MANY_TO_MANY_OWNER -> {
                    sb.append("    @ManyToMany\n");
                    sb.append("    @JoinTable(name = \"")
                      .append(toSnakeCase(cls.getName())).append("_")
                      .append(toSnakeCase(other.getName())).append("\",\n");
                    sb.append("        joinColumns = @JoinColumn(name = \"")
                      .append(toSnakeCase(cls.getName())).append("_id\"),\n");
                    sb.append("        inverseJoinColumns = @JoinColumn(name = \"")
                      .append(toSnakeCase(other.getName())).append("_id\"))\n");
                    sb.append("    private List<").append(otherName).append("> ")
                      .append(fieldName).append("s = new ArrayList<>();\n\n");
                }
                case MANY_TO_MANY_INVERSE -> {
                    // The inverse side uses mappedBy pointing to the owner's field name
                    sb.append("    @ManyToMany(mappedBy = \"")
                      .append(decapitalize(cls.getName())).append("s\")\n");
                    sb.append("    private List<").append(otherName).append("> ")
                      .append(fieldName).append("s = new ArrayList<>();\n\n");
                }
                case NONE -> {}
            }
        }

        // Custom methods
        for (UmlMethod method : cls.getMethods()) {
            sb.append("    public ").append(mapJavaType(method.getReturnType())).append(" ")
                    .append(method.getName()).append("(");
            sb.append(method.getParameters().stream().collect(Collectors.joining(", ")));
            sb.append(") {\n");
            sb.append("        // TODO: implement\n");
            if (!method.getReturnType().equals("void")) sb.append("        return null;\n");
            sb.append("    }\n\n");
        }

        sb.append("}\n");
        return sb.toString();
    }


    private String generateRepository(UmlClass cls) {
        String className = capitalize(cls.getName());
        return """
                package %s.repository;
                
                import %s.entity.%s;
                import org.springframework.data.jpa.repository.JpaRepository;
                import org.springframework.stereotype.Repository;
                
                import java.util.List;
                import java.util.Optional;
                
                @Repository
                public interface %sRepository extends JpaRepository<%s, Long> {
                
                    // Custom queries can be added here
                    // Example: List<%s> findBy%sContainingIgnoreCase(String keyword);
                }
                """.formatted(getEffectivePkg(cls), getEffectivePkg(cls), className, className, className, className,
                cls.getAttributes().isEmpty() ? "Field" :
                        capitalize(cls.getAttributes().get(0).getName()));
    }

    private String generateDto(UmlClass cls) {
        String className = capitalize(cls.getName());
        StringBuilder sb = new StringBuilder();

        sb.append("package ").append(getEffectivePkg(cls)).append(".dto;\n\n");
        sb.append("import lombok.Builder;\n");
        sb.append("import lombok.Data;\n\n");

        sb.append("import java.time.LocalDateTime;\n");
        for (UmlAttribute attr : cls.getAttributes()) {
            String javaType = mapJavaType(attr.getType());
            if (javaType.equals("LocalDate"))   sb.append("import java.time.LocalDate;\n");
            else if (javaType.equals("BigDecimal")) sb.append("import java.math.BigDecimal;\n");
        }
        sb.append("\n");
        sb.append("/**\n * DTO record used for both Request and Response.\n */\n");
        sb.append("@Data\n@Builder\n");
        sb.append("public class ").append(className).append("Dto {\n\n");
        sb.append("    private Long id;\n");

        for (UmlAttribute attr : cls.getAttributes()) {
            sb.append("    private ").append(mapJavaType(attr.getType())).append(" ")
                    .append(attr.getName()).append(";\n");
        }

        sb.append("\n    private LocalDateTime createdAt;\n");
        sb.append("    private LocalDateTime updatedAt;\n");
        sb.append("}\n");
        return sb.toString();
    }

    private String generateServiceInterface(UmlClass cls) {
        String className = capitalize(cls.getName());
        String pkg = getEffectivePkg(cls);
        return """
                package %s.service;

                import %s.dto.%sDto;
                import com.alyx.core.common.PagedResponse;

                import java.util.Optional;

                public interface %sService {

                    %sDto create(%sDto dto);

                    Optional<%sDto> findById(Long id);

                    PagedResponse<%sDto> findAll(int page, int size, String search);

                    %sDto update(Long id, %sDto dto);

                    void delete(Long id);
                }
                """.formatted(pkg, pkg, className,
                className, className, className, className, className, className, className);
    }

    private String generateServiceImpl(UmlClass cls) {
        String className = capitalize(cls.getName());
        String varName = decapitalize(className);
        String pkg = getEffectivePkg(cls);

        StringBuilder sb = new StringBuilder();
        sb.append("package ").append(pkg).append(".service.impl;\n\n");
        sb.append("import ").append(pkg).append(".dto.").append(className).append("Dto;\n");
        sb.append("import ").append(pkg).append(".entity.").append(className).append(";\n");
        sb.append("import ").append(pkg).append(".repository.").append(className).append("Repository;\n");
        sb.append("import ").append(pkg).append(".service.").append(className).append("Service;\n");
        sb.append("import com.alyx.core.common.PagedResponse;\n");
        sb.append("import lombok.RequiredArgsConstructor;\n");
        sb.append("import lombok.extern.slf4j.Slf4j;\n");
        sb.append("import org.springframework.data.domain.Page;\n");
        sb.append("import org.springframework.data.domain.PageRequest;\n");
        sb.append("import org.springframework.data.domain.Pageable;\n");
        sb.append("import org.springframework.stereotype.Service;\n");
        sb.append("import org.springframework.transaction.annotation.Transactional;\n\n");
        sb.append("import java.util.Optional;\n\n");

        sb.append("@Slf4j\n@Service\n@RequiredArgsConstructor\n@Transactional\n");
        sb.append("public class ").append(className).append("ServiceImpl implements ").append(className).append("Service {\n\n");

        sb.append("    private final ").append(className).append("Repository ").append(varName).append("Repository;\n\n");

        // create
        sb.append("    @Override\n");
        sb.append("    public ").append(className).append("Dto create(").append(className).append("Dto dto) {\n");
        sb.append("        log.info(\"Creating ").append(className).append(": {}\", dto);\n");
        sb.append("        ").append(className).append(" entity = toEntity(dto);\n");
        sb.append("        ").append(className).append(" saved = ").append(varName).append("Repository.save(entity);\n");
        sb.append("        return toDto(saved);\n");
        sb.append("    }\n\n");

        // findById
        sb.append("    @Override\n");
        sb.append("    @Transactional(readOnly = true)\n");
        sb.append("    public Optional<").append(className).append("Dto> findById(Long id) {\n");
        sb.append("        return ").append(varName).append("Repository.findById(id).map(this::toDto);\n");
        sb.append("    }\n\n");

        // findAll with pagination
        sb.append("    @Override\n");
        sb.append("    @Transactional(readOnly = true)\n");
        sb.append("    public PagedResponse<").append(className).append("Dto> findAll(int page, int size, String search) {\n");
        sb.append("        Pageable pageable = PageRequest.of(page, size);\n");
        sb.append("        Page<").append(className).append("> result = ").append(varName).append("Repository.findAll(pageable);\n");
        sb.append("        Page<").append(className).append("Dto> dtoPage = result.map(this::toDto);\n");
        sb.append("        return PagedResponse.of(dtoPage);\n");
        sb.append("    }\n\n");

        // update
        sb.append("    @Override\n");
        sb.append("    public ").append(className).append("Dto update(Long id, ").append(className).append("Dto dto) {\n");
        sb.append("        ").append(className).append(" entity = ").append(varName).append("Repository.findById(id)\n");
        sb.append("                .orElseThrow(() -> new RuntimeException(\"").append(className).append(" not found with id: \" + id));\n");
        for (UmlAttribute attr : cls.getAttributes()) {
            sb.append("        entity.set").append(capitalize(attr.getName()))
              .append("(dto.get").append(capitalize(attr.getName())).append("());\n");
        }
        sb.append("        ").append(className).append(" updated = ").append(varName).append("Repository.save(entity);\n");
        sb.append("        return toDto(updated);\n");
        sb.append("    }\n\n");

        // delete
        sb.append("    @Override\n");
        sb.append("    public void delete(Long id) {\n");
        sb.append("        log.info(\"Deleting ").append(className).append(" with id: {}\", id);\n");
        sb.append("        ").append(varName).append("Repository.deleteById(id);\n");
        sb.append("    }\n\n");

        // toDto — full field mapping
        sb.append("    private ").append(className).append("Dto toDto(").append(className).append(" entity) {\n");
        sb.append("        return ").append(className).append("Dto.builder()\n");
        sb.append("                .id(entity.getId())\n");
        sb.append("                .createdAt(entity.getCreatedAt())\n");
        sb.append("                .updatedAt(entity.getUpdatedAt())\n");
        for (UmlAttribute attr : cls.getAttributes()) {
            sb.append("                .").append(attr.getName())
              .append("(entity.get").append(capitalize(attr.getName())).append("())\n");
        }
        sb.append("                .build();\n");
        sb.append("    }\n\n");

        // toEntity — full field mapping
        sb.append("    private ").append(className).append(" toEntity(").append(className).append("Dto dto) {\n");
        sb.append("        ").append(className).append(" entity = new ").append(className).append("();\n");
        for (UmlAttribute attr : cls.getAttributes()) {
            sb.append("        entity.set").append(capitalize(attr.getName()))
              .append("(dto.get").append(capitalize(attr.getName())).append("());\n");
        }
        sb.append("        return entity;\n");
        sb.append("    }\n");
        sb.append("}\n");
        return sb.toString();
    }

//    private String generateController(UmlClass cls) {
//        String className = capitalize(cls.getName());
//        String varName = decapitalize(className);
//        String path = toSnakeCase(cls.getName()).replace("_", "-");
//        return """
//                package %s.controller;
//                
//                import %s.dto.%sDto;
//                import %s.service.%sService;
//                import lombok.RequiredArgsConstructor;
//                import org.springframework.http.HttpStatus;
//                import org.springframework.http.ResponseEntity;
//                import org.springframework.web.bind.annotation.*;
//                
//                import java.util.List;
//                /**
//					 * CRUD Utilisateurs — consommé par le DataGrid server-driven du frontend.
//					 * GET  /api/v1/%s?page=0&size=20&search=...  → PagedResponse
//					 * GET  /api/v1/%s/{id}                       → %sDto
//					 * POST /api/v1/%s                            → %sDto 
//					 * PUT  /api/v1/%s/{id}                       → %sDto
//					 * PATCH /api/v1/%s/{id}/toggle               → 204
//					 * DELETE /api/v1/%s/{id}                     → 204
//					 */
//                
//                @RestController
//                @RequestMapping("/v1/api/%s")
//                @RequiredArgsConstructor
//                @CrossOrigin(origins = "*")
//                public class %sController {
//                
//                    private final %sService %sService;
//                
//                    @GetMapping
//                    public ResponseEntity<List<%sDto>> getAll() {
//                        return ResponseEntity.ok(%sService.findAll());
//                    }
//                
//                    @GetMapping("/{id}")
//                    public ResponseEntity<%sDto> getById(@PathVariable Long id) {
//                        return %sService.findById(id)
//                                .map(ResponseEntity::ok)
//                                .orElse(ResponseEntity.notFound().build());
//                    }
//                
//                    @PostMapping
//                    public ResponseEntity<%sDto> create(@RequestBody %sDto dto) {
//                        %sDto created = %sService.create(dto);
//                        return ResponseEntity.status(HttpStatus.CREATED).body(created);
//                    }
//                
//                    @PutMapping("/{id}")
//                    public ResponseEntity<%sDto> update(@PathVariable Long id, @RequestBody %sDto dto) {
//                        return ResponseEntity.ok(%sService.update(id, dto));
//                    }
//                
//                    @DeleteMapping("/{id}")
//                    public ResponseEntity<Void> delete(@PathVariable Long id) {
//                        %sService.delete(id);
//                        return ResponseEntity.noContent().build();
//                    }
//                }
//                """.formatted(
//                basePackage+"."+className, basePackage+"."+className, className, basePackage+"."+className,className,className,className,className,className,className,className,className, className,
//                path, className, className, varName,
//                className, varName, className, varName, className, className, varName, varName,
//                className, className, varName, className, varName);
//    }
    
    
    private String generateController(UmlClass cls) {
        String className = capitalize(cls.getName());
        String varName = decapitalize(className);
        String path = toSnakeCase(cls.getName()).replace("_", "-");

        String classPkg = getEffectivePkg(cls);

        return "package " + classPkg + ".controller;\n\n" +
                "import " + classPkg + ".dto." + className + "Dto;\n" +
                "import " + classPkg + ".service." + className + "Service;\n" +
                "import com.alyx.core.common.PagedResponse;\n" +
                "import lombok.RequiredArgsConstructor;\n" +
                "import org.springframework.http.HttpStatus;\n" +
                "import org.springframework.http.ResponseEntity;\n" +
                "import org.springframework.web.bind.annotation.*;\n\n" +
                "/**\n" +
                " * CRUD " + className + " — consommé par le DataGrid server-driven du frontend.\n" +
                " * GET    /api/v1/" + path + "?page=0&size=20&search=...  → PagedResponse\n" +
                " * GET    /api/v1/" + path + "/{id}                       → " + className + "Dto\n" +
                " * POST   /api/v1/" + path + "                            → " + className + "Dto\n" +
                " * PUT    /api/v1/" + path + "/{id}                       → " + className + "Dto\n" +
                " * DELETE /api/v1/" + path + "/{id}                       → 204\n" +
                " */\n\n" +
                "@RestController\n" +
                "@RequestMapping(\"/api/v1/" + path + "\")\n" +
                "@RequiredArgsConstructor\n" +
                "@CrossOrigin(origins = \"*\")\n" +
                "public class " + className + "Controller {\n\n" +
                "    private final " + className + "Service " + varName + "Service;\n\n" +
                "    @GetMapping\n" +
                "    public ResponseEntity<PagedResponse<" + className + "Dto>> findAll(\n" +
                "            @RequestParam(defaultValue = \"0\")  int    page,\n" +
                "            @RequestParam(defaultValue = \"20\") int    size,\n" +
                "            @RequestParam(required = false)    String search) {\n" +
                "        return ResponseEntity.ok(" + varName + "Service.findAll(page, size, search));\n" +
                "    }\n\n" +
                "    @GetMapping(\"/{id}\")\n" +
                "    public ResponseEntity<" + className + "Dto> getById(@PathVariable Long id) {\n" +
                "        return " + varName + "Service.findById(id)\n" +
                "                .map(ResponseEntity::ok)\n" +
                "                .orElse(ResponseEntity.notFound().build());\n" +
                "    }\n\n" +
                "    @PostMapping\n" +
                "    public ResponseEntity<" + className + "Dto> create(@RequestBody " + className + "Dto dto) {\n" +
                "        " + className + "Dto created = " + varName + "Service.create(dto);\n" +
                "        return ResponseEntity.status(HttpStatus.CREATED).body(created);\n" +
                "    }\n\n" +
                "    @PutMapping(\"/{id}\")\n" +
                "    public ResponseEntity<" + className + "Dto> update(@PathVariable Long id, @RequestBody " + className + "Dto dto) {\n" +
                "        return ResponseEntity.ok(" + varName + "Service.update(id, dto));\n" +
                "    }\n\n" +
                "    @DeleteMapping(\"/{id}\")\n" +
                "    public ResponseEntity<Void> delete(@PathVariable Long id) {\n" +
                "        " + varName + "Service.delete(id);\n" +
                "        return ResponseEntity.noContent().build();\n" +
                "    }\n" +
                "}";
    }

    private String generateMainApplication() {
        String appClassName = capitalize(projectName) + "Application";
        return """
                package %s;
                
                import org.springframework.boot.SpringApplication;
                import org.springframework.boot.autoconfigure.SpringBootApplication;
                import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
                
                @SpringBootApplication
                @EnableJpaAuditing
                public class %s {
                
                    public static void main(String[] args) {
                        SpringApplication.run(%s.class, args);
                    }
                }
                """.formatted(basePackage, appClassName, appClassName);
    }

    private String generatePom() {
        return """
                <?xml version="1.0" encoding="UTF-8"?>
                <project xmlns="http://maven.apache.org/POM/4.0.0"
                         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
                    <modelVersion>4.0.0</modelVersion>
                
                    <parent>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-parent</artifactId>
                        <version>3.3.0</version>
                        <relativePath/>
                    </parent>
                
                    <groupId>%s</groupId>
                    <artifactId>%s</artifactId>
                    <version>0.0.1-SNAPSHOT</version>
                    <name>%s</name>
                
                    <properties>
                        <java.version>22</java.version>
                    </properties>
                
                    <dependencies>
                        <dependency>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-starter-web</artifactId>
                        </dependency>
                        <dependency>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-starter-data-jpa</artifactId>
                        </dependency>
                        <dependency>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-starter-validation</artifactId>
                        </dependency>
                        <dependency>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <optional>true</optional>
                        </dependency>
                        <dependency>
                            <groupId>com.h2database</groupId>
                            <artifactId>h2</artifactId>
                            <scope>runtime</scope>
                        </dependency>
                        <!-- Replace with your DB driver as needed -->
                        <!-- <dependency>
                            <groupId>org.postgresql</groupId>
                            <artifactId>postgresql</artifactId>
                            <scope>runtime</scope>
                        </dependency> -->
                        <dependency>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-starter-test</artifactId>
                            <scope>test</scope>
                        </dependency>
                    </dependencies>
                
                    <build>
                        <plugins>
                            <plugin>
                                <groupId>org.springframework.boot</groupId>
                                <artifactId>spring-boot-maven-plugin</artifactId>
                                <configuration>
                                    <excludes>
                                        <exclude>
                                            <groupId>org.projectlombok</groupId>
                                            <artifactId>lombok</artifactId>
                                        </exclude>
                                    </excludes>
                                </configuration>
                            </plugin>
                        </plugins>
                    </build>
                </project>
                """.formatted(basePackage, projectName, projectName);
    }

    private String generateApplicationProperties() {
        return """
                # Application
                spring.application.name=%s
                server.port=8080
                
                # H2 Database (default - replace with your DB)
                spring.datasource.url=jdbc:h2:mem:testdb
                spring.datasource.driver-class-name=org.h2.Driver
                spring.datasource.username=sa
                spring.datasource.password=
                spring.h2.console.enabled=true
                
                # JPA / Hibernate
                spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
                spring.jpa.hibernate.ddl-auto=update
                spring.jpa.show-sql=true
                spring.jpa.properties.hibernate.format_sql=true
                
                # Logging
                logging.level.%s=DEBUG
                """.formatted(projectName, basePackage);
    }

    // --- Utility methods ---

    /**
     * Returns the effective Java package for a class.
     * Uses the class-level packageName if set; otherwise falls back to basePackage.className.
     */
    private String getEffectivePkg(UmlClass cls) {
        String pkg = cls.getPackageName();
        return (pkg != null && !pkg.isBlank()) ? pkg : basePackage + "." + cls.getName().toLowerCase();
    }

    private List<UmlRelation> getRelationsFor(UmlClass cls, List<UmlClass> selectedClasses) {
        Set<String> selectedIds = selectedClasses.stream().map(UmlClass::getId).collect(Collectors.toSet());
        return diagram.getRelations().stream()
                .filter(r -> (r.getSourceId().equals(cls.getId()) || r.getTargetId().equals(cls.getId()))
                        && selectedIds.contains(r.getSourceId()) && selectedIds.contains(r.getTargetId()))
                .toList();
    }

    private String mapJavaType(String umlType) {
        if (umlType == null) return "Object";
        return switch (umlType.toLowerCase().trim()) {
            case "string", "str" -> "String";
            case "int", "integer" -> "Integer";
            case "long" -> "Long";
            case "double" -> "Double";
            case "float" -> "Float";
            case "boolean", "bool" -> "Boolean";
            case "date", "localdate" -> "LocalDate";
            case "datetime", "localdatetime" -> "LocalDateTime";
            case "bigdecimal", "decimal" -> "BigDecimal";
            case "void" -> "void";
            default -> capitalize(umlType);
        };
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    private String decapitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toLowerCase(s.charAt(0)) + s.substring(1);
    }

    private String toSnakeCase(String s) {
        if (s == null) return "";
        return s.replaceAll("([A-Z])", "_$1").toLowerCase().replaceAll("^_", "");
    }

    private String toPath(String packageName) {
        return packageName.replace(".", "/");
    }
}
