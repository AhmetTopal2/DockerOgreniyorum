package com.product.controller.seller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import com.product.model.Seller;
import com.product.response.BaseResponse;

public interface ISellerController {

    ResponseEntity<BaseResponse<List<Seller>>> getAllSellers();

    ResponseEntity<BaseResponse<Seller>> getSellerById(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id);

    ResponseEntity<BaseResponse<Seller>> createSeller(@Valid Seller seller);

    ResponseEntity<BaseResponse<Seller>> updateSeller(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id, @Valid Seller seller);

    ResponseEntity<BaseResponse<Void>> deleteSeller(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id);
} 