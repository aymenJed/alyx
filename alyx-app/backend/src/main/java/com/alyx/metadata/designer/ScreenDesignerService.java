package com.alyx.metadata.designer;

import com.alyx.metadata.designer.dto.*;
import com.alyx.metadata.dto.ComponentDto;
import com.alyx.metadata.dto.ScreenMetadataDto;
import com.alyx.metadata.entity.UiComponent;
import com.alyx.metadata.entity.UiScreen;
import com.alyx.metadata.exception.ScreenNotFoundException;
import com.alyx.metadata.repository.UiComponentRepository;
import com.alyx.metadata.repository.UiScreenRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Transactional
public class ScreenDesignerService {

    private final UiScreenRepository    screenRepo;
    private final UiComponentRepository componentRepo;

    public ScreenDesignerService(UiScreenRepository screenRepo,
                                 UiComponentRepository componentRepo) {
        this.screenRepo    = screenRepo;
        this.componentRepo = componentRepo;
    }

    // =========================================================
    // SCREENS — CRUD
    // =========================================================

    @Transactional(readOnly = true)
    public List<ScreenMetadataDto> listAllScreens() {
        return screenRepo.findAll(Sort.by("code")).stream()
                .map(this::toSummaryDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ScreenMetadataDto getScreen(Long screenId) {
        UiScreen screen = findScreenOrThrow(screenId);
        List<ComponentDto> components = componentRepo
                .findByScreenIdOrderByDisplayOrderAsc(screenId).stream()
                .map(this::toComponentDto)
                .toList();
        return toFullDto(screen, components);
    }

    public ScreenMetadataDto createScreen(CreateScreenRequest req) {
        if (screenRepo.findByCodeAndIsActive(req.code(), "Y").isPresent()
                || screenRepo.findByCodeAndIsActive(req.code(), "N").isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Un écran avec le code [%s] existe déjà".formatted(req.code()));
        }

        UiScreen screen = new UiScreen();
        screen.setCode(req.code());
        screen.setTitle(req.title());
        screen.setDescription(req.description());
        screen.setTemplateType(req.templateType());
        screen.setApiBaseUrl(req.apiBaseUrl());
        screen.setPermissions(req.permissions());
        screen.setGridConfig(req.gridConfig());
        screen.setAnalyticsConfig(req.analyticsConfig());
        screen.setIsActive("Y");

        return toSummaryDto(screenRepo.save(screen));
    }

    @CacheEvict(value = "screenMetadata", key = "#screenId")
    public ScreenMetadataDto updateScreen(Long screenId, UpdateScreenRequest req) {
        UiScreen screen = findScreenOrThrow(screenId);
        screen.setTitle(req.title());
        screen.setDescription(req.description());
        screen.setTemplateType(req.templateType());
        screen.setApiBaseUrl(req.apiBaseUrl());
        screen.setPermissions(req.permissions());
        screen.setGridConfig(req.gridConfig());
        screen.setAnalyticsConfig(req.analyticsConfig());
        if (req.isActive() != null) screen.setIsActive(req.isActive());
        return toSummaryDto(screenRepo.save(screen));
    }

    @CacheEvict(value = "screenMetadata", allEntries = true)
    public void deleteScreen(Long screenId) {
        UiScreen screen = findScreenOrThrow(screenId);
        // Soft delete — préserve l'historique
        screen.setIsActive("N");
        screenRepo.save(screen);
    }

    // =========================================================
    // COMPONENTS — CRUD
    // =========================================================

    @Transactional(readOnly = true)
    public List<ComponentDto> listComponents(Long screenId) {
        findScreenOrThrow(screenId); // vérification existence
        return componentRepo.findByScreenIdOrderByDisplayOrderAsc(screenId)
                .stream().map(this::toComponentDto).toList();
    }

    @CacheEvict(value = "screenMetadata", key = "#screenId")
    public ComponentDto addComponent(Long screenId, SaveComponentRequest req) {
        UiScreen screen = findScreenOrThrow(screenId);

        if (componentRepo.existsByScreenIdAndFieldKey(screenId, req.fieldKey())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "La clé [%s] existe déjà pour cet écran".formatted(req.fieldKey()));
        }

        // Calcul de l'ordre d'affichage automatique si non fourni
        long count = componentRepo.countByScreenId(screenId);

        UiComponent comp = new UiComponent();
        comp.setScreen(screen);
        applyRequest(comp, req, (int) (req.displayOrder() > 0 ? req.displayOrder() : count * 10));

        return toComponentDto(componentRepo.save(comp));
    }

    @CacheEvict(value = "screenMetadata", key = "#screenId")
    public ComponentDto updateComponent(Long screenId, Long componentId, SaveComponentRequest req) {
        UiComponent comp = componentRepo.findById(componentId)
                .filter(c -> c.getScreen().getId().equals(screenId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Composant introuvable"));

        // Vérifier unicité du fieldKey si modifié
        if (!comp.getFieldKey().equals(req.fieldKey())
                && componentRepo.existsByScreenIdAndFieldKeyAndIdNot(
                        screenId, req.fieldKey(), componentId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "La clé [%s] est déjà utilisée".formatted(req.fieldKey()));
        }

        applyRequest(comp, req, req.displayOrder());
        return toComponentDto(componentRepo.save(comp));
    }

    @CacheEvict(value = "screenMetadata", key = "#screenId")
    public void deleteComponent(Long screenId, Long componentId) {
        UiComponent comp = componentRepo.findById(componentId)
                .filter(c -> c.getScreen().getId().equals(screenId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Composant introuvable"));
        componentRepo.delete(comp);
    }

    /**
     * Réorganisation après drag & drop : met à jour DISPLAY_ORDER
     * selon la liste ordonnée reçue du frontend.
     */
    @CacheEvict(value = "screenMetadata", key = "#screenId")
    public void reorderComponents(Long screenId, ReorderRequest req) {
        findScreenOrThrow(screenId);
        AtomicInteger order = new AtomicInteger(0);

        req.orderedComponentIds().forEach(compId -> {
            componentRepo.findById(compId)
                    .filter(c -> c.getScreen().getId().equals(screenId))
                    .ifPresent(c -> {
                        c.setDisplayOrder(order.getAndAdd(10));
                        componentRepo.save(c);
                    });
        });
    }

    // =========================================================
    // PRIVATE HELPERS
    // =========================================================

    private void applyRequest(UiComponent comp, SaveComponentRequest req, int order) {
        comp.setFieldKey(req.fieldKey());
        comp.setLabel(req.label());
        comp.setComponentType(req.componentType());
        comp.setPlaceholder(req.placeholder());
        comp.setDefaultValue(req.defaultValue());
        comp.setIsRequired(req.required()    ? "Y" : "N");
        comp.setIsReadonly(req.readonly()    ? "Y" : "N");
        comp.setIsVisible(req.visible()      ? "Y" : "N");
        comp.setIsSortable(req.sortable()    ? "Y" : "N");
        comp.setIsFilterable(req.filterable()? "Y" : "N");
        comp.setIsGridColumn(req.gridColumn()? "Y" : "N");
        comp.setDisplayOrder(order);
        comp.setGridColSpan(req.gridColSpan());
        comp.setValidationRegex(req.validationRegex());
        comp.setValidationMsg(req.validationMsg());
        comp.setOptionsSource(req.optionsSource());
        comp.setOptionsJson(req.optionsJson());
        comp.setVisibilityRule(req.visibilityRule());
        comp.setFormatPattern(req.formatPattern());
    }

    private UiScreen findScreenOrThrow(Long screenId) {
        return screenRepo.findById(screenId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Écran %d introuvable".formatted(screenId)));
    }

    private ScreenMetadataDto toSummaryDto(UiScreen s) {
        return new ScreenMetadataDto(s.getScreenId(), s.getCode(), s.getTitle(),
                s.getDescription(), s.getTemplateType(), s.getApiBaseUrl(),
                s.getPermissions(), s.getGridConfig(), s.getAnalyticsConfig(), List.of());
    }

    private ScreenMetadataDto toFullDto(UiScreen s, List<ComponentDto> components) {
        return new ScreenMetadataDto(s.getScreenId(), s.getCode(), s.getTitle(),
                s.getDescription(), s.getTemplateType(), s.getApiBaseUrl(),
                s.getPermissions(), s.getGridConfig(), s.getAnalyticsConfig(), components);
    }

    private ComponentDto toComponentDto(UiComponent c) {
        return new ComponentDto(
                c.getComponentId(), c.getFieldKey(), c.getLabel(), c.getComponentType(),
                c.getPlaceholder(), c.getDefaultValue(),
                "Y".equals(c.getIsRequired()), "Y".equals(c.getIsReadonly()),
                "Y".equals(c.getIsVisible()), "Y".equals(c.getIsSortable()),
                "Y".equals(c.getIsFilterable()), "Y".equals(c.getIsGridColumn()),
                c.getDisplayOrder(), c.getGridColSpan(),
                c.getValidationRegex(), c.getValidationMsg(),
                c.getOptionsSource(), c.getOptionsJson(),
                c.getVisibilityRule(), c.getFormatPattern());
    }
}
