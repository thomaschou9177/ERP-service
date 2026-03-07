package com.my.ERP_service.service;

import com.my.ERP_service.entity.Product;
import com.my.ERP_service.repository.ProductRepository;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelUploadService {

    @Autowired
    private ProductRepository productRepository;

    public void saveProductsFromExcel(MultipartFile file) throws IOException {
        List<Product> products = new ArrayList<>();
        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue; // Skip empty rows

                products.add(Product.builder()
                        .pn(getCellValueAsString(row.getCell(0)))
                        .mLot(getCellValueAsString(row.getCell(1)))
                        .expiredDate(row.getCell(2) != null ? row.getCell(2).getDateCellValue()
                                .toInstant().atZone(ZoneId.systemDefault()).toLocalDate() : null)
                        .cost(getCellValueAsBigDecimal(row.getCell(3)))
                        .stockQt(getCellValueAsInt(row.getCell(4)))
                        .price(getCellValueAsBigDecimal(row.getCell(5)))
                        .build());
            }
            productRepository.saveAll(products);
        }
    }

    // --- Safe Helper Methods ---

    private String getCellValueAsString(Cell cell) {
        if (cell == null || cell.getCellType() == CellType.BLANK) return "";
        return cell.getStringCellValue().trim();
    }

    private BigDecimal getCellValueAsBigDecimal(Cell cell) {
        if (cell == null || cell.getCellType() == CellType.BLANK) return BigDecimal.ZERO;
        return BigDecimal.valueOf(cell.getNumericCellValue());
    }

    private Integer getCellValueAsInt(Cell cell) {
        if (cell == null || cell.getCellType() == CellType.BLANK) return 0;
        return (int) cell.getNumericCellValue();
    }
}