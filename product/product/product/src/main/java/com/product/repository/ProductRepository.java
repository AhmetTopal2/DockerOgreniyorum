package com.product.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.product.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    @Query("SELECT p FROM Product p WHERE p.category.name LIKE %:categoryName%")
    List<Product> findByCategoryNameContaining(String categoryName);
    
    @Query("SELECT p FROM Product p WHERE p.seller.name LIKE %:sellerName%")
    List<Product> findBySellerNameContaining(String sellerName);
    
    @Query("SELECT p FROM Product p WHERE p.category.name LIKE %:categoryName% AND p.seller.name LIKE %:sellerName%")
    List<Product> findByCategoryNameAndSellerNameContaining(String categoryName, String sellerName);
}
