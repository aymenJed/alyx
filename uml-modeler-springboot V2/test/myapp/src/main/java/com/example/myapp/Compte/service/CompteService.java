package com.example.myapp.service;

import com.example.myapp.dto.CompteDto;

import java.util.List;
import java.util.Optional;

public interface CompteService {

    CompteDto create(CompteDto dto);

    Optional<CompteDto> findById(Long id);

    List<CompteDto> findAll();

    CompteDto update(Long id, CompteDto dto);

    void delete(Long id);
}
