package com.example.sharepoint.service;

import com.example.sharepoint.model.Category;
import com.example.sharepoint.model.Document;
import com.example.sharepoint.repository.DocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    public List<Document> getDocumentsByCategory(Category category) {
        return documentRepository.findByCategory(category);
    }

    public Document saveDocument(String title, MultipartFile file, Category category) throws IOException {
        Document document = Document.builder()
                .title(title)
                .filename(file.getOriginalFilename())
                .contentType(file.getContentType())
                .data(file.getBytes())
                .category(category)
                .build();

        return documentRepository.save(document);
    }

    public Document updateDocument(Long id, String newTitle) {
        return documentRepository.findById(id).map(doc -> {
            doc.setTitle(newTitle);
            return documentRepository.save(doc);
        }).orElseThrow(() -> new RuntimeException("Document not found"));
    }

    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}
