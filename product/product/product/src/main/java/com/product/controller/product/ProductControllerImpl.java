package com.product.controller.product;

import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.product.model.Product;
import com.product.response.BaseResponse;
import com.product.service.product.IProductService;

@RestController
@RequestMapping("/api/products")
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class ProductControllerImpl implements IProductController {

    @Autowired
    private IProductService productService;

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<Product>> getProductById(@PathVariable Long id) {
        Product dbProduct = productService.getProductById(id);
        BaseResponse<Product> response = new BaseResponse<>(new Date(), "Ürün başarıyla getirildi", "OK", dbProduct);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<Product>> updateProductById(@PathVariable Long id) {
        Product updatedProduct = productService.updateProductById(id);
        BaseResponse<Product> response = new BaseResponse<>(new Date(), "Ürün başarıyla güncellendi", "OK",
                updatedProduct);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @GetMapping
    public ResponseEntity<BaseResponse<List<Product>>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        BaseResponse<List<Product>> response = new BaseResponse<>(new Date(), "Tüm ürünler başarıyla getirildi", "OK",
                products);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<Void>> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        BaseResponse<Void> response = new BaseResponse<>(new Date(), "Ürün başarıyla silindi", "OK", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @PostMapping
    public ResponseEntity<BaseResponse<Product>> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        BaseResponse<Product> response = new BaseResponse<>(new Date(), "Ürün başarıyla oluşturuldu", "OK",
                createdProduct);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/search/category")
    public ResponseEntity<BaseResponse<List<Product>>> getProductsByCategoryName(@RequestParam String categoryName) {
        List<Product> products = productService.getProductsByCategoryName(categoryName);
        BaseResponse<List<Product>> response = new BaseResponse<>(new Date(), "Kategoriye göre ürünler başarıyla getirildi", "OK", products);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @GetMapping("/search/seller")
    public ResponseEntity<BaseResponse<List<Product>>> getProductsBySellerName(@RequestParam String sellerName) {
        List<Product> products = productService.getProductsBySellerName(sellerName);
        BaseResponse<List<Product>> response = new BaseResponse<>(new Date(), "Satıcıya göre ürünler başarıyla getirildi", "OK", products);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<BaseResponse<List<Product>>> getProductsByCategoryAndSellerName(
        @RequestParam(required = false) String categoryName,
        @RequestParam(required = false) String sellerName
    ) {
        List<Product> products = productService.getProductsByCategoryAndSellerName(categoryName, sellerName);
        BaseResponse<List<Product>> response = new BaseResponse<>(new Date(), "Kategori ve satıcıya göre ürünler başarıyla getirildi", "OK", products);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse<String>> handleConstraintViolationException(jakarta.validation.ConstraintViolationException e) {
        BaseResponse<String> response = new BaseResponse<>(new Date(), "Validasyon hatası", "ERROR", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
