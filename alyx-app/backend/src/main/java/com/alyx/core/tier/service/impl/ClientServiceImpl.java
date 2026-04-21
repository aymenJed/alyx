package com.alyx.core.tier.service.impl;

import com.alyx.common.service.GenericServiceImpl;
import com.alyx.core.tier.dto.ClientDto;
import com.alyx.core.tier.entity.Client;
import com.alyx.core.tier.repository.ClientRepository;
import com.alyx.core.tier.service.ClientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class ClientServiceImpl extends GenericServiceImpl<Client, ClientDto, Long> implements ClientService {

    public ClientServiceImpl(ClientRepository repository) {
        super(repository);
    }

    @Override
    protected ClientDto toDto(Client entity) {
        return ClientDto.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .nom(entity.getNom())
                .build();
    }

    @Override
    protected Client toEntity(ClientDto dto) {
        Client entity = new Client();
        entity.setNom(dto.getNom());
        return entity;
    }

    @Override
    protected void applyUpdate(Client entity, ClientDto dto) {
        entity.setNom(dto.getNom());
    }
}
