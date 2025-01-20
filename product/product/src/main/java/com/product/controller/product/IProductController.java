package com.product.controller.product;

import java.util.List;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import com.product.model.Product;
import com.product.response.BaseResponse;

public interface IProductController {

    ResponseEntity<BaseResponse<Product>> getProductById(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id);

    ResponseEntity<BaseResponse<Product>> updateProductById(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id);

    ResponseEntity<BaseResponse<List<Product>>> getAllProducts();

    ResponseEntity<BaseResponse<Void>> deleteProductById(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id);

    ResponseEntity<BaseResponse<Product>> createProduct(@Valid Product product);
}
