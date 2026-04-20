package com.example.myapp.service;

import com.example.myapp.dto.ClientDto;

import java.util.List;
import java.util.Optional;

public interface ClientService {

    ClientDto create(ClientDto dto);

    Optional<ClientDto> findById(Long id);

    List<ClientDto> findAll();

    ClientDto update(Long id, ClientDto dto);

    void delete(Long id);
}
