package com.example.myapp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO record used for both Request and Response.
 */
@Data
@Builder
public class CompteDto {

    private Long id;
    private String accNumber;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
