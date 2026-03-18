package com.my.ERP_service.repository;

import com.my.ERP_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE " +
            "(:id IS NULL OR p.id = :id) AND " +
            "(:pn IS NULL OR p.pn LIKE %:pn%) AND " +
            "(:mLot IS NULL OR p.mLot = :mLot) AND " + // Changed to exact match for specific number
            "(:expiredDate IS NULL OR p.expiredDate = :expiredDate) AND " +
            "(:cost IS NULL OR p.cost = :cost) AND " +
            "(:stockQt IS NULL OR p.stockQt = :stockQt) AND " + // Numeric match
            "(:price IS NULL OR p.price = :price) AND " +
            "(:salesQt IS NULL OR p.salesQt = :salesQt) AND " +
            "(:addQt IS NULL OR p.addQt = :addQt)")
    List<Product> findByAdvancedFilters(
            @Param("id") Long id,
            @Param("pn") String pn,
            @Param("mLot") String mLot,
            @Param("expiredDate") LocalDate expiredDate,
            @Param("cost") Double cost,
            @Param("stockQt") Integer stockQt,
            @Param("price") Double price,
            @Param("salesQt") Integer salesQt,
            @Param("addQt") Integer addQt
    );
}