package com.example.skillflix.controller;

import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.domain.VideoEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Log
@RestController
public class UserController {

    private UserEntity user;

    public UserController(UserEntity user){
        this.user = user;
    }

    @JsonIgnore
    @PostMapping(value = "/signup",consumes = {"application/json"})
    public UserEntity uploadVideo(@RequestBody UserEntity user){
        log.info("user password: "+user.getPassword());
        log.info("username: "+user.getUsername());
        user.setId(UUID.randomUUID().toString());
        user.setUsername(user.getUsername());
        user.setPassword(user.getPassword());

        return user;
    }

}
