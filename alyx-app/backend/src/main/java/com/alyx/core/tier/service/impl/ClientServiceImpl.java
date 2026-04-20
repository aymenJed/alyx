package com.alyx.core.tier.service.impl;

import com.alyx.core.tier.dto.ClientDto;
import com.alyx.core.tier.entity.Client;
import com.alyx.core.tier.repository.ClientRepository;
import com.alyx.core.tier.service.ClientService;
import com.alyx.core.common.PagedResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    @Override
    public ClientDto create(ClientDto dto) {
        log.info("Creating Client: {}", dto);
        Client entity = toEntity(dto);
        Client saved = clientRepository.save(entity);
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ClientDto> findById(Long id) {
        return clientRepository.findById(id).map(this::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<ClientDto> findAll(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Client> result = clientRepository.findAll(pageable);
        Page<ClientDto> dtoPage = result.map(this::toDto);
        return PagedResponse.of(dtoPage);
    }

    @Override
    public ClientDto update(Long id, ClientDto dto) {
        Client entity = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
        entity.setNom(dto.getNom());
        Client updated = clientRepository.save(entity);
        return toDto(updated);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting Client with id: {}", id);
        clientRepository.deleteById(id);
    }

    private ClientDto toDto(Client entity) {
        return ClientDto.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .nom(entity.getNom())
                .build();
    }

    private Client toEntity(ClientDto dto) {
        Client entity = new Client();
        entity.setNom(dto.getNom());
        return entity;
    }
}
