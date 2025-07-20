package com.example.skillflix.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="profiles")
@Builder
public class ProfileEntity {
    @Id
    private String profileId;

    private String profileDescription;

    @OneToMany(cascade = CascadeType.ALL)
    private List<VideoEntity> videos;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    private String ProfilePicUrl;

}
