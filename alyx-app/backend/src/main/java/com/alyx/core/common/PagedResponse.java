package com.alyx.core.common;

import org.springframework.data.domain.Page;
import java.util.List;

/**
 * Réponse paginée générique.
 * Généré automatiquement par Spring Scaffold.
 */
public record PagedResponse<T>(
    List<T> content,
    long    totalElements,
    int     totalPages,
    int     page,
    int     size
) {
    public static <T> PagedResponse<T> of(Page<T> springPage) {
        return new PagedResponse<>(
            springPage.getContent(),
            springPage.getTotalElements(),
            springPage.getTotalPages(),
            springPage.getNumber(),
            springPage.getSize()
        );
    }
}
