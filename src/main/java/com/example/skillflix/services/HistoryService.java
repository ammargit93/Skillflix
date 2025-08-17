package com.example.skillflix.services;

import com.example.skillflix.domain.HistoryEntity;

import java.util.List;
import java.util.Map;

public interface HistoryService {

    HistoryEntity save(HistoryEntity historyEntity);

    List<Map<String, Object>> getHistoryForUser(String userId);
}
