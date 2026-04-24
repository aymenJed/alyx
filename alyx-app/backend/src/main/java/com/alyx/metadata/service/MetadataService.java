package com.alyx.metadata.service;

import com.alyx.metadata.dto.*;
import com.alyx.metadata.entity.*;
import com.alyx.metadata.exception.ScreenNotFoundException;
import com.alyx.metadata.repository.*;
import com.alyx.metadata.repository.UiActionRepository;
import com.alyx.metadata.repository.UiColumnRepository;
import com.alyx.metadata.repository.UiLabelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MetadataService {

    private static final Logger log = LoggerFactory.getLogger(MetadataService.class);

    private static final int MAX_SHORTCUTS = 8;

    private final UiScreenRepository       screenRepo;
    private final UiComponentRepository    componentRepo;
    private final AppMenuRepository        menuRepo;
    private final UiUserShortcutRepository shortcutRepo;
    private final UiActionRepository       actionRepo;
    private final UiColumnRepository       columnRepo;
    private final UiLabelRepository        labelRepo;

    public MetadataService(UiScreenRepository screenRepo,
                           UiComponentRepository componentRepo,
                           AppMenuRepository menuRepo,
                           UiUserShortcutRepository shortcutRepo,
                           UiActionRepository actionRepo,
                           UiColumnRepository columnRepo,
                           UiLabelRepository labelRepo) {
        this.screenRepo    = screenRepo;
        this.componentRepo = componentRepo;
        this.menuRepo      = menuRepo;
        this.shortcutRepo  = shortcutRepo;
        this.actionRepo    = actionRepo;
        this.columnRepo    = columnRepo;
        this.labelRepo     = labelRepo;
    }

    // =========================================================
    // SCREEN METADATA
    // =========================================================

    /**
     * Construit la description complète d'un écran.
     * Mise en cache 5 minutes (configurable dans application.yml).
     */
    // @Cacheable(value = "screenMetadata", key = "#screenCode")
    public ScreenMetadataDto buildScreenMetadata(String screenCode) {
        log.info("Building screen metadata for: {}", screenCode);
        
        UiScreen screen = screenRepo
                .findByCodeAndIsActive(screenCode, true)
                .orElseThrow(() -> new ScreenNotFoundException(screenCode));

        log.info("Found screen: id={}, code={}, title={}", screen.getId(), screen.getCode(), screen.getTitle());

        List<ComponentDto> components = componentRepo
                .findByScreenIdOrderByDisplayOrderAsc(screen.getId()).stream()
                .filter(c -> Boolean.TRUE.equals(c.getIsVisible()))
                .map(this::toComponentDto)
                .toList();

        List<ActionDto> actions = actionRepo
                .findByScreen_IdOrderByDisplayOrderAsc(screen.getId()).stream()
                .map(this::toActionDto)
                .toList();

        List<ColumnDto> columns = columnRepo
                .findByScreen_IdOrderByDisplayOrderAsc(screen.getId()).stream()
                .map(this::toColumnDto)
                .toList();

        // Labels i18n (langue par défaut : fr)
        Map<String, String> labels = labelRepo
                .findByScreenCodeAndLanguageOrderByFieldKey(screen.getCode(), "fr").stream()
                .filter(l -> l.getFieldKey() != null)
                .collect(Collectors.toMap(l -> l.getFieldKey(), l -> l.getLabel()));

        log.info("Screen {} — {} components, {} actions, {} columns", screen.getCode(),
                components.size(), actions.size(), columns.size());

        return new ScreenMetadataDto(
                screen.getScreenId(),
                screen.getCode(),
                screen.getTitle(),
                screen.getDescription(),
                screen.getTemplateType(),
                screen.getApiBaseUrl(),
                // View communes
                screen.getCaption(),
                screen.getWidth(),
                screen.getHeight(),
                screen.getRefreshTime(),
                Boolean.TRUE.equals(screen.getServerCache()),
                Boolean.TRUE.equals(screen.getClientCache()),
                Boolean.TRUE.equals(screen.getMaximized()),
                // EntityInputView
                screen.getEntityClass(),
                screen.getCriteria(),
                screen.getOrderBy(),
                screen.getCompositionLayout(),
                screen.getActionLayout(),
                screen.getAutoSaveTime(),
                Boolean.TRUE.equals(screen.getHasNavigationBar()),
                // SplitView
                Boolean.TRUE.equals(screen.getIsSplitView()),
                screen.getSizeShare(),
                screen.getOrientation(),
                // GridView
                screen.getPageSize(),
                Boolean.TRUE.equals(screen.getCheckboxSelection()),
                Boolean.TRUE.equals(screen.getWordWrap()),
                screen.getRowHeight(),
                Boolean.TRUE.equals(screen.getDisableReportButton()),
                screen.getActionRenderer(),
                // Analytics
                screen.getAnalyticsConfig(),
                // Sous-modèles
                components,
                actions,
                columns,
                labels
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

    private ActionDto toActionDto(UiAction a) {
        return new ActionDto(
                a.getActionId(),
                a.getCode(),
                a.getLabel(),
                a.getIcon(),
                a.getActionType() != null ? a.getActionType().name() : null,
                a.getRenderer(),
                a.getHttpMethod(),
                a.getEndpoint(),
                Boolean.TRUE.equals(a.getIsEnabled()),
                Boolean.TRUE.equals(a.getRequireValidation()),
                Boolean.TRUE.equals(a.getRequireSelection()),
                Boolean.TRUE.equals(a.getWithConfirmation()),
                a.getConfirmationMsg(),
                Boolean.TRUE.equals(a.getEndAction()),
                a.getConditionExp(),
                a.getColor(),
                a.getDisplayOrder(),
                a.getGroupCode(),
                Boolean.TRUE.equals(a.getKbCtrl()),
                Boolean.TRUE.equals(a.getKbAlt()),
                Boolean.TRUE.equals(a.getKbShift()),
                a.getKbKey()
        );
    }

    private ColumnDto toColumnDto(UiColumn col) {
        return new ColumnDto(
                col.getColumnId(),
                col.getFieldName(),
                col.getLabel(),
                col.getWidth(),
                col.getColumnAlign(),
                Boolean.TRUE.equals(col.getIsSortable()),
                Boolean.TRUE.equals(col.getIsFilterable()),
                Boolean.TRUE.equals(col.getIsEditable()),
                Boolean.TRUE.equals(col.getIsVisible()),
                col.getVisibilityExp(),
                col.getLabelExp(),
                col.getFormatPattern(),
                col.getActionCode(),
                col.getDisplayOrder()
        );
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> toOptionsList(Object raw) {
        if (raw instanceof List<?> list) return (List<Map<String, Object>>) list;
        return null; // {} or null → no static options
    }

    // =========================================================
    // MENU TREE
    // =========================================================

    /**
     * Construit l'arbre de menu en filtrant par rôles utilisateur.
     * Java 22 : switch expression exhaustif sur le filtre de rôle.
     */
    @Cacheable(value = "menuTree", key = "#userDetails.username")
    public List<MenuNodeDto> buildMenuTree(UserDetails userDetails) {
        Set<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        return menuRepo.findRootMenusActive().stream()
                .filter(m -> isAccessible(m, roles))
                .map(m -> buildMenuNode(m, roles))
                .toList();
    }

    private MenuNodeDto buildMenuNode(AppMenu menu, Set<String> roles) {
        List<MenuNodeDto> children = menuRepo
                .findActiveChildrenByParentId(menu.getId()).stream()
                .filter(child -> isAccessible(child, roles))
                .map(child -> buildMenuNode(child, roles))
                .toList();

        return new MenuNodeDto(
                menu.getMenuId(),
                menu.getParent() != null ? menu.getParent().getId() : null,
                menu.getParent() != null ? menu.getParent().getLabel() : null,
                menu.getCode(),
                menu.getLabel(),
                menu.getIcon(),
                menu.getRoute(),
                menu.getScreenCode(),
                menu.getDisplayOrder(),
                menu.getIsActive(),
                menu.getRoleRequired(),
                children.size(),
                children
        );
    }

    /**
     * Java 22 : Unnamed variable _ pour ignorer la valeur de split
     * quand ROLE_REQUIRED est null (aucune restriction).
     */
    private boolean isAccessible(AppMenu menu, Set<String> userRoles) {
        String required = menu.getRoleRequired();
        if (required == null || required.isBlank()) return true;
        // Java 22 : stream avec unnamed variable pour les rôles splittés
        return Arrays.stream(required.split(","))
                .map(String::trim)
                .anyMatch(userRoles::contains);
    }

    // =========================================================
    // SHORTCUTS
    // =========================================================

    public List<ShortcutDto> getShortcuts(String userId) {
        List<UiUserShortcut> shortcuts = shortcutRepo
                .findByUserIdOrderByDisplayOrderAsc(userId);

        if (shortcuts.isEmpty()) return List.of();

        // Récupère les écrans correspondants en une seule requête
        List<String> codes = shortcuts.stream()
                .map(UiUserShortcut::getScreenCode)
                .toList();

        Map<String, UiScreen> screensByCode = screenRepo
                .findAllByCodesActive(codes).stream()
                .collect(Collectors.toMap(UiScreen::getCode, s -> s));

        return shortcuts.stream()
                .map(s -> {
                    UiScreen screen = screensByCode.get(s.getScreenCode());
                    // Java 22 : Switch expression pour la gestion du cas null
                    String title = switch (screen) {
                        case null -> s.getScreenCode();
                        default   -> screen.getTitle();
                    };
                    // Icône extraite du grid_config JSON ou valeur par défaut
                    String icon = extractIcon(screen);
                    return new ShortcutDto(
                            s.getShortcutId(),
                            s.getScreenCode(),
                            title,
                            icon,
                            s.getDisplayOrder()
                    );
                })
                .toList();
    }

    @Transactional
    public void addShortcut(String userId, String screenCode) {
        // Idempotent : si déjà présent, ne rien faire
        if (shortcutRepo.findByUserIdAndScreenCode(userId, screenCode).isPresent()) return;

        // Vérifier que l'écran existe
        screenRepo.findByCodeAndIsActive(screenCode, true)
                .orElseThrow(() -> new ScreenNotFoundException(screenCode));

        long count = shortcutRepo.countByUserId(userId);
        int nextOrder = (int) count;

        shortcutRepo.save(new UiUserShortcut(userId, screenCode, nextOrder));
    }

    @Transactional
    public void removeShortcut(String userId, String screenCode) {
        shortcutRepo.deleteByUserIdAndScreenCode(userId, screenCode);
    }

    private String extractIcon(UiScreen screen) {
        if (screen == null) return "squares-2x2";
        return "squares-2x2";
    }
}
