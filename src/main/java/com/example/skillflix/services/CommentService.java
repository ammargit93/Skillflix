package com.example.skillflix.services;

import com.example.skillflix.domain.CommentEntity;

import java.util.List;

public interface CommentService {
    List<CommentEntity> findCommentByVideoId(String videoId);
}
