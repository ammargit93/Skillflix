package com.example.skillflix.services;


import com.example.skillflix.controller.UserController;
import com.example.skillflix.domain.UserEntity;

public interface UserService {
    UserEntity save(UserEntity user);

    UserEntity findByUsername(String username);

    UserEntity findById(String Id);
}
