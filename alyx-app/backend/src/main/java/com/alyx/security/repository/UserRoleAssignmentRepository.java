package com.alyx.security.repository;

import com.alyx.security.entity.UserRoleAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRoleAssignmentRepository extends JpaRepository<UserRoleAssignment, Long> {

    List<UserRoleAssignment> findByUserId(Long userId);

    List<UserRoleAssignment> findByRoleId(Long roleId);

    Optional<UserRoleAssignment> findByUserIdAndRoleId(Long userId, Long roleId);

    boolean existsByUserIdAndRoleId(Long userId, Long roleId);

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
