package com.alyx.metadata.service;

import com.alyx.metadata.dto.*;
import com.alyx.metadata.entity.*;
import com.alyx.metadata.exception.ScreenNotFoundException;
import com.alyx.metadata.repository.*;
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

    public MetadataService(UiScreenRepository screenRepo,
                           UiComponentRepository componentRepo,
                           AppMenuRepository menuRepo,
                           UiUserShortcutRepository shortcutRepo) {
        this.screenRepo   = screenRepo;
        this.componentRepo = componentRepo;
        this.menuRepo     = menuRepo;
        this.shortcutRepo = shortcutRepo;
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
                .findByCodeAndIsActive(screenCode, "Y")
                .orElseThrow(() -> new ScreenNotFoundException(screenCode));

        log.info("Found screen: id={}, code={}, title={}", screen.getId(), screen.getCode(), screen.getTitle());

        List<ComponentDto> components = new ArrayList<>();

        try {
            var rawComponents = componentRepo.findByScreenIdOrderByDisplayOrderAsc(screen.getId());
            log.info("Raw components count: {}", rawComponents.size());
            
            for (var comp : rawComponents) {
                if ("Y".equals(comp.getIsVisible())) {
                    components.add(toComponentDto(comp));
                }
            }
            log.info("Filtered to {} visible components", components.size());
        } catch (Exception e) {
            log.error("Error fetching components: {}", e.getMessage(), e);
            throw e;
        }

        log.info("Creating ScreenMetadataDto...");
        
        return new ScreenMetadataDto(
                screen.getScreenId(),
                screen.getCode(),
                screen.getTitle(),
                screen.getDescription(),
                screen.getTemplateType(),
                screen.getApiBaseUrl(),
                null, // permissions
                null, // gridConfig
                null, // analyticsConfig
                components
        );
    }

    private ComponentDto toComponentDto(UiComponent c) {
        return new ComponentDto(
                c.getComponentId(),
                c.getFieldKey(),
                c.getLabel(),
                c.getComponentType(),
                c.getPlaceholder(),
                c.getDefaultValue(),
                "Y".equals(c.getIsRequired()),
                "Y".equals(c.getIsReadonly()),
                "Y".equals(c.getIsVisible()),
                "Y".equals(c.getIsSortable()),
                "Y".equals(c.getIsFilterable()),
                "Y".equals(c.getIsGridColumn()),
                c.getDisplayOrder(),
                c.getGridColSpan(),
                c.getValidationRegex(),
                c.getValidationMsg(),
                c.getOptionsSource(),
                c.getOptionsJson(),
                c.getVisibilityRule(),
                c.getFormatPattern()
        );
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
        screenRepo.findByCodeAndIsActive(screenCode, "Y")
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
        if (screen == null || screen.getGridConfig() == null) return "squares-2x2";
        Object icon = screen.getGridConfig().get("icon");
        return icon instanceof String s ? s : "squares-2x2";
    }
}
