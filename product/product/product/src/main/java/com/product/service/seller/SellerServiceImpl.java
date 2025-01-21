package com.product.service.seller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.model.Seller;
import com.product.repository.SellerRepository;

@Service
public class SellerServiceImpl implements ISellerService {
    
    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    @Override
    public Seller getSellerById(Long id) {
        Optional<Seller> seller = sellerRepository.findById(id);
        if (seller.isPresent()) {
            return seller.get();
        }
        throw new RuntimeException("Satıcı bulunamadı");
    }

    @Override
    public Seller createSeller(Seller seller) {
        seller.setCreatedDate(new Date());
        seller.setUpdatedDate(new Date());
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) {
        Optional<Seller> existingSeller = sellerRepository.findById(id);
        if (existingSeller.isPresent()) {
            seller.setId(id);
            seller.setCreatedDate(existingSeller.get().getCreatedDate());
            seller.setUpdatedDate(new Date());
            return sellerRepository.save(seller);
        }
        throw new RuntimeException("Güncellenecek satıcı bulunamadı");
    }

    @Override
    public void deleteSeller(Long id) {
        Optional<Seller> seller = sellerRepository.findById(id);
        if (seller.isPresent()) {
            sellerRepository.deleteById(id);
        } else {
            throw new RuntimeException("Silinecek satıcı bulunamadı");
        }
    }
} 