package com.product.controller.category;

import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.product.model.Category;
import com.product.response.BaseResponse;
import com.product.service.category.ICategoryService;

@RestController
@RequestMapping("/api/categories")
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryControllerImpl implements ICategoryController {

    @Autowired
    private ICategoryService categoryService;

    @Override
    @GetMapping
    public ResponseEntity<BaseResponse<List<Category>>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        BaseResponse<List<Category>> response = new BaseResponse<>(new Date(), "Tüm kategoriler başarıyla getirildi", "OK", categories);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<Category>> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        BaseResponse<Category> response = new BaseResponse<>(new Date(), "Kategori başarıyla getirildi", "OK", category);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @PostMapping
    public ResponseEntity<BaseResponse<Category>> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        BaseResponse<Category> response = new BaseResponse<>(new Date(), "Kategori başarıyla oluşturuldu", "OK", createdCategory);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<Category>> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        BaseResponse<Category> response = new BaseResponse<>(new Date(), "Kategori başarıyla güncellendi", "OK", updatedCategory);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        BaseResponse<Void> response = new BaseResponse<>(new Date(), "Kategori başarıyla silindi", "OK", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse<String>> handleConstraintViolationException(jakarta.validation.ConstraintViolationException e) {
        BaseResponse<String> response = new BaseResponse<>(new Date(), "Validasyon hatası", "ERROR", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
