package com.example.skillflix.services;


import com.example.skillflix.controller.UserController;
import com.example.skillflix.domain.UserEntity;

import java.util.Optional;

public interface UserService {
    UserEntity save(UserEntity user);

    UserEntity findByUsername(String username);

    Optional<UserEntity> findById(String Id);
}
