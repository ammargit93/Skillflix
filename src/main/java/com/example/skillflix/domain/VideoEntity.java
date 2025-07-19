package com.example.skillflix.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="videos")
public class VideoEntity {
    @Id
    private String videoId;

    private String videoTitle;

    private String VideoDescription;

    private String S3Url;

    @JoinColumn(name="id")
    @OneToOne(cascade = CascadeType.ALL)
    private UserEntity uploadedBy;

}
