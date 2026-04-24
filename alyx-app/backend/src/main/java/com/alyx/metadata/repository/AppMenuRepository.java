package com.alyx.metadata.repository;

import com.alyx.metadata.entity.AppMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppMenuRepository extends JpaRepository<AppMenu, Long> {

    Optional<AppMenu> findByCode(String code);

    boolean existsByCode(String code);

    /**
     * Menus racines actifs, ordonnés.
     * Le filtre sur ROLE_REQUIRED est fait en Java pour simplifier
     * la query JPQL (éviter le parsing CSV en SQL).
     */
    @Query("""
        SELECT m FROM AppMenu m
        WHERE m.parent IS NULL
          AND m.isActive = true
        ORDER BY m.displayOrder ASC
        """)
    List<AppMenu> findRootMenusActive();

    /**
     * Enfants directs d'un menu parent, actifs.
     */
    @Query("""
        SELECT m FROM AppMenu m
        WHERE m.parent.id = :parentId
          AND m.isActive = true
        ORDER BY m.displayOrder ASC
        """)
    List<AppMenu> findActiveChildrenByParentId(@Param("parentId") Long parentId);
}
