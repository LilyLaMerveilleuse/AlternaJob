package com.alternajob.backend.dto;

import com.alternajob.backend.model.Role;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {

    @Size(min = 3, max = 50, message = "Le pseudonyme doit être entre 3 et 50 caractères")
    private String username;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private Role role;

    private String nom;

    private String prenom;
}
