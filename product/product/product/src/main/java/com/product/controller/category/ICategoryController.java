package com.product.controller.category;

import java.util.List;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import com.product.model.Category;
import com.product.response.BaseResponse;

public interface ICategoryController {

    ResponseEntity<BaseResponse<List<Category>>> getAllCategories();

    ResponseEntity<BaseResponse<Category>> getCategoryById(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id);

    ResponseEntity<BaseResponse<Category>> createCategory(@Valid Category category);

    ResponseEntity<BaseResponse<Category>> updateCategory(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id, @Valid Category category);

    ResponseEntity<BaseResponse<Void>> deleteCategory(@Min(value = 1, message = "ID 1'den küçük olamaz") Long id);

}
