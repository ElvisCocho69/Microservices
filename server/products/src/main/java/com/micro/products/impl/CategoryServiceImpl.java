package com.micro.products.impl;

import com.micro.products.dto.CategoryDto;
import com.micro.products.entity.Category;
import com.micro.products.exception.EntityAlreadyExistsException;
import com.micro.products.exception.ResourceNotFoundException;
import com.micro.products.mapper.CategoryMapper;
import com.micro.products.repository.CategoryRepository;
import com.micro.products.services.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements ICategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::mapToCategoryDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(Long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        return CategoryMapper.mapToCategoryDto(category);
    }

    @Override
    public void createCategory(CategoryDto categoryDto) {
        categoryRepository.findByName(categoryDto.getName())
                .ifPresent(c -> {
                    throw new EntityAlreadyExistsException("Category already exists, name: " + categoryDto.getName());
                });

        Category category = new Category();
        CategoryMapper.mapToCategory(categoryDto, category);
        categoryRepository.save(category);
    }

    @Override
    public boolean updateCategory(Long categoryId, CategoryDto categoryDto) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        // Actualiza solo si hay cambios
        if (!category.getName().equals(categoryDto.getName()) ||
                !category.getDescription().equals(categoryDto.getDescription())) {
            CategoryMapper.mapToCategory(categoryDto, category);
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCategory(Long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        categoryRepository.deleteById(category.getCategoryId());
        return true;
    }
}
