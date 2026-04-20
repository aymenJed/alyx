package com.example.myapp.service.impl;

import com.example.myapp.dto.CompteDto;
import com.example.myapp.entity.Compte;
import com.example.myapp.repository.CompteRepository;
import com.example.myapp.service.CompteService;
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
public class CompteServiceImpl implements CompteService {

    private final CompteRepository compteRepository;

    @Override
    public CompteDto create(CompteDto dto) {
        log.info("Creating Compte: {}", dto);
        Compte entity = toEntity(dto);
        Compte saved = compteRepository.save(entity);
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CompteDto> findById(Long id) {
        return compteRepository.findById(id).map(this::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompteDto> findAll() {
        return compteRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CompteDto update(Long id, CompteDto dto) {
        compte entity = CompteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compte not found with id: " + id));
        // TODO: map fields from dto to entity
        Compte updated = CompteRepository.save(entity);
        return toDto(updated);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting compte with id: {}", id);
        CompteRepository.deleteById(id);
    }

    private compteDto toDto(Compte entity) {
        return CompteDto.builder()
                .id(entity.getId())
                // TODO: map fields
                .build();
    }

    private Compte toEntity(CompteDto dto) {
        compte entity = new Compte();
        // TODO: map fields from dto
        return entity;
    }
}
