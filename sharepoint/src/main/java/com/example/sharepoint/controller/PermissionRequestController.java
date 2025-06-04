package com.example.sharepoint.controller;

import com.example.sharepoint.model.PermissionRequest;
import com.example.sharepoint.service.PermissionRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
@CrossOrigin(origins = "*")
public class PermissionRequestController {

    private final PermissionRequestService service;

    public PermissionRequestController(PermissionRequestService service) {
        this.service = service;
    }

    @PostMapping
    public PermissionRequest createRequest(@RequestBody PermissionRequest request) {
        return service.createRequest(request);
    }

    @GetMapping
    public List<PermissionRequest> getAllRequests() {
        return service.getAllRequests();
    }

    @GetMapping("/user/{sender}")
    public List<PermissionRequest> getBySender(@PathVariable String sender) {
        return service.getRequestsBySender(sender);
    }

    @PutMapping("/{id}/status")
    public PermissionRequest updateStatus(@PathVariable Long id, @RequestBody String status) {
        return service.updateStatus(id, status.replace("\"", ""));
    }
}
