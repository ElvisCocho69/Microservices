package com.micro.products.impl;

import com.micro.products.dto.ProductDto;
import com.micro.products.entity.Product;
import com.micro.products.exception.EntityAlreadyExistsException;
import com.micro.products.exception.ResourceNotFoundException;
import com.micro.products.mapper.ProductMapper;
import com.micro.products.repository.CategoryRepository;
import com.micro.products.repository.ProductRepository;
import com.micro.products.repository.SupplierRepository;
import com.micro.products.services.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private ProductRepository productRepository;

    /**
     *
     * @return List of Products
     */
    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository
                .findAll()
                .stream()
                .map(ProductMapper::mapToProductDto)
                .collect(Collectors.toList());
    }

    /**
     *
     * @param productId - Input ProductId
     * @return Products details based on ProductId
     */
    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findByProductId(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "productId", productId));
        return ProductMapper.mapToProductDto(product); // Eliminar el segundo argumento
    }

    /**
     * @param productDto - ProductDto Object
     */
    @Override
    public void createProduct(ProductDto productDto) {
        categoryRepository.findByCategoryId(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", productDto.getCategoryId()));

        supplierRepository.findBySupplierId(productDto.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", "supplierId", productDto.getSupplierId()));

        Product product = ProductMapper.mapToProduct(productDto, new Product()); // Create Product
        productRepository.findByName(product.getName())
                .ifPresent(p -> {
                    throw new EntityAlreadyExistsException("Product already exists, name: " + productDto.getName());
                });
        productRepository.save(product);
    }

    /**
     * @param productDto - ProductDto Object
     * @return boolean indicating success or failure
     */
    @Override
    public boolean updateProduct(Long productId, ProductDto productDto) {
        Product product = productRepository
                .findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        boolean hasChanges = !product.equals(ProductMapper.mapToProduct(productDto, new Product()));
        if (hasChanges) {
            ProductMapper.mapToProduct(productDto, product);
            productRepository.save(product);
            return true;
        }
        return false;
    }

    /**
     * @param productId - Input ProductId
     * @return boolean indicating if the delete of Product is successful or not
     */
    @Override
    public boolean deleteProduct(Long productId) {
        Product product = productRepository
                .findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        productRepository.deleteById(product.getProductId());
        return true;
    }

}
