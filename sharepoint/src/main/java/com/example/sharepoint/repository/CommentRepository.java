package com.example.sharepoint.repository;

import com.example.sharepoint.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByReceiverOrderByTimestampDesc(String receiver);
    List<Comment> findBySenderOrderByTimestampDesc(String sender);
    long countByReceiverAndIsReadFalse(String receiver);
}