package com.alternajob.backend.controller;

import com.alternajob.backend.dto.UserRequestDTO;
import com.alternajob.backend.dto.UserResponseDTO;
import com.alternajob.backend.model.Role;
import com.alternajob.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserRequestDTO validUserRequest;
    private UserResponseDTO userResponse;

    @BeforeEach
    void setUp() {
        validUserRequest = new UserRequestDTO();
        validUserRequest.setUsername("testuser");
        validUserRequest.setPassword("password123");
        validUserRequest.setRole(Role.ETUDIANT);
        validUserRequest.setNom("Dupont");
        validUserRequest.setPrenom("Jean");

        userResponse = new UserResponseDTO();
        userResponse.setId(1L);
        userResponse.setUsername("testuser");
        userResponse.setRole(Role.ETUDIANT);
        userResponse.setNom("Dupont");
        userResponse.setPrenom("Jean");
        userResponse.setCreatedAt(LocalDateTime.now());
        userResponse.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    @DisplayName("POST /api/users - Devrait créer un utilisateur avec succès")
    void createUser_WithValidData_ShouldReturnCreatedUser() throws Exception {
        when(userService.createUser(any(UserRequestDTO.class))).thenReturn(userResponse);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.role").value("ETUDIANT"))
                .andExpect(jsonPath("$.nom").value("Dupont"))
                .andExpect(jsonPath("$.prenom").value("Jean"));
    }

    @Test
    @DisplayName("POST /api/users - Devrait retourner 400 si username manquant")
    void createUser_WithMissingUsername_ShouldReturnBadRequest() throws Exception {
        UserRequestDTO invalidRequest = new UserRequestDTO();
        invalidRequest.setPassword("password123");
        invalidRequest.setRole(Role.ETUDIANT);
        invalidRequest.setNom("Dupont");
        invalidRequest.setPrenom("Jean");

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/users - Devrait retourner 400 si password trop court")
    void createUser_WithShortPassword_ShouldReturnBadRequest() throws Exception {
        UserRequestDTO invalidRequest = new UserRequestDTO();
        invalidRequest.setUsername("testuser");
        invalidRequest.setPassword("123");
        invalidRequest.setRole(Role.ETUDIANT);
        invalidRequest.setNom("Dupont");
        invalidRequest.setPrenom("Jean");

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/users - Devrait retourner 400 si role manquant")
    void createUser_WithMissingRole_ShouldReturnBadRequest() throws Exception {
        UserRequestDTO invalidRequest = new UserRequestDTO();
        invalidRequest.setUsername("testuser");
        invalidRequest.setPassword("password123");
        invalidRequest.setNom("Dupont");
        invalidRequest.setPrenom("Jean");

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/users - Devrait créer un utilisateur ADMIN")
    void createUser_WithAdminRole_ShouldReturnCreatedUser() throws Exception {
        validUserRequest.setRole(Role.ADMIN);

        UserResponseDTO adminResponse = new UserResponseDTO();
        adminResponse.setId(2L);
        adminResponse.setUsername("testuser");
        adminResponse.setRole(Role.ADMIN);
        adminResponse.setNom("Dupont");
        adminResponse.setPrenom("Jean");
        adminResponse.setCreatedAt(LocalDateTime.now());
        adminResponse.setUpdatedAt(LocalDateTime.now());

        when(userService.createUser(any(UserRequestDTO.class))).thenReturn(adminResponse);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.role").value("ADMIN"));
    }

    @Test
    @DisplayName("POST /api/users - Devrait créer un utilisateur PROFESSIONNEL")
    void createUser_WithProfessionnelRole_ShouldReturnCreatedUser() throws Exception {
        validUserRequest.setRole(Role.PROFESSIONNEL);

        UserResponseDTO proResponse = new UserResponseDTO();
        proResponse.setId(3L);
        proResponse.setUsername("testuser");
        proResponse.setRole(Role.PROFESSIONNEL);
        proResponse.setNom("Dupont");
        proResponse.setPrenom("Jean");
        proResponse.setCreatedAt(LocalDateTime.now());
        proResponse.setUpdatedAt(LocalDateTime.now());

        when(userService.createUser(any(UserRequestDTO.class))).thenReturn(proResponse);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.role").value("PROFESSIONNEL"));
    }
}
