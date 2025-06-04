package com.example.sharepoint.repository;

import com.example.sharepoint.model.Document;
import com.example.sharepoint.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByCategory(Category category);
}
