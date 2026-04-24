package com.alyx.metadata.repository;

import com.alyx.metadata.entity.UiLabel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UiLabelRepository extends JpaRepository<UiLabel, Long> {

    /** Labels d'écran (fieldKey null) pour une langue donnée */
    Optional<UiLabel> findByScreenCodeAndFieldKeyIsNullAndLanguage(String screenCode, String language);

    /** Labels de tous les champs d'un écran pour une langue donnée */
    List<UiLabel> findByScreenCodeAndLanguageOrderByFieldKey(String screenCode, String language);

    /** Label d'un champ spécifique */
    Optional<UiLabel> findByScreenCodeAndFieldKeyAndLanguage(String screenCode, String fieldKey, String language);
}
