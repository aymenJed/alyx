package com.alyx.profilorganisationnel.service;

import com.alyx.profilorganisationnel.dto.CreateProfilOrgRequest;
import com.alyx.profilorganisationnel.dto.ProfilOrgDto;
import com.alyx.profilorganisationnel.entity.ProfilOrganisationnel;
import com.alyx.profilorganisationnel.repository.ProfilOrgRepository;
import com.alyx.core.common.PagedResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProfilOrgService {

    private final ProfilOrgRepository repo;

    public ProfilOrgService(ProfilOrgRepository repo) { this.repo = repo; }

    @Transactional(readOnly = true)
    public PagedResponse<ProfilOrgDto> findAll(int page, int size, String search) {
        var pageable = PageRequest.of(page, size, Sort.by("nomProfil"));
        var p = (search == null || search.isBlank())
            ? repo.findAll(pageable)
            : repo.search(search, pageable);
        return PagedResponse.of(p.map(ProfilOrgDto::from));
    }

    @Transactional(readOnly = true)
    public ProfilOrgDto findById(Long id) {
        return repo.findById(id).map(ProfilOrgDto::from)
            .orElseThrow(() -> new RuntimeException("Profil organisationnel introuvable : " + id));
    }

    @Transactional(readOnly = true)
    public List<ProfilOrgDto> findAllActive() {
        return repo.findAllActive().stream().map(ProfilOrgDto::from).toList();
    }

    public ProfilOrgDto create(CreateProfilOrgRequest req) {
        ProfilOrganisationnel p = new ProfilOrganisationnel();
        applyFields(p, req);
        return ProfilOrgDto.from(repo.save(p));
    }

    public ProfilOrgDto update(Long id, CreateProfilOrgRequest req) {
        ProfilOrganisationnel p = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Profil organisationnel introuvable : " + id));
        applyFields(p, req);
        return ProfilOrgDto.from(repo.save(p));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new RuntimeException("Profil organisationnel introuvable : " + id);
        repo.deleteById(id);
    }

    private void applyFields(ProfilOrganisationnel p, CreateProfilOrgRequest req) {
        p.setNomProfil(req.nomProfil());
        p.setOrganizationUnit(req.organizationUnit());
        p.setMainEntity(req.mainEntity());
        p.setDescription(req.description());
        if (req.isActive() != null) p.setIsActive(req.isActive());
    }
}
