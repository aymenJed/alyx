package com.alyx.security.repository;

import com.alyx.security.entity.RoleScreenAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleScreenAccessRepository extends JpaRepository<RoleScreenAccess, Long> {

    List<RoleScreenAccess> findByRoleIdAndIsActive(Long roleId, String isActive);

    List<RoleScreenAccess> findByRoleRoleNameAndIsActive(String roleName, String isActive);

    Optional<RoleScreenAccess> findByRoleIdAndScreenId(Long roleId, Long screenId);

    @Query("SELECT rsa FROM RoleScreenAccess rsa JOIN FETCH rsa.screen WHERE rsa.role.id = :roleId AND rsa.isActive = 'Y'")
    List<RoleScreenAccess> findActiveAccessesByRoleId(@Param("roleId") Long roleId);

    @Modifying
    @Query("DELETE FROM RoleScreenAccess rsa WHERE rsa.role.id = :roleId AND rsa.screen.id = :screenId")
    void deleteByRoleIdAndScreenId(@Param("roleId") Long roleId, @Param("screenId") Long screenId);

    @Query("SELECT CASE WHEN COUNT(rsa) > 0 THEN true ELSE false END FROM RoleScreenAccess rsa WHERE rsa.role.id = :roleId AND rsa.screen.code = :screenCode AND rsa.isActive = 'Y'")
    boolean existsByRoleIdAndScreenCode(@Param("roleId") Long roleId, @Param("screenCode") String screenCode);
}
