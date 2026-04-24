package com.alyx.optionregionale.service;

import com.alyx.optionregionale.dto.CreateOptionRegionaleRequest;
import com.alyx.optionregionale.dto.OptionRegionaleDto;
import com.alyx.optionregionale.entity.OptionRegionale;
import com.alyx.optionregionale.repository.OptionRegionaleRepository;
import com.alyx.core.common.PagedResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OptionRegionaleService {

    private final OptionRegionaleRepository repo;

    public OptionRegionaleService(OptionRegionaleRepository repo) { this.repo = repo; }

    @Transactional(readOnly = true)
    public PagedResponse<OptionRegionaleDto> findAll(int page, int size, String search) {
        var pageable = PageRequest.of(page, size, Sort.by("nom"));
        var p = (search == null || search.isBlank())
            ? repo.findAll(pageable)
            : repo.search(search, pageable);
        return PagedResponse.of(p.map(OptionRegionaleDto::from));
    }

    @Transactional(readOnly = true)
    public OptionRegionaleDto findById(Long id) {
        return repo.findById(id).map(OptionRegionaleDto::from)
            .orElseThrow(() -> new RuntimeException("Option régionale introuvable : " + id));
    }

    @Transactional(readOnly = true)
    public List<OptionRegionaleDto> findAllActive() {
        return repo.findAllActive().stream().map(OptionRegionaleDto::from).toList();
    }

    public OptionRegionaleDto create(CreateOptionRegionaleRequest req) {
        OptionRegionale o = new OptionRegionale();
        applyFields(o, req);
        return OptionRegionaleDto.from(repo.save(o));
    }

    public OptionRegionaleDto update(Long id, CreateOptionRegionaleRequest req) {
        OptionRegionale o = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Option régionale introuvable : " + id));
        applyFields(o, req);
        return OptionRegionaleDto.from(repo.save(o));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new RuntimeException("Option régionale introuvable : " + id);
        repo.deleteById(id);
    }

    private void applyFields(OptionRegionale o, CreateOptionRegionaleRequest req) {
        o.setNom(req.nom());
        o.setLangue(req.langue());
        if (req.formatNombre()       != null) o.setFormatNombre(req.formatNombre());
        if (req.formatDate()         != null) o.setFormatDate(req.formatDate());
        if (req.symboleDecimal()     != null) o.setSymboleDecimal(req.symboleDecimal());
        if (req.symboleGroupement()  != null) o.setSymboleGroupement(req.symboleGroupement());
        if (req.formatHoraire()      != null) o.setFormatHoraire(req.formatHoraire());
        if (req.timezone()           != null) o.setTimezone(req.timezone());
        if (req.isActive()           != null) o.setIsActive(req.isActive());
    }
}
