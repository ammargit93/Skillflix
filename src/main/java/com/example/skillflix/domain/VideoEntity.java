package com.example.skillflix.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "videos")
public class VideoEntity {
    @Id
    private String videoId;

    private String videoTitle;

    private String videoDescription;

    private String s3Url;

    private int likes = 0;

    private int dislikes = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by_id")  // 'id' in videos refers to users.id
    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    private UserEntity uploadedBy;
}
