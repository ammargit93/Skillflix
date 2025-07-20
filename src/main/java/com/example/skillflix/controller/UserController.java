package com.example.skillflix.controller;

import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.domain.VideoEntity;
import com.example.skillflix.services.UserService;
import com.example.skillflix.services.impl.UserServiceImpl;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Log
@RestController
public class UserController {

    private UserEntity user;

    private UserService userService;


    public UserController(UserService userService){
        this.userService = userService;
    }

    @JsonIgnore
    @PostMapping(value = "/signup",consumes = {"application/json"})
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserEntity user){
        log.info("user password: "+user.getPassword());
        log.info("username: "+user.getUsername());
        user.setId(UUID.randomUUID().toString());
        user.setUsername(user.getUsername());
        user.setPassword(user.getPassword());

        userService.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("userId", user.getId());

        return ResponseEntity.ok(response);
    }

    @JsonIgnore
    @PostMapping(value = "/login",consumes = {"application/json"})
    public ResponseEntity<?> loginUser(@RequestBody UserEntity user){
        UserEntity storedUser = userService.findByUsername(user.getUsername());
        if (storedUser == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        if (!storedUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Incorrect password"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", storedUser.getId());
        response.put("username", storedUser.getUsername());

        return ResponseEntity.ok(response);
    }

}
