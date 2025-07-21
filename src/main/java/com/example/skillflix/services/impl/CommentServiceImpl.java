package com.example.skillflix.services.impl;

import com.example.skillflix.domain.CommentEntity;
import com.example.skillflix.domain.VideoEntity;
import com.example.skillflix.repository.CommentRepository;
import com.example.skillflix.repository.VideoRepository;
import com.example.skillflix.services.CommentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    @Override
    public List<CommentEntity> findCommentByVideoId(String videoId){
        Iterable<CommentEntity> results = commentRepository.findAll();
        List<CommentEntity> comments = new ArrayList<>();
        for(CommentEntity comment: results){
            if(comment.getVideo().getVideoId().equals(videoId)){
                comments.add(comment);
            }
        }
        return comments;
    }

}
