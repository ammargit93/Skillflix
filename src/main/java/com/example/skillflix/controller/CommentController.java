package com.example.skillflix.controller;

import com.example.skillflix.domain.CommentEntity;
import com.example.skillflix.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

}
