package com.alyx.core.tier.service;

import com.alyx.core.tier.dto.ClientDto;
import com.alyx.core.common.PagedResponse;

import java.util.Optional;

public interface ClientService {

    ClientDto create(ClientDto dto);

    Optional<ClientDto> findById(Long id);

    PagedResponse<ClientDto> findAll(int page, int size, String search);

    ClientDto update(Long id, ClientDto dto);

    void delete(Long id);
}
