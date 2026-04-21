package com.alyx.core.acc.service.impl;

import com.alyx.common.service.GenericServiceImpl;
import com.alyx.core.acc.dto.CompteDto;
import com.alyx.core.acc.entity.Compte;
import com.alyx.core.acc.repository.CompteRepository;
import com.alyx.core.acc.service.CompteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class CompteServiceImpl extends GenericServiceImpl<Compte, CompteDto, Long> implements CompteService {

    public CompteServiceImpl(CompteRepository repository) {
        super(repository);
    }

    @Override
    protected CompteDto toDto(Compte entity) {
        return CompteDto.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .accNumber(entity.getAccNumber())
                .build();
    }

    @Override
    protected Compte toEntity(CompteDto dto) {
        Compte entity = new Compte();
        entity.setAccNumber(dto.getAccNumber());
        return entity;
    }

    @Override
    protected void applyUpdate(Compte entity, CompteDto dto) {
        entity.setAccNumber(dto.getAccNumber());
    }
}
