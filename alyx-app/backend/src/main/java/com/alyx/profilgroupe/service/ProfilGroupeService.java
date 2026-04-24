package com.alyx.profilgroupe.service;

import com.alyx.profilgroupe.dto.CreateProfilGroupeRequest;
import com.alyx.profilgroupe.dto.ProfilGroupeDto;
import com.alyx.profilgroupe.entity.ProfilGroupe;
import com.alyx.groupe.repository.AppGroupRepository;
import com.alyx.optionregionale.repository.OptionRegionaleRepository;
import com.alyx.profilgroupe.repository.ProfilGroupeRepository;
import com.alyx.profilorganisationnel.repository.ProfilOrgRepository;
import com.alyx.core.common.PagedResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProfilGroupeService {

    private final ProfilGroupeRepository     repo;
    private final AppGroupRepository         groupRepo;
    private final ProfilOrgRepository        profilOrgRepo;
    private final OptionRegionaleRepository  optionRepo;

    public ProfilGroupeService(ProfilGroupeRepository repo,
                               AppGroupRepository groupRepo,
                               ProfilOrgRepository profilOrgRepo,
                               OptionRegionaleRepository optionRepo) {
        this.repo          = repo;
        this.groupRepo     = groupRepo;
        this.profilOrgRepo = profilOrgRepo;
        this.optionRepo    = optionRepo;
    }

    @Transactional(readOnly = true)
    public PagedResponse<ProfilGroupeDto> findAll(int page, int size, String search) {
        var pageable = PageRequest.of(page, size, Sort.by("nomProfil"));
        var p = (search == null || search.isBlank())
            ? repo.findAll(pageable)
            : repo.search(search, pageable);
        return PagedResponse.of(p.map(ProfilGroupeDto::from));
    }

    @Transactional(readOnly = true)
    public ProfilGroupeDto findById(Long id) {
        return repo.findById(id).map(ProfilGroupeDto::from)
            .orElseThrow(() -> new RuntimeException("Profil groupe introuvable : " + id));
    }

    public ProfilGroupeDto create(CreateProfilGroupeRequest req) {
        ProfilGroupe pg = new ProfilGroupe();
        applyFields(pg, req);
        return ProfilGroupeDto.from(repo.save(pg));
    }

    public ProfilGroupeDto update(Long id, CreateProfilGroupeRequest req) {
        ProfilGroupe pg = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Profil groupe introuvable : " + id));
        applyFields(pg, req);
        return ProfilGroupeDto.from(repo.save(pg));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new RuntimeException("Profil groupe introuvable : " + id);
        repo.deleteById(id);
    }

    private void applyFields(ProfilGroupe pg, CreateProfilGroupeRequest req) {
        pg.setNomProfil(req.nomProfil());
        pg.setConditionConnexion(req.conditionConnexion());
        pg.setHabilitation(req.habilitation());
        if (req.isActive() != null) pg.setIsActive(req.isActive());
        if (req.groupeId()           != null) groupRepo.findById(req.groupeId()).ifPresent(pg::setGroupe);
        if (req.profilOrgId()        != null) profilOrgRepo.findById(req.profilOrgId()).ifPresent(pg::setProfilOrg);
        if (req.optionRegionaleId()  != null) optionRepo.findById(req.optionRegionaleId()).ifPresent(pg::setOptionRegionale);
    }
}
