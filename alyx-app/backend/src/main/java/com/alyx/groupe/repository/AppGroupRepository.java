package com.alyx.groupe.repository;

import com.alyx.groupe.entity.AppGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppGroupRepository extends JpaRepository<AppGroup, Long> {

    boolean existsByGroupCode(String groupCode);

    @Query("""
        SELECT g FROM AppGroup g
        WHERE LOWER(g.groupName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(g.groupCode) LIKE LOWER(CONCAT('%', :q, '%'))
        """)
    Page<AppGroup> search(@Param("q") String query, Pageable pageable);

    @Query("SELECT g FROM AppGroup g WHERE g.isActive = true ORDER BY g.groupName")
    List<AppGroup> findAllActive();
}
