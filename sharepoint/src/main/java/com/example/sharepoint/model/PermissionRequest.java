package com.example.sharepoint.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PermissionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String content;
    private String status;
    private LocalDateTime timestamp;

    public PermissionRequest() {
        this.timestamp = LocalDateTime.now();
        this.status = "en_attente";
    }

    // 👉 GETTERS
    public Long getId() {
        return id;
    }

    public String getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    // 👉 SETTERS
    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}


    // Getters et setters

