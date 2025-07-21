package com.example.skillflix.services.impl;

import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.domain.VideoEntity;
import com.example.skillflix.repository.UserRepository;
import com.example.skillflix.repository.VideoRepository;
import com.example.skillflix.services.VideoService;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.antlr.v4.runtime.tree.xpath.XPath.findAll;


@Service
public class VideoServiceImpl implements VideoService {
    private VideoRepository videoRepository;
    private final S3Client s3Client;

    public VideoServiceImpl(S3Client s3Client, VideoRepository videoRepository){
        this.s3Client = s3Client;
        this.videoRepository = videoRepository;
    }

    @Override
    public void save(VideoEntity video){
        videoRepository.save(video);
    };



    @Override
    public String uploadToS3(MultipartFile videoContent, String videoId, String userId) throws IOException {

        String key = userId + "/" + videoId.replaceAll("\\s+", "_");
        String bucketName = "skillflix-bucket";
        PutObjectRequest putReq = PutObjectRequest.builder()
                .key(key)
                .bucket(bucketName)
                .contentType(videoContent.getContentType())
                .build();

        s3Client.putObject(putReq, RequestBody.fromBytes(videoContent.getBytes()));
        return "https://" + bucketName + ".s3.amazonaws.com/" + key;

    }

    @Override
    public List<VideoEntity> findVideosById(String userId){
        return videoRepository.findByUploadedBy_Id(userId);
    }

    @Override
    public List<VideoEntity> findAllVideos(){
        List<VideoEntity> allVideos = new ArrayList<>();
        Iterable<VideoEntity> results = videoRepository.findAll();
        for(VideoEntity video: results){
            allVideos.add(video);
        }
        return allVideos;

    }
}
