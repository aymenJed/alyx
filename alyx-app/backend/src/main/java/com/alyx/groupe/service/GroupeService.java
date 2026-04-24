package com.alyx.groupe.service;

import com.alyx.groupe.dto.CreateGroupeRequest;
import com.alyx.groupe.dto.GroupeDto;
import com.alyx.groupe.entity.AppGroup;
import com.alyx.groupe.repository.AppGroupRepository;
import com.alyx.core.common.PagedResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class GroupeService {

    private final AppGroupRepository repo;

    public GroupeService(AppGroupRepository repo) { this.repo = repo; }

    @Transactional(readOnly = true)
    public PagedResponse<GroupeDto> findAll(int page, int size, String search) {
        var pageable = PageRequest.of(page, size, Sort.by("groupName"));
        var p = (search == null || search.isBlank())
            ? repo.findAll(pageable)
            : repo.search(search, pageable);
        return PagedResponse.of(p.map(GroupeDto::from));
    }

    @Transactional(readOnly = true)
    public GroupeDto findById(Long id) {
        return repo.findById(id).map(GroupeDto::from)
            .orElseThrow(() -> new RuntimeException("Groupe introuvable : " + id));
    }

    @Transactional(readOnly = true)
    public List<GroupeDto> findAllActive() {
        return repo.findAllActive().stream().map(GroupeDto::from).toList();
    }

    public GroupeDto create(CreateGroupeRequest req) {
        if (repo.existsByGroupCode(req.groupCode())) {
            throw new RuntimeException("Code groupe déjà utilisé : " + req.groupCode());
        }
        AppGroup g = new AppGroup();
        g.setGroupCode(req.groupCode());
        g.setGroupName(req.groupName());
        g.setDescription(req.description());
        g.setIsActive(req.isActive() != null ? req.isActive() : true);
        if (req.parentGroupId() != null) {
            repo.findById(req.parentGroupId()).ifPresent(g::setParentGroup);
        }
        return GroupeDto.from(repo.save(g));
    }

    public GroupeDto update(Long id, CreateGroupeRequest req) {
        AppGroup g = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Groupe introuvable : " + id));
        g.setGroupName(req.groupName());
        g.setDescription(req.description());
        if (req.isActive() != null) g.setIsActive(req.isActive());
        if (req.parentGroupId() != null) {
            repo.findById(req.parentGroupId()).ifPresent(g::setParentGroup);
        } else {
            g.setParentGroup(null);
        }
        return GroupeDto.from(repo.save(g));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new RuntimeException("Groupe introuvable : " + id);
        repo.deleteById(id);
    }
}
