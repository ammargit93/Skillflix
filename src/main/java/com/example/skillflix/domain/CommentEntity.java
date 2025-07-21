package com.example.skillflix.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="comments")
@Builder
public class CommentEntity {
    @Id
    private String commentId;

    private String commentContent;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "video_id", referencedColumnName = "videoId")
    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    private VideoEntity video;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    private UserEntity user;


}
