package com.example.sharepoint.service;

import com.example.sharepoint.model.Comment;
import com.example.sharepoint.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment sendComment(Comment comment) {
        comment.setTimestamp(LocalDateTime.now());
        comment.setRead(true);

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByReceiver(String receiver) {
        return commentRepository.findByReceiverOrderByTimestampDesc(receiver);
    }

    public List<Comment> getCommentsBySender(String sender) {
        return commentRepository.findBySenderOrderByTimestampDesc(sender);
    }

    public Comment updateComment(Long id, String newContent) {
        Comment comment = commentRepository.findById(id).orElseThrow();
        comment.setContent(newContent);
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public long countUnread(String receiver) {
        return commentRepository.countByReceiverAndIsReadFalse(receiver);
    }

    public void markAsRead(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow();
        comment.setRead(true);

        commentRepository.save(comment);
    }
}