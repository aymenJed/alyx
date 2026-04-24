package com.alyx.metadata.repository;

import com.alyx.metadata.entity.UiScreen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UiScreenRepository extends JpaRepository<UiScreen, Long> {

    Optional<UiScreen> findByCodeAndIsActive(String code, Boolean isActive);

    /**
     * Pour le ShortcutBar : retrouver plusieurs écrans par leurs codes.
     */
    @Query("""
        SELECT s FROM UiScreen s
        WHERE s.code IN :codes
          AND s.isActive = true
        """)
    java.util.List<UiScreen> findAllByCodesActive(@Param("codes") java.util.Collection<String> codes);
}
