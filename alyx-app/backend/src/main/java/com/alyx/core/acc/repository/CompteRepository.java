package com.alyx.core.acc.repository;

import com.alyx.common.repository.GenericRepository;
import com.alyx.core.acc.entity.Compte;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CompteRepository extends GenericRepository<Compte, Long> {

    @Query("SELECT c FROM Compte c WHERE " +
           "LOWER(c.accNumber) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Compte> search(@Param("search") String search, Pageable pageable);
}
