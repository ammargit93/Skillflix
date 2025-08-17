package com.example.skillflix.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="history")
@Data
public class HistoryEntity {

    @Id
    private String historyId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "video_id", referencedColumnName = "videoId")
    private VideoEntity video;

    private Time timeWatched;

    private boolean completed;
}
