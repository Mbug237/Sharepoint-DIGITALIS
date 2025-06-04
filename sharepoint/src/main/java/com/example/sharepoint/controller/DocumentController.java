package com.example.sharepoint.controller;

import com.example.sharepoint.model.Category;
import com.example.sharepoint.model.Document;
import com.example.sharepoint.service.CategoryService;
import com.example.sharepoint.service.DocumentService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    private final DocumentService documentService;
    private final CategoryService categoryService;

    public DocumentController(DocumentService documentService, CategoryService categoryService) {
        this.documentService = documentService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getDocumentsByCategory(@PathVariable Long categoryId) {
        Optional<Category> optionalCategory = categoryService.getCategoryById(categoryId);

        if (optionalCategory.isPresent()) {
            List<Document> documents = documentService.getDocumentsByCategory(optionalCategory.get());
            return ResponseEntity.ok(documents);
        } else {
            return ResponseEntity.badRequest().body("Catégorie introuvable.");
        }
    }


    // ✅ Upload : accepte bien multipart/form-data
    @PostMapping(value = "/multiple", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadMultipleDocuments(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("categoryId") Long categoryId
    ) {
        try {
            Category category = categoryService.getCategoryById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Catégorie introuvable."));

            List<Document> savedDocuments = new ArrayList<>();
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    // Utilise le nom de fichier comme titre par défaut
                    String title = file.getOriginalFilename();
                    Document saved = documentService.saveDocument(title, file, category);
                    savedDocuments.add(saved);
                }
            }

            return ResponseEntity.ok(savedDocuments);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l’upload.");
        }
    }


    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) {
        return documentService.getDocumentById(id).map(doc -> {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(doc.getContentType()));
            headers.setContentDisposition(ContentDisposition.attachment().filename(doc.getFilename()).build());
            return new ResponseEntity<>(doc.getData(), headers, HttpStatus.OK);
        }).orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocumentTitle(@PathVariable Long id, @RequestParam("title") String title) {
        try {
            Document updated = documentService.updateDocument(id, title);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Document introuvable.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok("Document supprimé.");
    }
}
