package com.alyx.cache.service;

import com.alyx.auth.repository.AppUserRepository;
import com.alyx.groupe.repository.AppGroupRepository;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class CacheAdminService {

    private final CacheManager       cacheManager;
    private final AppUserRepository  userRepo;
    private final AppGroupRepository groupRepo;

    private LocalDateTime lastReload;

    public CacheAdminService(CacheManager cacheManager,
                             AppUserRepository userRepo,
                             AppGroupRepository groupRepo) {
        this.cacheManager = cacheManager;
        this.userRepo     = userRepo;
        this.groupRepo    = groupRepo;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getStatus() {
        return Map.of(
            "cacheStatus",    "ACTIF",
            "lastReloadDate", lastReload != null ? lastReload.toString() : "Jamais",
            "nbUsersLoaded",  userRepo.count(),
            "nbGroupsLoaded", groupRepo.count()
        );
    }

    public void chargerSecurite() {
        if (cacheManager != null) {
            cacheManager.getCacheNames().forEach(name -> {
                var cache = cacheManager.getCache(name);
                if (cache != null) cache.invalidate();
            });
        }
        lastReload = LocalDateTime.now();
    }

    public void viderCache() {
        if (cacheManager != null) {
            cacheManager.getCacheNames().forEach(name -> {
                var cache = cacheManager.getCache(name);
                if (cache != null) cache.clear();
            });
        }
        lastReload = LocalDateTime.now();
    }
}
