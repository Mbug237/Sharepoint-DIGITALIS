package com.example.sharepoint.repository;

import com.example.sharepoint.model.PermissionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermissionRequestRepository extends JpaRepository<PermissionRequest, Long> {
    List<PermissionRequest> findBySender(String sender);
}
