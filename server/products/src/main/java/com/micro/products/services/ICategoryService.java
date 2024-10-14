package com.micro.products.services;

import com.micro.products.dto.CategoryDto;

import java.util.List;

public interface ICategoryService {

    /**
     *
     * @return List of Categories
     */
    List<CategoryDto> getAllCategories();

    /**
     *
     * @param categoryId - Input CategoryId
     * @return Category details based on CategoryId
     */
    CategoryDto getCategoryById(Long categoryId);

    /**
     *
     * @param categoryDto - CategoryDto Object
     */
    void createCategory(CategoryDto categoryDto);

    /**
     *
     * @param categoryDto - CategoryDto Object
     * @return boolean indicating success or failure
     */
    boolean updateCategory(Long categoryId, CategoryDto categoryDto);

    /**
     *
     * @param categoryId - Input CategoryId
     * @return boolean indicating if the delete of Category is successful or not
     */
    boolean deleteCategory(Long categoryId);

}