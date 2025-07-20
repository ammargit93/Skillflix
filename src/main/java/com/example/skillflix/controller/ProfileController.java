package com.example.skillflix.controller;

import com.example.skillflix.domain.ProfileEntity;
import com.example.skillflix.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    @PutMapping("/edit")
    public ResponseEntity<?> editProfile(@RequestBody ProfileEntity updatedProfile) {
        return profileRepository.findById(updatedProfile.getProfileId())
                .map(existing -> {
                    existing.setProfilePicUrl(updatedProfile.getProfilePicUrl());
                    // Add other updatable fields as needed

                    profileRepository.save(existing);
                    return ResponseEntity.ok("Profile updated successfully");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
