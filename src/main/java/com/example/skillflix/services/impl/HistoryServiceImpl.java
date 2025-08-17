package com.example.skillflix.services.impl;

import com.example.skillflix.domain.HistoryEntity;
import com.example.skillflix.repository.HistoryRepository;
import com.example.skillflix.services.HistoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    public HistoryServiceImpl(HistoryRepository historyRepository){
        this.historyRepository=historyRepository;
    }

    @Override
    public HistoryEntity save(HistoryEntity historyEntity){
        return historyRepository.save(historyEntity);
    }

    public List<Map<String,Object>> getHistoryForUser(String userId) {
        return historyRepository.findHistoryByUserId(userId);
    }
}
