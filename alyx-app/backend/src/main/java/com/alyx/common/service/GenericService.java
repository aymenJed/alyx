package com.alyx.common.service;

import com.alyx.core.common.PagedResponse;

import java.util.Optional;

public interface GenericService<D, ID> {
    D create(D dto);
    Optional<D> findById(ID id);
    PagedResponse<D> findAll(int page, int size, String search);
    D update(ID id, D dto);
    void delete(ID id);
}
