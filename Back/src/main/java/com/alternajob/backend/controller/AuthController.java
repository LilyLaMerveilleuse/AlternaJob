package com.alternajob.backend.controller;

import com.alternajob.backend.dto.LoginRequestDTO;
import com.alternajob.backend.dto.UserRequestDTO;
import com.alternajob.backend.dto.UserResponseDTO;
import com.alternajob.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO dto) {
        try {
            return ResponseEntity.ok(userService.login(dto));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @PostMapping("/register/student")
    public ResponseEntity<UserResponseDTO> registerStudent(
            @Valid @RequestBody UserRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerStudent(dto));
    }

    @PostMapping("/register/pro")
    public ResponseEntity<UserResponseDTO> registerPro(
            @Valid @RequestBody UserRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerPro(dto));
    }

    // À sécuriser strictement plus tard avec le JWT Token
    @PostMapping("/register/admin")
    public ResponseEntity<UserResponseDTO> registerAdmin(
            @Valid @RequestBody UserRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerAdmin(dto));
    }
}
