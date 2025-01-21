package com.product.service.product;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.model.Product;
import com.product.repository.ProductRepository;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return product.get();
        }
        throw new RuntimeException("Ürün bulunamadı");
    }

    @Override
    public Product updateProductById(Long id) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            return productRepository.save(product);
        }
        throw new RuntimeException("Güncellenecek ürün bulunamadı");
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public void deleteProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.deleteById(id);
        } else {
            throw new RuntimeException("Silinecek ürün bulunamadı");
        }
    }

    @Override
    public Product createProduct(Product product) {
        product.setCreatedProduct(new Date());
        return productRepository.save(product);
    }

    @Override
    public List<Product> getProductsByCategoryName(String categoryName) {
        return productRepository.findByCategoryNameContaining(categoryName);
    }

    @Override
    public List<Product> getProductsBySellerName(String sellerName) {
        return productRepository.findBySellerNameContaining(sellerName);
    }

    @Override
    public List<Product> getProductsByCategoryAndSellerName(String categoryName, String sellerName) {
        if (categoryName != null && sellerName != null) {
            return productRepository.findByCategoryNameAndSellerNameContaining(categoryName, sellerName);
        } else if (categoryName != null) {
            return productRepository.findByCategoryNameContaining(categoryName);
        } else if (sellerName != null) {
            return productRepository.findBySellerNameContaining(sellerName);
        }
        return productRepository.findAll();
    }

}
