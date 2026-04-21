package com.alyx.common.service;

import com.alyx.common.repository.GenericRepository;
import com.alyx.core.common.PagedResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Transactional
public abstract class GenericServiceImpl<T, D, ID> implements GenericService<D, ID> {

    protected final GenericRepository<T, ID> repository;

    protected GenericServiceImpl(GenericRepository<T, ID> repository) {
        this.repository = repository;
    }

    protected abstract D toDto(T entity);
    protected abstract T toEntity(D dto);
    protected abstract void applyUpdate(T entity, D dto);

    @Override
    public D create(D dto) {
        log.info("Creating entity from dto: {}", dto);
        return toDto(repository.save(toEntity(dto)));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<D> findById(ID id) {
        return repository.findById(id).map(this::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<D> findAll(int page, int size, String search) {
        var pageable = PageRequest.of(page, size);
        var result = (search != null && !search.isBlank())
                ? repository.search(search, pageable)
                : repository.findAll(pageable);
        return PagedResponse.of(result.map(this::toDto));
    }

    @Override
    public D update(ID id, D dto) {
        T entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found: " + id));
        applyUpdate(entity, dto);
        return toDto(repository.save(entity));
    }

    @Override
    public void delete(ID id) {
        log.info("Deleting entity with id: {}", id);
        repository.deleteById(id);
    }
}
