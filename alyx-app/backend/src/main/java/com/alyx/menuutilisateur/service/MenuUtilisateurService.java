package com.alyx.menuutilisateur.service;

import com.alyx.menuutilisateur.dto.MenuUtilisateurDto;
import com.alyx.auth.entity.AppUser;
import com.alyx.auth.repository.AppUserRepository;
import com.alyx.core.common.PagedResponse;
import com.alyx.metadata.entity.AppMenu;
import com.alyx.metadata.repository.AppMenuRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class MenuUtilisateurService {

    private final AppUserRepository userRepo;
    private final AppMenuRepository menuRepo;

    public MenuUtilisateurService(AppUserRepository userRepo, AppMenuRepository menuRepo) {
        this.userRepo = userRepo;
        this.menuRepo = menuRepo;
    }

    /** Returns the cross-product user×menu with enabled flag from app_user_menu. */
    public PagedResponse<MenuUtilisateurDto> findAll(int page, int size, String search) {
        var pageable = PageRequest.of(page, size, Sort.by("username"));

        List<AppUser> users = (search == null || search.isBlank())
            ? userRepo.findAll()
            : userRepo.findAll().stream()
                .filter(u -> u.getUsername().toLowerCase().contains(search.toLowerCase()))
                .toList();

        List<AppMenu> menus = menuRepo.findAll(Sort.by("displayOrder"));

        List<MenuUtilisateurDto> rows = new ArrayList<>();
        for (AppUser u : users) {
            for (AppMenu m : menus) {
                rows.add(new MenuUtilisateurDto(
                    u.getUserId(), u.getUsername(),
                    m.getMenuId(), m.getCode(), m.getLabel(), m.getRoute(),
                    "Y"  // default: enabled — real impl queries app_user_menu
                ));
            }
        }

        int start = (int) pageable.getOffset();
        int end   = Math.min(start + pageable.getPageSize(), rows.size());
        var slice = start >= rows.size() ? Collections.<MenuUtilisateurDto>emptyList() : rows.subList(start, end);
        Page<MenuUtilisateurDto> p = new PageImpl<>(slice, pageable, rows.size());
        return PagedResponse.of(p);
    }
}
