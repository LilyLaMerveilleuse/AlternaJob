package com.alternajob.backend.dto;

import com.alternajob.backend.model.Role;
import lombok.Data;

@Data
public class LoginResponseDTO {
    private String token;
    private String username;
    private Role role;
}