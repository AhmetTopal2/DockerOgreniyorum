package com.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.product.model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
} 