package com.alyx.profilorganisationnel.repository;

import com.alyx.profilorganisationnel.entity.ProfilOrganisationnel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfilOrgRepository extends JpaRepository<ProfilOrganisationnel, Long> {

    @Query("""
        SELECT p FROM ProfilOrganisationnel p
        WHERE LOWER(p.nomProfil) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(p.organizationUnit) LIKE LOWER(CONCAT('%', :q, '%'))
        """)
    Page<ProfilOrganisationnel> search(@Param("q") String query, Pageable pageable);

    @Query("SELECT p FROM ProfilOrganisationnel p WHERE p.isActive = true ORDER BY p.nomProfil")
    List<ProfilOrganisationnel> findAllActive();
}
