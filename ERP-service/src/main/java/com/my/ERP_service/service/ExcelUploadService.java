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
                if (row == null) continue;

                // Create a new Product object manually
                Product product = new Product();

                // Use Setters to assign values instead of .builder()
                product.setPn(getCellValueAsString(row.getCell(0)));
                product.setMLot(getCellValueAsString(row.getCell(1)));

                if (row.getCell(2) != null) {
                    product.setExpiredDate(row.getCell(2).getDateCellValue()
                            .toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
                }

                product.setCost(getCellValueAsBigDecimal(row.getCell(3)));
                product.setStockQt(getCellValueAsInt(row.getCell(4)));
                product.setPrice(getCellValueAsBigDecimal(row.getCell(5)));

                products.add(product);
            }
            productRepository.saveAll(products);
        }
    }

    // --- Safe Helper Methods ---

    private String getCellValueAsString(Cell cell) {
        if (cell == null) return "";

        // Check what kind of data is in the cell
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                // This converts the number 100 to the string "100"
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
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