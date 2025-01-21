package com.product.service.category;

import java.util.List;
import com.product.model.Category;

public interface ICategoryService {
    List<Category> getAllCategories();
    
    Category getCategoryById(Long id);
    
    Category createCategory(Category category);
    
    Category updateCategory(Long id, Category category);
    
    void deleteCategory(Long id);
}
