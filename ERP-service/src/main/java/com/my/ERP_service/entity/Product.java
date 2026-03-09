package com.my.ERP_service.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "product")
public class Product {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pn;
    private String mLot;
    private LocalDate expiredDate;
    private BigDecimal cost;
    private Integer stockQt;
    private BigDecimal price;

    // Remaining columns
    private Integer salesQt;
    private Integer addQt;

    // Manual No-Args Constructor
    public Product() {}
    // Manual Getters and Setters (This fixes the 'cannot find symbol' in your Service)

        public Long getId() {
            return id;
        }
        public void setId(Long id) {
            this.id = id;
        }
        public String getPn() { return pn; }
        public void setPn(String pn) { this.pn = pn; }

        public String getMLot() { return mLot; }
        public void setMLot(String mLot) { this.mLot = mLot; }

        public LocalDate getExpiredDate() { return expiredDate; }
        public void setExpiredDate(LocalDate expiredDate) { this.expiredDate = expiredDate; }

        public BigDecimal getCost() { return cost; }
        public void setCost(BigDecimal cost) { this.cost = cost; }

        public Integer getStockQt() { return stockQt; }
        public void setStockQt(Integer stockQt) { this.stockQt = stockQt; }

        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
}