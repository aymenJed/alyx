package com.example.myapp.repository;

import com.example.myapp.entity.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {

    // Custom queries can be added here
    // Example: List<Compte> findByAccNumberContainingIgnoreCase(String keyword);
}
