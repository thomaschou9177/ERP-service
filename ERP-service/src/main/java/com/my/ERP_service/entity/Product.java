package com.my.ERP_service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "product")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pn")
    private String pn; // Part Number

    @Column(name = "m_lot")
    private String mLot; // Manufacturing Lot

    @Column(name = "expired_date")
    private LocalDate expiredDate;

    private BigDecimal cost;

    @Column(name = "stock_qt")
    private Integer stockQt;

    private BigDecimal price;

    // Nullable fields for future use
    @Column(name = "sales_qt", nullable = true)
    private Integer salesQt;

    @Column(name = "add_qt", nullable = true)
    private Integer addQt;
}