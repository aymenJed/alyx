package com.alyx.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

@NoRepositoryBean
public interface GenericRepository<T, ID> extends JpaRepository<T, ID> {

    // Already inherited from JpaRepository — declared explicitly for visibility
    Page<T> findAll(Pageable pageable);

    // Each concrete repository must override this with its own @Query
    Page<T> search(@Param("search") String search, Pageable pageable);
}
