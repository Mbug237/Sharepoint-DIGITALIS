package com.example.sharepoint.service;

import com.example.sharepoint.model.PermissionRequest;
import com.example.sharepoint.repository.PermissionRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionRequestService {

    private final PermissionRequestRepository repository;

    public PermissionRequestService(PermissionRequestRepository repository) {
        this.repository = repository;
    }

    public PermissionRequest createRequest(PermissionRequest request) {
        return repository.save(request);
    }

    public List<PermissionRequest> getAllRequests() {
        return repository.findAll();
    }

    public List<PermissionRequest> getRequestsBySender(String sender) {
        return repository.findBySender(sender);
    }

    public PermissionRequest updateStatus(Long id, String status) {
        PermissionRequest req = repository.findById(id).orElseThrow();
        req.setStatus(status);
        return repository.save(req);
    }
}
