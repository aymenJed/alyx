package com.example.myapp.service.impl;

import com.example.myapp.dto.ClientDto;
import com.example.myapp.entity.Client;
import com.example.myapp.repository.ClientRepository;
import com.example.myapp.service.ClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<ClientDto> findAll() {
        return clientRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClientDto update(Long id, ClientDto dto) {
        client entity = ClientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
        // TODO: map fields from dto to entity
        Client updated = ClientRepository.save(entity);
        return toDto(updated);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting client with id: {}", id);
        ClientRepository.deleteById(id);
    }

    private clientDto toDto(Client entity) {
        return ClientDto.builder()
                .id(entity.getId())
                // TODO: map fields
                .build();
    }

    private Client toEntity(ClientDto dto) {
        client entity = new Client();
        // TODO: map fields from dto
        return entity;
    }
}
