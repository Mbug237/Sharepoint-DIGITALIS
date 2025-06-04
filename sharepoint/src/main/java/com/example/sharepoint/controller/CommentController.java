package com.example.sharepoint.controller;

import com.example.sharepoint.model.Comment;
import com.example.sharepoint.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Comment> sendComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.sendComment(comment));
    }

    @GetMapping("/receiver/{receiver}")
    public ResponseEntity<List<Comment>> getByReceiver(@PathVariable String receiver) {
        return ResponseEntity.ok(commentService.getCommentsByReceiver(receiver));
    }

    @GetMapping("/sender/{sender}")
    public ResponseEntity<List<Comment>> getBySender(@PathVariable String sender) {
        return ResponseEntity.ok(commentService.getCommentsBySender(sender));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody String newContent) {
        return ResponseEntity.ok(commentService.updateComment(id, newContent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok("Commentaire supprimé.");
    }

    @GetMapping("/unread/{receiver}")
    public ResponseEntity<Long> countUnread(@PathVariable String receiver) {
        return ResponseEntity.ok(commentService.countUnread(receiver));
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        commentService.markAsRead(id);
        return ResponseEntity.ok("Marqué comme lu.");
    }
}