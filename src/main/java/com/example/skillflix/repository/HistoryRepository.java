package com.example.skillflix.repository;

import com.example.skillflix.domain.HistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.protocols.jsoncore.internal.StringJsonNode;

import java.util.List;
import java.util.Map;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, String> {
    @Query(value = "SELECT v.s3url,v.video_title,video_description,h.time_watched FROM history h join videos v on h.user_id=v.uploaded_by_id WHERE h.user_id = :userId", nativeQuery = true)
    List<Map<String, Object>> findHistoryByUserId(@Param("userId") String userId);
}
