package com.example.skillflix.repository;

import com.example.skillflix.domain.VideoEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends CrudRepository<VideoEntity, String> {
}
