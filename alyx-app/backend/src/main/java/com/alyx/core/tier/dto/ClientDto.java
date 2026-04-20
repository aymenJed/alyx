package com.alyx.core.tier.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO record used for both Request and Response.
 */
@Data
@Builder
public class ClientDto {

    private Long id;
    private String nom;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
