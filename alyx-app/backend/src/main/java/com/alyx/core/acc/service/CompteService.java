package com.alyx.core.acc.service;

import com.alyx.core.acc.dto.CompteDto;
import com.alyx.core.common.PagedResponse;

import java.util.Optional;

public interface CompteService {

    CompteDto create(CompteDto dto);

    Optional<CompteDto> findById(Long id);

    PagedResponse<CompteDto> findAll(int page, int size, String search);

    CompteDto update(Long id, CompteDto dto);

    void delete(Long id);
}
