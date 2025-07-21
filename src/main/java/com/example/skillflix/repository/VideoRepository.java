package com.example.skillflix.repository;

import com.example.skillflix.domain.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, String> {
    List<VideoEntity> findByUploadedBy_Id(String userId);
}
