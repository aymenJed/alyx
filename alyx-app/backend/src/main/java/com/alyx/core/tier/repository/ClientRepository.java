package com.alyx.core.tier.repository;

import com.alyx.common.repository.GenericRepository;
import com.alyx.core.tier.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends GenericRepository<Client, Long> {

    @Query("SELECT c FROM Client c WHERE " +
           "LOWER(c.nom) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Client> search(@Param("search") String search, Pageable pageable);
}
