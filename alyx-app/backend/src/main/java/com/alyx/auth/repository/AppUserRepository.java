package com.alyx.auth.repository;

import com.alyx.auth.entity.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsernameAndIsActive(String username, Boolean isActive);
    Optional<AppUser> findByUsername(String username);
    boolean existsByUsername(String username);

    List<AppUser> findByIsActive(Boolean isActive);

    Page<AppUser> findAll(Pageable pageable);

    @Query("SELECT u FROM AppUser u WHERE " +
           "(:search IS NULL OR LOWER(u.fullName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(u.username) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<AppUser> search(@Param("search") String search, Pageable pageable);
}
