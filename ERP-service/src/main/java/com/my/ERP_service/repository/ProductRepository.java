package com.my.ERP_service.repository;

import com.my.ERP_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Basic CRUD (Create, Read, Update, Delete) is now automatically ready!
}