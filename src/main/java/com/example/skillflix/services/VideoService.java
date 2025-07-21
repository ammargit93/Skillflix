package com.example.skillflix.services;

import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.domain.VideoEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VideoService {
    void save(VideoEntity video);

    List<VideoEntity> findVideosById(String userId);

    String uploadToS3(MultipartFile videoContent, String videoId, String userId) throws IOException;

    List<VideoEntity> findAllVideos();

    VideoEntity findVideoById(String videoId);
}
