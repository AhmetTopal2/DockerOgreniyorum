package com.product.controller.seller;

import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.product.model.Seller;
import com.product.response.BaseResponse;
import com.product.service.seller.ISellerService;

@RestController
@RequestMapping("/api/sellers")
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class SellerControllerImpl implements ISellerController {

    @Autowired
    private ISellerService sellerService;

    @Override
    @GetMapping
    public ResponseEntity<BaseResponse<List<Seller>>> getAllSellers() {
        List<Seller> sellers = sellerService.getAllSellers();
        BaseResponse<List<Seller>> response = new BaseResponse<>(new Date(), "Tüm satıcılar başarıyla getirildi", "OK", sellers);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<Seller>> getSellerById(@PathVariable Long id) {
        Seller seller = sellerService.getSellerById(id);
        BaseResponse<Seller> response = new BaseResponse<>(new Date(), "Satıcı başarıyla getirildi", "OK", seller);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @PostMapping
    public ResponseEntity<BaseResponse<Seller>> createSeller(@RequestBody Seller seller) {
        Seller createdSeller = sellerService.createSeller(seller);
        BaseResponse<Seller> response = new BaseResponse<>(new Date(), "Satıcı başarıyla oluşturuldu", "OK", createdSeller);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<Seller>> updateSeller(@PathVariable Long id, @RequestBody Seller seller) {
        Seller updatedSeller = sellerService.updateSeller(id, seller);
        BaseResponse<Seller> response = new BaseResponse<>(new Date(), "Satıcı başarıyla güncellendi", "OK", updatedSeller);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<Void>> deleteSeller(@PathVariable Long id) {
        sellerService.deleteSeller(id);
        BaseResponse<Void> response = new BaseResponse<>(new Date(), "Satıcı başarıyla silindi", "OK", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse<String>> handleConstraintViolationException(jakarta.validation.ConstraintViolationException e) {
        BaseResponse<String> response = new BaseResponse<>(new Date(), "Validasyon hatası", "ERROR", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
} 