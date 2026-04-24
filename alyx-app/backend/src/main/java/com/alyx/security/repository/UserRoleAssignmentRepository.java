package com.alyx.security.repository;

import com.alyx.security.entity.UserRoleAssignment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRoleAssignmentRepository extends JpaRepository<UserRoleAssignment, Long> {

    Page<UserRoleAssignment> findAll(Pageable pageable);

    @Query("SELECT ura FROM UserRoleAssignment ura WHERE " +
           "LOWER(ura.user.username) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(ura.role.roleName) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<UserRoleAssignment> search(@Param("search") String search, Pageable pageable);

    @Query("SELECT ura FROM UserRoleAssignment ura WHERE ura.user.id = :userId")
    List<UserRoleAssignment> findByUserId(@Param("userId") Long userId);

    @Query("SELECT ura FROM UserRoleAssignment ura WHERE ura.role.id = :roleId")
    List<UserRoleAssignment> findByRoleId(@Param("roleId") Long roleId);

    @Query("SELECT ura FROM UserRoleAssignment ura WHERE ura.user.id = :userId AND ura.role.id = :roleId")
    Optional<UserRoleAssignment> findByUserIdAndRoleId(@Param("userId") Long userId, @Param("roleId") Long roleId);

    boolean existsByUser_IdAndRole_Id(Long userId, Long roleId);

    @Modifying
    @Query("DELETE FROM UserRoleAssignment ura WHERE ura.user.id = :userId AND ura.role.id = :roleId")
    void deleteByUserIdAndRoleId(@Param("userId") Long userId, @Param("roleId") Long roleId);

    @Modifying
    @Query("DELETE FROM UserRoleAssignment ura WHERE ura.user.id = :userId")
    void deleteAllByUserId(@Param("userId") Long userId);

    @Query("SELECT ura.role.roleName FROM UserRoleAssignment ura WHERE ura.user.id = :userId")
    List<String> findRoleNamesByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(ura) FROM UserRoleAssignment ura WHERE ura.role.id = :roleId")
    long countByRoleId(@Param("roleId") Long roleId);
}
