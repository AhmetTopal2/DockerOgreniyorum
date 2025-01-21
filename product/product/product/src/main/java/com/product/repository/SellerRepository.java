package com.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.product.model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    
    @Modifying
    @Query("UPDATE Seller s SET s.name = :#{#seller.name}, " +
           "s.surname = :#{#seller.surname}, " +
           "s.email = :#{#seller.email}, " +
           "s.phone = :#{#seller.phone}, " +
           "s.bio = :#{#seller.bio}, " +
           "s.address = :#{#seller.address}, " +
           "s.isActive = :#{#seller.isActive}, " +
           "s.updatedDate = CURRENT_TIMESTAMP " +
           "WHERE s.id = :id")
    void updateExistingSeller(Long id, Seller seller);
} 