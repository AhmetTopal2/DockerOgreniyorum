package com.product.service.seller;

import java.util.List;
import com.product.model.Seller;

public interface ISellerService {
    List<Seller> getAllSellers();
    
    Seller getSellerById(Long id);
    
    Seller createSeller(Seller seller);
    
    Seller updateSeller(Long id, Seller seller);
    
    void deleteSeller(Long id);
} 