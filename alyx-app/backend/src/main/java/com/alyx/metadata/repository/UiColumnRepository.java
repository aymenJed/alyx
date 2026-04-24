package com.alyx.metadata.repository;

import com.alyx.metadata.entity.UiColumn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UiColumnRepository extends JpaRepository<UiColumn, Long> {
    List<UiColumn> findByScreen_IdOrderByDisplayOrderAsc(Long screenId);
}
