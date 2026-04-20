package com.example.myapp.repository;

import com.example.myapp.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    // Custom queries can be added here
    // Example: List<Client> findByNomContainingIgnoreCase(String keyword);
}
