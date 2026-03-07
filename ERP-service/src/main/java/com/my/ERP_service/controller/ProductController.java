package com.my.ERP_service.controller;

import com.my.ERP_service.service.ExcelUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*") // Allows your React app to talk to this API
public class ProductController {

    @Autowired
    private ExcelUploadService excelUploadService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelUploadService.saveProductsFromExcel(file);
            return ResponseEntity.ok(Map.of("message", "File uploaded and data saved successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Upload failed: " + e.getMessage()));
        }
    }
}