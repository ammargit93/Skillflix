package com.example.skillflix.controller;

import com.example.skillflix.domain.VideoEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Log
@RestController
public class VideoController {

    private VideoEntity video;

    public VideoController(VideoEntity video){
        this.video = video;
    }

    @PostMapping(value = "/upload",consumes = {"multipart/form-data", "application/json"})
    public VideoEntity uploadVideo(
            @RequestParam("title") String videoTitle,
            @RequestParam("description") String videoDescription,
            @RequestParam("video") MultipartFile videoContent,
            @RequestParam("user_id") String userId
    ){
        log.info("Video: "+videoTitle);
        log.info("Video id: "+videoDescription);
        video.setVideoId(UUID.randomUUID().toString());
        video.setVideoTitle(videoTitle);
        video.setVideoDescription(videoDescription);
//        video.setUploadedBy();
        return video;


    }

}
