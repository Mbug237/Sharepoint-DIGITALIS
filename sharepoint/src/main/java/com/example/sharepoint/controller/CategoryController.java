package com.example.sharepoint.controller;

import com.example.sharepoint.dto.CategoryDto;
import com.example.sharepoint.model.Category;
import com.example.sharepoint.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtos = categoryService.getAllCategories().stream()
                .map(cat -> new CategoryDto(cat.getId(), cat.getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(categoryDtos);
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        if (categoryService.existsByName(category.getName())) {
            return ResponseEntity.badRequest().body("Catégorie déjà existante.");
        }
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Catégorie supprimée.");
    }
}
