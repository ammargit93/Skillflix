package com.example.skillflix.controller;

import com.example.skillflix.domain.CommentEntity;
import com.example.skillflix.repository.CommentRepository;
import com.example.skillflix.services.CommentService;
import com.example.skillflix.services.UserService;
import com.example.skillflix.services.VideoService;
import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;
    private CommentService commentService;
    private UserService userService;
    private VideoService videoService;

    public CommentController(CommentRepository commentRepository,CommentService commentService, UserService userService, VideoService videoService){
        this.commentRepository = commentRepository;
        this.commentService = commentService;
        this.userService = userService;
        this.videoService = videoService;

    }

    @PostMapping(value="/post-comment")
    public CommentEntity postComment(@RequestBody Map<String,String> Comment){
        CommentEntity comment = new CommentEntity();
        comment.setCommentId(UUID.randomUUID().toString());
        comment.setCommentContent(Comment.get("comment"));
        comment.setUser(userService.findById(Comment.get("user_id")).get());
        comment.setVideo(videoService.findVideoById(Comment.get("video_id")));

        commentRepository.save(comment);
        return comment;
    }

    @GetMapping(value = "/get-comments-by-video")
    public List<CommentEntity> getVideoSpecificComments(@RequestParam("video_id") String videoId){
        return commentService.findCommentByVideoId(videoId);
    }




}
