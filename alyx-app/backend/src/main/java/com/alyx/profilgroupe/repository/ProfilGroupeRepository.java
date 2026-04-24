package com.alyx.profilgroupe.repository;

import com.alyx.profilgroupe.entity.ProfilGroupe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfilGroupeRepository extends JpaRepository<ProfilGroupe, Long> {

    @Query("""
        SELECT p FROM ProfilGroupe p
        WHERE LOWER(p.nomProfil) LIKE LOWER(CONCAT('%', :q, '%'))
        """)
    Page<ProfilGroupe> search(@Param("q") String query, Pageable pageable);
}
