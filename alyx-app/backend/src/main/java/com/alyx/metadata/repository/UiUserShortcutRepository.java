package com.alyx.metadata.repository;

import com.alyx.metadata.entity.UiUserShortcut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UiUserShortcutRepository extends JpaRepository<UiUserShortcut, Long> {

    List<UiUserShortcut> findByUserIdOrderByDisplayOrderAsc(String userId);

    Optional<UiUserShortcut> findByUserIdAndScreenCode(String userId, String screenCode);

    void deleteByUserIdAndScreenCode(String userId, String screenCode);

    long countByUserId(String userId);
}
