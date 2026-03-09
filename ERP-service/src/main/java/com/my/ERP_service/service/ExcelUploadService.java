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

                Product product = new Product();

                // PN is Column B (1), M Lot is Column C (2)
                product.setPn(getCellValueAsString(row.getCell(1)));
                product.setMLot(getCellValueAsString(row.getCell(2)));

                // Expired Date is Column D (3)
                if (row.getCell(3) != null && DateUtil.isCellDateFormatted(row.getCell(3))) {
                    product.setExpiredDate(row.getCell(3).getDateCellValue()
                            .toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
                }

                // Cost is Column E (4) - Use helper to strip '$'
                String costStr = cleanNumericString(getCellValueAsString(row.getCell(4)));
                product.setCost(new BigDecimal(costStr.isEmpty() ? "0" : costStr));

                // Stock Qt is Column F (5) - Use helper to handle "10K"
                String stockStr = getCellValueAsString(row.getCell(5));
                product.setStockQt(parseStockQuantity(stockStr));

                // Price is Column G (6)
                String priceStr = cleanNumericString(getCellValueAsString(row.getCell(6)));
                product.setPrice(new BigDecimal(priceStr.isEmpty() ? "0" : priceStr));

                products.add(product);
            }
            productRepository.saveAll(products);
        }
    }

    // --- Safe Helper Methods ---

    private String getCellValueAsString(Cell cell) {
        if (cell == null) return "";

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                // This safely handles numbers and prevents the "Cannot get STRING" error
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                }
                // Use DataFormatter to get exactly what you see in the Excel cell
                DataFormatter formatter = new DataFormatter();
                return formatter.formatCellValue(cell);
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
    private String cleanNumericString(String value) {
        if (value == null) return "0";
        // Removes everything except numbers and the decimal point
        return value.replaceAll("[^\\d.]", "");
    }

    private Integer parseStockQuantity(String value) {
        if (value == null || value.isEmpty()) return 0;

        value = value.toUpperCase().trim();
        try {
            if (value.endsWith("K")) {
                float num = Float.parseFloat(value.replace("K", ""));
                return (int) (num * 1000);
            }
            return Integer.parseInt(value.replaceAll("[^\\d]", ""));
        } catch (NumberFormatException e) {
            return 0;
        }
    }

}