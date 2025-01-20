package com.product.service.product;

import java.util.List;

import com.product.model.Product;

public interface IProductService {

    Product getProductById(Long id);

    Product updateProductById(Long id);

    List<Product> getAllProducts();

    void deleteProductById(Long id);

    Product createProduct(Product product);

}
