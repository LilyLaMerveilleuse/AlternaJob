package com.alternajob.backend.service;

import com.alternajob.backend.dto.LoginRequestDTO;
import com.alternajob.backend.dto.LoginResponseDTO;
import com.alternajob.backend.dto.UserRequestDTO;
import com.alternajob.backend.dto.UserResponseDTO;
import com.alternajob.backend.dto.UserUpdateDTO;
import com.alternajob.backend.model.Role;
import com.alternajob.backend.model.User;
import com.alternajob.backend.repository.UserRepository;
import com.alternajob.backend.security.JWTService;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final StringEncryptor stringEncryptor;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JWTService jwtService,
            @Qualifier("jasyptStringEncryptor") StringEncryptor stringEncryptor) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.stringEncryptor = stringEncryptor;
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convertToResponseDTO(user);
    }

    @Transactional
    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new RuntimeException("Username already exists: " + userRequestDTO.getUsername());
        }

        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        user.setNom(encryptData(userRequestDTO.getNom()));
        user.setPrenom(encryptData(userRequestDTO.getPrenom()));
        user.setRole(userRequestDTO.getRole());
        User savedUser = userRepository.save(user);
        return convertToResponseDTO(savedUser);
    }

    @Transactional
    public UserResponseDTO registerStudent(UserRequestDTO userRequestDTO) {
        if (userRepository.findByUsername(userRequestDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(hashPassword(userRequestDTO.getPassword()));
        user.setNom(encryptData(userRequestDTO.getNom()));
        user.setPrenom(encryptData(userRequestDTO.getPrenom()));
        user.setRole(Role.ETUDIANT);

        userRepository.save(user);
        return convertToResponseDTO(user);
    }

    @Transactional
    public UserResponseDTO registerPro(UserRequestDTO userRequestDTO) {
        if (userRepository.findByUsername(userRequestDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(hashPassword(userRequestDTO.getPassword()));
        user.setNom(encryptData(userRequestDTO.getNom()));
        user.setPrenom(encryptData(userRequestDTO.getPrenom()));
        user.setRole(Role.PROFESSIONNEL);

        userRepository.save(user);
        return convertToResponseDTO(user);
    }

    @Transactional
    public UserResponseDTO registerAdmin(UserRequestDTO userRequestDTO) {
        if (userRepository.findByUsername(userRequestDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(hashPassword(userRequestDTO.getPassword()));
        user.setNom(encryptData(userRequestDTO.getNom()));
        user.setPrenom(encryptData(userRequestDTO.getPrenom()));
        user.setRole(Role.ADMIN);

        userRepository.save(user);
        return convertToResponseDTO(user);
    }

    @Transactional
    public LoginResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username"));

        // Vérification du mot de passe hashé en base
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Génération du JWT avec username et role
        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());

        // Construction de la réponse
        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());

        return response;
    }

    @Transactional
    public UserResponseDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userUpdateDTO.getUsername() != null && !userUpdateDTO.getUsername().isEmpty()) {
            if (!user.getUsername().equals(userUpdateDTO.getUsername()) &&
                    userRepository.existsByUsername(userUpdateDTO.getUsername())) {
                throw new RuntimeException("Username already exists: " + userUpdateDTO.getUsername());
            }
            user.setUsername(userUpdateDTO.getUsername());
        }

        if (userUpdateDTO.getPassword() != null && !userUpdateDTO.getPassword().isEmpty()) {
            user.setPassword(hashPassword(userUpdateDTO.getPassword()));
        }

        if (userUpdateDTO.getRole() != null) {
            user.setRole(userUpdateDTO.getRole());
        }

        if (userUpdateDTO.getNom() != null && !userUpdateDTO.getNom().isEmpty()) {
            user.setNom(encryptData(userUpdateDTO.getNom()));
        }

        if (userUpdateDTO.getPrenom() != null && !userUpdateDTO.getPrenom().isEmpty()) {
            user.setPrenom(encryptData(userUpdateDTO.getPrenom()));
        }

        User updatedUser = userRepository.save(user);
        return convertToResponseDTO(updatedUser);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    private String encryptData(String data) {
        return stringEncryptor.encrypt(data);
    }

    private String decryptData(String encryptedData) {
        return stringEncryptor.decrypt(encryptedData);
    }

    private UserResponseDTO convertToResponseDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());
        dto.setNom(decryptData(user.getNom()));
        dto.setPrenom(decryptData(user.getPrenom()));
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
}
