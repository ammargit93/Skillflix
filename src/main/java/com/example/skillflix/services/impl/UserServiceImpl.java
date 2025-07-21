package com.example.skillflix.services.impl;

import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.repository.UserRepository;
import com.example.skillflix.services.UserService;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity save(UserEntity user){
        return userRepository.save(user);
    }

    @Override
    public UserEntity findByUsername(String username){
        Iterable<UserEntity> results = userRepository.findAll();
        for(UserEntity user : results){
            if(user.getUsername().equals(username)){
                return user;
            }
        }
        return null;
    }

    @Override
    public Optional<UserEntity> findById(String userId){
        Optional<UserEntity> result = userRepository.findById(userId);
        return result;
    }

}
