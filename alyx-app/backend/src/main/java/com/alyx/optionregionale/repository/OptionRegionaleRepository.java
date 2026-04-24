package com.alyx.optionregionale.repository;

import com.alyx.optionregionale.entity.OptionRegionale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OptionRegionaleRepository extends JpaRepository<OptionRegionale, Long> {

    @Query("SELECT o FROM OptionRegionale o WHERE LOWER(o.nom) LIKE LOWER(CONCAT('%', :q, '%'))")
    Page<OptionRegionale> search(@Param("q") String query, Pageable pageable);

    @Query("SELECT o FROM OptionRegionale o WHERE o.isActive = true ORDER BY o.nom")
    List<OptionRegionale> findAllActive();
}
