package com.alyx.metadata.repository;

import com.alyx.metadata.entity.ActionType;
import com.alyx.metadata.entity.UiAction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UiActionRepository extends JpaRepository<UiAction, Long> {
    List<UiAction> findByScreen_IdOrderByDisplayOrderAsc(Long screenId);
    List<UiAction> findByScreen_IdAndActionTypeOrderByDisplayOrderAsc(Long screenId, ActionType actionType);
}
