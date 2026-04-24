package com.alyx.metadata.designer;

import com.alyx.metadata.designer.dto.*;
import com.alyx.metadata.dto.ActionDto;
import com.alyx.metadata.dto.ColumnDto;
import com.alyx.metadata.dto.ComponentDto;
import com.alyx.metadata.dto.ScreenMetadataDto;
import com.alyx.metadata.entity.TemplateType;
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
import java.util.Map;
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
        if (screenRepo.findByCodeAndIsActive(req.code(), true).isPresent()
                || screenRepo.findByCodeAndIsActive(req.code(), false).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Un écran avec le code [%s] existe déjà".formatted(req.code()));
        }

        UiScreen screen = new UiScreen();
        applyScreenRequest(screen, req.code(), req.title(), req.description(),
                req.templateType(), req.apiBaseUrl(), req.caption(), req.width(),
                req.height(), req.refreshTime(), req.entityClass(), req.criteria(),
                req.orderBy(), req.compositionLayout(), req.actionLayout(),
                req.autoSaveTime(), req.pageSize(), req.analyticsConfig());
        screen.setIsActive(true);

        return toSummaryDto(screenRepo.save(screen));
    }

    @CacheEvict(value = "screenMetadata", key = "#screenId")
    public ScreenMetadataDto updateScreen(Long screenId, UpdateScreenRequest req) {
        UiScreen screen = findScreenOrThrow(screenId);
        applyScreenRequest(screen, screen.getCode(), req.title(), req.description(),
                req.templateType(), req.apiBaseUrl(), req.caption(), req.width(),
                req.height(), req.refreshTime(), req.entityClass(), req.criteria(),
                req.orderBy(), req.compositionLayout(), req.actionLayout(),
                req.autoSaveTime(), req.pageSize(), req.analyticsConfig());
        if (req.isActive() != null) screen.setIsActive(req.isActive() == Boolean.TRUE);
        return toSummaryDto(screenRepo.save(screen));
    }

    @CacheEvict(value = "screenMetadata", allEntries = true)
    public void deleteScreen(Long screenId) {
        UiScreen screen = findScreenOrThrow(screenId);
        screen.setIsActive(false);
        screenRepo.save(screen);
    }

    // =========================================================
    // COMPONENTS — CRUD
    // =========================================================

    @Transactional(readOnly = true)
    public List<ComponentDto> listComponents(Long screenId) {
        findScreenOrThrow(screenId);
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

    @CacheEvict(value = "screenMetadata", key = "#screenId")
    public void reorderComponents(Long screenId, ReorderRequest req) {
        findScreenOrThrow(screenId);
        AtomicInteger order = new AtomicInteger(0);
        req.orderedComponentIds().forEach(compId ->
                componentRepo.findById(compId)
                        .filter(c -> c.getScreen().getId().equals(screenId))
                        .ifPresent(c -> {
                            c.setDisplayOrder(order.getAndAdd(10));
                            componentRepo.save(c);
                        }));
    }

    // =========================================================
    // PRIVATE HELPERS
    // =========================================================

    private void applyScreenRequest(UiScreen screen, String code, String title, String description,
    		TemplateType templateType, String apiBaseUrl, String caption, Long width, Long height,
            Integer refreshTime, String entityClass, String criteria, String orderBy,
            String compositionLayout, String actionLayout, Integer autoSaveTime,
            Integer pageSize, Map<String, Object> analyticsConfig) {
        screen.setCode(code);
        screen.setTitle(title);
        screen.setDescription(description);
        screen.setTemplateType(templateType);
        screen.setApiBaseUrl(apiBaseUrl);
        if (caption != null)          screen.setCaption(caption);
        if (width != null)            screen.setWidth(width);
        if (height != null)           screen.setHeight(height);
        if (refreshTime != null)      screen.setRefreshTime(refreshTime);
        if (entityClass != null)      screen.setEntityClass(entityClass);
        if (criteria != null)         screen.setCriteria(criteria);
        if (orderBy != null)          screen.setOrderBy(orderBy);
        if (compositionLayout != null)screen.setCompositionLayout(compositionLayout);
        if (actionLayout != null)     screen.setActionLayout(actionLayout);
        if (autoSaveTime != null)     screen.setAutoSaveTime(autoSaveTime);
        if (pageSize != null)         screen.setPageSize(pageSize);
        if (analyticsConfig != null)  screen.setAnalyticsConfig(analyticsConfig);
    }

    private void applyRequest(UiComponent comp, SaveComponentRequest req, int order) {
        comp.setFieldKey(req.fieldKey());
        comp.setLabel(req.label());
        comp.setComponentType(req.componentType());
        comp.setPlaceholder(req.placeholder());
        comp.setDefaultValue(req.defaultValue());
        comp.setIsRequired(req.required());
        comp.setIsReadonly(req.readonly());
        comp.setIsVisible(req.visible());
        comp.setIsSortable(req.sortable());
        comp.setIsFilterable(req.filterable());
        comp.setIsGridColumn(req.gridColumn());
        comp.setFireOnChange(req.fireOnChange());
        comp.setVisibilityExp(req.visibilityExp());
        comp.setReadonlyExp(req.readonlyExp());
        comp.setRequireExp(req.requireExp());
        comp.setLabelExp(req.labelExp());
        comp.setOnFireOnChangeExp(req.onFireOnChangeExp());
        comp.setDynamicListDataExp(req.dynamicListDataExp());
        comp.setDisplayOrder(order);
        comp.setGridColSpan(req.gridColSpan());
        comp.setColSpan(req.colSpan());
        comp.setRowSpan(req.rowSpan());
        comp.setValidationRegex(req.validationRegex());
        comp.setValidationMsg(req.validationMsg());
        comp.setMaxLength(req.maxLength());
        comp.setMinValue(req.minValue());
        comp.setMaxValue(req.maxValue());
        comp.setOptionsSource(req.optionsSource());
        comp.setOptionsJson(req.optionsJson());
        comp.setRelatedEntity(req.relatedEntity());
        comp.setDisplayField(req.displayField());
        comp.setFormatPattern(req.formatPattern());
        comp.setDateOnly(req.dateOnly() != null ? req.dateOnly() : true);
        comp.setCaseTransform(req.caseTransform());
        comp.setNbLines(req.nbLines());
    }

    private UiScreen findScreenOrThrow(Long screenId) {
        return screenRepo.findById(screenId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Écran %d introuvable".formatted(screenId)));
    }

    private ScreenMetadataDto toSummaryDto(UiScreen s) {
        return buildDto(s, List.of(), List.of(), List.of(), Map.of());
    }

    private ScreenMetadataDto toFullDto(UiScreen s, List<ComponentDto> components) {
        return buildDto(s, components, List.of(), List.of(), Map.of());
    }

    private ScreenMetadataDto buildDto(UiScreen s, List<ComponentDto> components,
            List<ActionDto> actions, List<ColumnDto> columns, Map<String, String> labels) {
        return new ScreenMetadataDto(
                s.getScreenId(), s.getCode(), s.getTitle(), s.getDescription(),
                s.getTemplateType(), s.getApiBaseUrl(),
                s.getCaption(), s.getWidth(), s.getHeight(), s.getRefreshTime(),
                Boolean.TRUE.equals(s.getServerCache()), Boolean.TRUE.equals(s.getClientCache()), Boolean.TRUE.equals(s.getMaximized()),
                s.getEntityClass(), s.getCriteria(), s.getOrderBy(),
                s.getCompositionLayout(), s.getActionLayout(), s.getAutoSaveTime(),
                Boolean.TRUE.equals(s.getHasNavigationBar()),
                Boolean.TRUE.equals(s.getIsSplitView()), s.getSizeShare(), s.getOrientation(),
                s.getPageSize(), Boolean.TRUE.equals(s.getCheckboxSelection()), Boolean.TRUE.equals(s.getWordWrap()),
                s.getRowHeight(), Boolean.TRUE.equals(s.getDisableReportButton()), s.getActionRenderer(),
                s.getAnalyticsConfig(),
                components, actions, columns, labels
        );
    }

    private ComponentDto toComponentDto(UiComponent c) {
        return new ComponentDto(
                c.getComponentId(), c.getFieldKey(), c.getLabel(), c.getComponentType(),
                c.getPlaceholder(), c.getDefaultValue(),
                Boolean.TRUE.equals(c.getIsRequired()), Boolean.TRUE.equals(c.getIsReadonly()),
                Boolean.TRUE.equals(c.getIsVisible()), Boolean.TRUE.equals(c.getIsSortable()),
                Boolean.TRUE.equals(c.getIsFilterable()), Boolean.TRUE.equals(c.getIsGridColumn()),
                Boolean.TRUE.equals(c.getFireOnChange()),
                c.getVisibilityExp(), c.getReadonlyExp(), c.getRequireExp(),
                c.getLabelExp(), c.getOnFireOnChangeExp(), c.getDynamicListDataExp(),
                c.getDisplayOrder(), c.getGridColSpan(), c.getColSpan(), c.getRowSpan(),
                c.getValidationRegex(), c.getValidationMsg(),
                c.getMaxLength(), c.getMinValue(), c.getMaxValue(),
                c.getOptionsSource(), toOptionsList(c.getOptionsJson()),
                c.getRelatedEntity(), c.getDisplayField(),
                c.getFormatPattern(), c.getDateOnly(), c.getCaseTransform(), c.getNbLines()
        );
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> toOptionsList(Object raw) {
        if (raw instanceof List<?> list) return (List<Map<String, Object>>) list;
        return null;
    }
}
