package com.alyx.data.service.impl;

import com.alyx.core.common.PagedResponse;
import com.alyx.data.dto.DataQuery;
import com.alyx.data.service.DataService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.metamodel.EntityType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.time.temporal.Temporal;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Implémentation générique Metadata-Driven basée sur l'{@link EntityManager} JPA.
 * <p>
 * Conforme aux principes SOA : ce service est sans état, découplé de tout
 * contrôleur spécifique, et interroge dynamiquement n'importe quelle entité
 * JPA du domaine {@code com.alyx.*}.
 * <p>
 * Sécurité : seules les classes dont le FQCN commence par un des packages
 * de la liste blanche {@link #ALLOWED_PACKAGES} peuvent être chargées,
 * et la classe doit être enregistrée comme entité JPA dans le {@code Metamodel}.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class DataServiceImpl implements DataService {

    /** Packages autorisés — sécurisation contre le chargement arbitraire de classes. */
    private static final String[] ALLOWED_PACKAGES = { "com.alyx." };

    /** Pattern anti-injection JPQL pour les noms de champs. */
    private static final Pattern SAFE_FIELD = Pattern.compile("^[A-Za-z_][A-Za-z0-9_.]*$");

    @PersistenceContext
    private EntityManager em;

    // =========================================================
    // API publique
    // =========================================================

    @Override
    public PagedResponse<Map<String, Object>> findAll(DataQuery q) {
        Class<?> entityClass = resolveEntity(q.entityClass());
        String entityName = entityClass.getSimpleName();

        // -------- JPQL data query --------
        StringBuilder jpql = new StringBuilder("SELECT e FROM ").append(entityName).append(" e");

        // Recherche libre : LIKE sur les colonnes String (contenant "nom" ou "code" ou "label")
        List<String> stringFields = collectSearchableFields(entityClass);
        if (q.search() != null && !q.search().isBlank() && !stringFields.isEmpty()) {
            jpql.append(" WHERE ");
            for (int i = 0; i < stringFields.size(); i++) {
                if (i > 0) jpql.append(" OR ");
                jpql.append("LOWER(e.").append(stringFields.get(i))
                    .append(") LIKE LOWER(CONCAT('%', :search, '%'))");
            }
        }

        if (q.sort() != null && !q.sort().isBlank()) {
            String[] parts = q.sort().split(",");
            String field = sanitizeField(parts[0]);
            String dir   = parts.length > 1 && "desc".equalsIgnoreCase(parts[1]) ? "DESC" : "ASC";
            if (field != null) {
                jpql.append(" ORDER BY e.").append(field).append(' ').append(dir);
            }
        }

        TypedQuery<?> query = em.createQuery(jpql.toString(), entityClass);
        if (q.search() != null && !q.search().isBlank() && !stringFields.isEmpty()) {
            query.setParameter("search", q.search().trim());
        }
        query.setFirstResult(q.page() * q.size());
        query.setMaxResults(q.size());
        List<?> data = query.getResultList();

        // -------- Count query --------
        StringBuilder count = new StringBuilder("SELECT COUNT(e) FROM ").append(entityName).append(" e");
        if (q.search() != null && !q.search().isBlank() && !stringFields.isEmpty()) {
            count.append(" WHERE ");
            for (int i = 0; i < stringFields.size(); i++) {
                if (i > 0) count.append(" OR ");
                count.append("LOWER(e.").append(stringFields.get(i))
                     .append(") LIKE LOWER(CONCAT('%', :search, '%'))");
            }
        }
        TypedQuery<Long> countQ = em.createQuery(count.toString(), Long.class);
        if (q.search() != null && !q.search().isBlank() && !stringFields.isEmpty()) {
            countQ.setParameter("search", q.search().trim());
        }
        Long total = countQ.getSingleResult();
        int totalPages = q.size() > 0 ? (int) Math.ceil((double) total / q.size()) : 0;

        // -------- Projection en Map<String, Object> --------
        List<Map<String, Object>> content = data.stream()
                .map(this::toFlatMap)
                .toList();

        log.debug("DataService.findAll({}) → {} éléments (page {}/{}, size {})",
                entityName, content.size(), q.page() + 1, totalPages, q.size());

        return new PagedResponse<>(content, total, totalPages, q.page(), q.size());
    }

    @Override
    public Map<String, Object> findById(String entityClassName, Long id) {
        Class<?> entityClass = resolveEntity(entityClassName);
        Object entity = em.find(entityClass, id);
        if (entity == null) {
            throw new EntityNotFoundException(entityClass.getSimpleName() + " id=" + id);
        }
        return toFlatMap(entity);
    }

    // =========================================================
    // Résolution sécurisée de la classe
    // =========================================================

    private Class<?> resolveEntity(String fqcn) {
        boolean allowed = Arrays.stream(ALLOWED_PACKAGES).anyMatch(fqcn::startsWith);
        if (!allowed) {
            throw new IllegalArgumentException("Classe non autorisée (hors whitelist): " + fqcn);
        }
        Class<?> clazz;
        try {
            clazz = Class.forName(fqcn);
        } catch (ClassNotFoundException e) {
            throw new IllegalArgumentException("Classe introuvable: " + fqcn, e);
        }
        boolean isJpaEntity = em.getMetamodel().getEntities().stream()
                .map(EntityType::getJavaType)
                .anyMatch(clazz::equals);
        if (!isJpaEntity) {
            throw new IllegalArgumentException("La classe n'est pas une entité JPA: " + fqcn);
        }
        return clazz;
    }

    private String sanitizeField(String raw) {
        if (raw == null) return null;
        String trimmed = raw.trim();
        return SAFE_FIELD.matcher(trimmed).matches() ? trimmed : null;
    }

    // =========================================================
    // Introspection & projection
    // =========================================================

    /**
     * Sélectionne les champs String candidats à la recherche libre
     * (uniquement les champs persistants scalaires).
     */
    private List<String> collectSearchableFields(Class<?> clazz) {
        List<String> fields = new java.util.ArrayList<>();
        Class<?> current = clazz;
        while (current != null && current != Object.class) {
            for (Field f : current.getDeclaredFields()) {
                if (Modifier.isStatic(f.getModifiers())) continue;
                if (f.getType() != String.class) continue;
                if (f.isAnnotationPresent(jakarta.persistence.Transient.class)) continue;
                if (f.isAnnotationPresent(jakarta.persistence.ManyToOne.class))   continue;
                if (f.isAnnotationPresent(jakarta.persistence.OneToMany.class))   continue;
                if (f.isAnnotationPresent(jakarta.persistence.ManyToMany.class))  continue;
                fields.add(f.getName());
            }
            current = current.getSuperclass();
        }
        return fields;
    }

    /**
     * Projette une entité JPA en Map clé/valeur des champs scalaires.
     * <ul>
     *   <li>Champs primitifs / String / Date / Temporal / Enum → valeur brute</li>
     *   <li>Relations {@code @ManyToOne} → {@code <fieldName>Id} (PK uniquement)</li>
     *   <li>Collections {@code @OneToMany} / {@code @ManyToMany} → ignorées</li>
     * </ul>
     * Évite les cycles de sérialisation et les LazyInitializationException.
     */
    private Map<String, Object> toFlatMap(Object entity) {
        Map<String, Object> map = new LinkedHashMap<>();
        collectFields(entity.getClass(), entity, map);
        return map;
    }

    private void collectFields(Class<?> clazz, Object entity, Map<String, Object> map) {
        if (clazz == null || clazz == Object.class) return;
        // On remonte dans la hiérarchie pour récupérer les champs de BaseEntity (id, createdAt, ...)
        collectFields(clazz.getSuperclass(), entity, map);

        for (Field f : clazz.getDeclaredFields()) {
            if (Modifier.isStatic(f.getModifiers())) continue;
            if (f.isAnnotationPresent(jakarta.persistence.Transient.class))    continue;
            if (f.isAnnotationPresent(jakarta.persistence.OneToMany.class))    continue;
            if (f.isAnnotationPresent(jakarta.persistence.ManyToMany.class))   continue;

            f.setAccessible(true);
            Object value;
            try {
                value = f.get(entity);
            } catch (IllegalAccessException ex) {
                log.warn("Lecture du champ {} impossible: {}", f.getName(), ex.getMessage());
                continue;
            }
            if (value == null) { map.put(f.getName(), null); continue; }

            // Relation ManyToOne : exposer uniquement l'id (évite lazy init)
            if (f.isAnnotationPresent(jakarta.persistence.ManyToOne.class)
                    || f.isAnnotationPresent(jakarta.persistence.OneToOne.class)) {
                map.put(f.getName() + "Id", extractPrimaryKey(value));
                continue;
            }

            // Scalaires
            if (value instanceof Number
                    || value instanceof CharSequence
                    || value instanceof Boolean
                    || value instanceof java.util.Date
                    || value instanceof Temporal
                    || value instanceof Enum<?>) {
                map.put(f.getName(), value);
            } else {
                map.put(f.getName(), value.toString());
            }
        }
    }

    private Object extractPrimaryKey(Object entity) {
        Class<?> c = entity.getClass();
        while (c != null && c != Object.class) {
            for (Field f : c.getDeclaredFields()) {
                if (f.isAnnotationPresent(jakarta.persistence.Id.class)) {
                    f.setAccessible(true);
                    try { return f.get(entity); }
                    catch (IllegalAccessException ignored) { return null; }
                }
            }
            c = c.getSuperclass();
        }
        return null;
    }
}
