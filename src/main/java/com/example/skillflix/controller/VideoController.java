package com.example.skillflix.controller;

import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.domain.VideoEntity;
import com.example.skillflix.repository.UserRepository;
import com.example.skillflix.repository.VideoRepository;
import com.example.skillflix.services.VideoService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Log
@RestController
public class VideoController {

    private UserRepository userRepository;
    private VideoRepository videoRepository;
    private VideoService videoService;

    public VideoController(VideoEntity video, UserRepository userRepository,VideoService videoService)
    {
        this.videoService = videoService;
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/upload",consumes = {"multipart/form-data", "application/json"})
    public VideoEntity uploadVideo(
            @RequestParam("title") String videoTitle,
            @RequestParam("description") String videoDescription,
            @RequestParam("video") MultipartFile videoContent,
            @RequestParam("user_id") String userId
    ) throws IOException {
        log.info("Video: "+videoTitle);
        log.info("Video id: "+videoDescription);
        String videoId = UUID.randomUUID().toString();

        VideoEntity video = new VideoEntity();

        video.setVideoId(videoId);
        video.setVideoTitle(videoTitle);
        video.setVideoDescription(videoDescription);
        video.setUploadedBy(userRepository.findById(userId).get());
        video.setS3Url(videoService.uploadToS3(videoContent,videoId,userId));
        log.info(video.getS3Url());

        videoService.save(video);
        return video;

    }

    @GetMapping(value="/get-user-videos")
    public List<VideoEntity> getUserVideos(@RequestParam("user_id") String userId){
        List<VideoEntity> userVideos = videoService.findVideosById(userId);
        return userVideos;
    }

    @GetMapping(value="/get-all-videos")
    public List<VideoEntity> getAllVideos(){
        return videoService.findAllVideos();
    }

}
