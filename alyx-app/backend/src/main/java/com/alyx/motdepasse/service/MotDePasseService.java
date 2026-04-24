package com.alyx.motdepasse.service;

import com.alyx.motdepasse.dto.ChangePasswordRequest;
import com.alyx.auth.entity.AppUser;
import com.alyx.auth.repository.AppUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MotDePasseService {

    private static final String DEFAULT_PASSWORD = "Alyx@2025";

    private final AppUserRepository userRepo;
    private final PasswordEncoder   encoder;

    public MotDePasseService(AppUserRepository userRepo, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder  = encoder;
    }

    public void changer(ChangePasswordRequest req) {
        if (!req.nouveauMdp().equals(req.confirmerMdp())) {
            throw new IllegalArgumentException("Les mots de passe ne correspondent pas");
        }
        AppUser user = userRepo.findByUsername(req.nomUtilisateur())
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + req.nomUtilisateur()));
        user.setPassword(encoder.encode(req.nouveauMdp()));
        userRepo.save(user);
    }

    public void reinitialiser(String nomUtilisateur) {
        AppUser user = userRepo.findByUsername(nomUtilisateur)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + nomUtilisateur));
        user.setPassword(encoder.encode(DEFAULT_PASSWORD));
        userRepo.save(user);
    }
}
