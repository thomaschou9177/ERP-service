package com.my.ERP_service.controller;

import com.my.ERP_service.entity.Product;
import com.my.ERP_service.service.ExcelUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Allows your React app to talk to this API
public class ProductController {

    @Autowired
    private ExcelUploadService excelUploadService;

    @Autowired
    private com.my.ERP_service.repository.ProductRepository productRepository; //

    @PostMapping("/upload")
    public ResponseEntity<?> uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelUploadService.saveProductsFromExcel(file);
            return ResponseEntity.ok(Map.of("message", "File uploaded and data saved successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Upload failed: " + e.getMessage()));
        }
    }
    // 2. ADD THIS GET METHOD to fix the display issue
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}