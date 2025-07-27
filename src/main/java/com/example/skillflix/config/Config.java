package com.example.skillflix.config;

import com.example.skillflix.domain.UserEntity;
import com.example.skillflix.domain.VideoEntity;
import com.example.skillflix.repository.UserRepository;
import com.example.skillflix.repository.VideoRepository;
import com.example.skillflix.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import redis.clients.jedis.UnifiedJedis;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.Optional;

@Configuration
public class Config {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public VideoEntity videoIniter(){
        return new VideoEntity();
    }

    @Bean
    public UserEntity userIniter(){
        return new UserEntity();
    }

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.AP_SOUTH_1)  // e.g., Mumbai
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }



}
