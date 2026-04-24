package com.alyx.security.repository;

import com.alyx.security.entity.Role;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Page<Role> findAll(Pageable pageable);

    @Query("SELECT r FROM Role r WHERE r.isActive = true AND " +
    	       "(LOWER(r.roleName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
    	       "LOWER(r.roleDescription) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
    	       "LOWER(r.roleType) LIKE LOWER(CONCAT('%', :search, '%')))")
    	Page<Role> search(@Param("search") String search, Pageable pageable);
    
    
    Optional<Role> findByRoleName(String roleName);

    List<Role> findByIsActiveOrderByRoleNameAsc(Boolean isActive);

    @Query("SELECT r FROM Role r LEFT JOIN FETCH r.screenAccesses WHERE r.id = :id")
    Optional<Role> findByIdWithScreenAccesses(@Param("id") Long id);

    @Query("SELECT DISTINCT r FROM Role r LEFT JOIN FETCH r.screenAccesses sa LEFT JOIN FETCH sa.screen WHERE r.isActive = true")
    List<Role> findAllActiveWithScreenAccesses();

    boolean existsByRoleName(String roleName);
}
