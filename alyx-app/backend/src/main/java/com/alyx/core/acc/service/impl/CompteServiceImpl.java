package com.alyx.core.acc.service.impl;

import com.alyx.core.acc.dto.CompteDto;
import com.alyx.core.acc.entity.Compte;
import com.alyx.core.acc.repository.CompteRepository;
import com.alyx.core.acc.service.CompteService;
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
    public PagedResponse<CompteDto> findAll(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Compte> result = compteRepository.findAll(pageable);
        Page<CompteDto> dtoPage = result.map(this::toDto);
        return PagedResponse.of(dtoPage);
    }

    @Override
    public CompteDto update(Long id, CompteDto dto) {
        Compte entity = compteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compte not found with id: " + id));
        entity.setAccNumber(dto.getAccNumber());
        Compte updated = compteRepository.save(entity);
        return toDto(updated);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting Compte with id: {}", id);
        compteRepository.deleteById(id);
    }

    private CompteDto toDto(Compte entity) {
        return CompteDto.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .accNumber(entity.getAccNumber())
                .build();
    }

    private Compte toEntity(CompteDto dto) {
        Compte entity = new Compte();
        entity.setAccNumber(dto.getAccNumber());
        return entity;
    }
}
