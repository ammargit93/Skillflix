package com.example.skillflix.controller;

import com.example.skillflix.domain.HistoryEntity;
import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.domain.VideoEntity;
import com.example.skillflix.services.HistoryService;
import com.example.skillflix.services.UserService;
import com.example.skillflix.services.VideoService;
import com.example.skillflix.services.impl.VideoServiceImpl;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Log
@RestController
public class HistoryController {
    private VideoService videoService;
    private UserService userService;
    private HistoryService historyService;

    public HistoryController(UserService userService, VideoService videoService, HistoryService historyService){
        this.userService = userService;
        this.videoService = videoService;
        this.historyService = historyService;
    }


    @PostMapping(value="/video-click")
    public void handleVideoClick(
            @RequestBody Map<String, Object> requestBody
    ){
        String clickedVideoId = (String) requestBody.get("videoId");
        String currentUserId = (String) requestBody.get("userId");

        String timestampStr = (String) requestBody.get("timestamp");
        OffsetDateTime odt = OffsetDateTime.parse(timestampStr); // parses ISO 8601 with offset
        Time timeStamp = Time.valueOf(odt.toLocalTime()); // only time part

        UUID historyId = UUID.randomUUID();

        HistoryEntity history = new HistoryEntity();
        Optional<UserEntity> userOpt = userService.findById(currentUserId);
        if (userOpt.isPresent()) {
            history.setUser(userOpt.get());
            history.setVideo(videoService.findVideoById(clickedVideoId));
            history.setHistoryId(historyId.toString());
            history.setTimeWatched(timeStamp);
            history.setCompleted(false);

            historyService.save(history);

        }


    }

    @GetMapping("/get-history")
    public List<Map<String, Object>> getHistory(@RequestParam("user_id") String userId) {
        return historyService.getHistoryForUser(userId);
    }
}
