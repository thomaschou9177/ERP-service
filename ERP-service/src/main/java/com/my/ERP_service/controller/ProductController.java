package com.my.ERP_service.controller;

import com.my.ERP_service.dto.LoginRequest;
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
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allows your React app to talk to this API
public class ProductController {

    @Autowired
    private ExcelUploadService excelUploadService;

    @Autowired
    private com.my.ERP_service.repository.ProductRepository productRepository; //

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Real-world logic: query your database for the user here
        if ("admin".equals(loginRequest.getUsername()) && "1234".equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Login successful",
                    "role", "ADMIN"
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Invalid username or password"
            ));
        }
    }

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
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}