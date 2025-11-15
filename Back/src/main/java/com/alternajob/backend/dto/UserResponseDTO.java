package com.alternajob.backend.dto;

import com.alternajob.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String username;
    private Role role;
    private String nom;
    private String prenom;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
