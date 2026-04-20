package com.alyx.metadata.service;

import com.alyx.metadata.dto.CreateMenuRequest;
import com.alyx.metadata.dto.MenuItemDto;
import com.alyx.metadata.dto.MenuOptionDto;
import com.alyx.metadata.dto.MenuOptionsDto;
import com.alyx.metadata.dto.UpdateMenuRequest;
import com.alyx.metadata.entity.AppMenu;
import com.alyx.metadata.entity.UiScreen;
import com.alyx.metadata.repository.AppMenuRepository;
import com.alyx.metadata.repository.UiScreenRepository;
import com.alyx.security.repository.RoleRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MenuManagementService {

    private final AppMenuRepository menuRepository;
    private final UiScreenRepository screenRepository;
    private final RoleRepository roleRepository;

    public MenuManagementService(AppMenuRepository menuRepository,
                                UiScreenRepository screenRepository,
                                RoleRepository roleRepository) {
        this.menuRepository = menuRepository;
        this.screenRepository = screenRepository;
        this.roleRepository = roleRepository;
    }

    @Cacheable(value = "menus", key = "'all_menus_tree'")
    public List<MenuItemDto> getMenuTree() {
        List<AppMenu> allMenus = menuRepository.findAll();
        Map<Long, List<AppMenu>> childrenByParentId = allMenus.stream()
                .filter(m -> m.getParent() != null)
                .collect(Collectors.groupingBy(m -> m.getParent().getId()));

        return allMenus.stream()
                .filter(m -> m.getParent() == null)
                .map(m -> toDtoWithChildren(m, childrenByParentId))
                .toList();
    }

    @Cacheable(value = "menus", key = "'all_menus_flat'")
    public List<MenuItemDto> getAllMenus() {
        List<AppMenu> menus = menuRepository.findAll();
        Map<Long, String> parentLabels = menus.stream()
                .filter(m -> m.getParent() != null)
                .collect(Collectors.toMap(
                        m -> m.getParent().getId(),
                        AppMenu::getLabel,
                        (a, b) -> a
                ));

        return menus.stream()
                .map(m -> toDto(m, parentLabels))
                .toList();
    }

    @Transactional(readOnly = true)
    public MenuItemDto getMenuById(Long id) {
        AppMenu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));
        return toDto(menu, Map.of());
    }

    @Cacheable(value = "menus", key = "'menu_options'")
    public MenuOptionsDto getMenuOptions() {
        List<AppMenu> menus = menuRepository.findAll();

        List<MenuOptionDto> availableParents = menus.stream()
                .filter(m -> "Y".equals(m.getIsActive()))
                .map(m -> new MenuOptionDto(m.getId(), m.getCode(), m.getLabel(), "menu"))
                .toList();

        List<UiScreen> screens = screenRepository.findAll();
        List<MenuOptionDto> availableScreens = screens.stream()
                .filter(s -> "Y".equals(s.getIsActive()))
                .map(s -> new MenuOptionDto(s.getScreenId(), s.getCode(), s.getTitle(), "screen"))
                .toList();

        List<MenuOptionDto> availableRoles = roleRepository.findByIsActiveOrderByRoleNameAsc("Y").stream()
                .map(r -> new MenuOptionDto(r.getRoleId(), r.getRoleName(), r.getRoleDescription(), "role"))
                .toList();

        return new MenuOptionsDto(availableParents, availableScreens, availableRoles);
    }

    @CacheEvict(value = {"menus", "menuTree"}, allEntries = true)
    public MenuItemDto createMenu(CreateMenuRequest request) {
        if (menuRepository.findByCode(request.code()).isPresent()) {
            throw new RuntimeException("Menu with code " + request.code() + " already exists");
        }

        AppMenu parent = null;
        if (request.parentId() != null && request.parentId() > 0) {
            parent = menuRepository.findById(request.parentId())
                    .orElseThrow(() -> new RuntimeException("Parent menu not found"));
        }

        AppMenu menu = new AppMenu();
        menu.setCode(request.code());
        menu.setLabel(request.label());
        menu.setIcon(request.icon());
        menu.setRoute(request.route());
        menu.setScreenCode(request.screenCode());
        menu.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);
        menu.setIsActive(request.isActive() != null ? request.isActive() : "Y");
        menu.setRoleRequired(request.roleRequired());
        menu.setParent(parent);

        menu = menuRepository.save(menu);
        return toDto(menu, Map.of());
    }

    @CacheEvict(value = {"menus", "menuTree"}, allEntries = true)
    public MenuItemDto updateMenu(Long id, UpdateMenuRequest request) {
        AppMenu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));

        if (!menu.getCode().equals(request.code())) {
            menuRepository.findByCode(request.code())
                    .ifPresent(existing -> {
                        throw new RuntimeException("Menu with code " + request.code() + " already exists");
                    });
        }

        AppMenu parent = null;
        if (request.parentId() != null && request.parentId() > 0) {
            if (request.parentId().equals(id)) {
                throw new RuntimeException("A menu cannot be its own parent");
            }
            parent = menuRepository.findById(request.parentId())
                    .orElseThrow(() -> new RuntimeException("Parent menu not found"));
        }

        menu.setCode(request.code());
        menu.setLabel(request.label());
        menu.setIcon(request.icon());
        menu.setRoute(request.route());
        menu.setScreenCode(request.screenCode());
        menu.setDisplayOrder(request.displayOrder());
        menu.setIsActive(request.isActive());
        menu.setRoleRequired(request.roleRequired());
        menu.setParent(parent);

        menu = menuRepository.save(menu);
        return toDto(menu, Map.of());
    }

    @CacheEvict(value = {"menus", "menuTree"}, allEntries = true)
    public void deleteMenu(Long id) {
        AppMenu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));

        if (!menu.getChildren().isEmpty()) {
            throw new RuntimeException("Cannot delete menu with children. Delete or move children first.");
        }

        menu.setIsActive("N");
        menuRepository.save(menu);
    }

    @CacheEvict(value = {"menus", "menuTree"}, allEntries = true)
    public void toggleMenuStatus(Long id) {
        AppMenu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));
        menu.setIsActive("Y".equals(menu.getIsActive()) ? "N" : "Y");
        menuRepository.save(menu);
    }

    @CacheEvict(value = {"menus", "menuTree"}, allEntries = true)
    public void reorderMenus(List<Long> orderedIds) {
        for (int i = 0; i < orderedIds.size(); i++) {
            final int order = i * 10;
            final Long menuId = orderedIds.get(i);
            menuRepository.findById(menuId).ifPresent(menu -> {
                menu.setDisplayOrder(order);
                menuRepository.save(menu);
            });
        }
    }

    private MenuItemDto toDto(AppMenu menu, Map<Long, String> parentLabels) {
        return new MenuItemDto(
                menu.getId(),
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
                menu.getChildren() != null ? menu.getChildren().size() : 0,
                List.of()
        );
    }

    private MenuItemDto toDtoWithChildren(AppMenu menu, Map<Long, List<AppMenu>> childrenByParentId) {
        List<MenuItemDto> children = childrenByParentId.getOrDefault(menu.getId(), List.of())
                .stream()
                .map(child -> toDtoWithChildren(child, childrenByParentId))
                .toList();

        return new MenuItemDto(
                menu.getId(),
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

    public Optional<AppMenu> findByCode(String code) {
        return menuRepository.findByCode(code);
    }
}
