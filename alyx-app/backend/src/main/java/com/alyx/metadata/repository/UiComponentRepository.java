package com.alyx.metadata.repository;

import com.alyx.metadata.entity.UiComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UiComponentRepository extends JpaRepository<UiComponent, Long> {

    List<UiComponent> findByScreenIdOrderByDisplayOrderAsc(Long screenId);

    Optional<UiComponent> findByScreenIdAndFieldKey(Long screenId, String fieldKey);

    boolean existsByScreenIdAndFieldKey(Long screenId, String fieldKey);

    boolean existsByScreenIdAndFieldKeyAndIdNot(
            Long screenId, String fieldKey, Long componentId);

    long countByScreenId(Long screenId);

    @Modifying
    @Query("DELETE FROM UiComponent c WHERE c.screen.id = :screenId")
    void deleteAllByScreenId(@Param("screenId") Long screenId);
}
