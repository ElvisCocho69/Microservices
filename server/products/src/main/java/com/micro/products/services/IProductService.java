package com.micro.products.services;

import com.micro.products.dto.ProductDto;

import java.util.List;

public interface IProductService {

    /**
     *
     * @return List of Products
     */
    List<ProductDto> getAllProducts();

    /**
     *
     * @param productId - Input ProductId
     * @return Products details based on ProductId
     */
    ProductDto getProductById(Long productId);

    /**
     *
     * @param productDto - ProductDto Object
     */
    void createProduct(ProductDto productDto);

    /**
     *
     * @param productDto - ProductDto Object
     * @return boolean indicating success or failure
     */
    boolean updateProduct(Long productId, ProductDto productDto);

    /**
     *
     * @param productId - Input ProductId
     * @return boolean indicating if the delete of Product is successful or not
     */
    boolean deleteProduct(Long productId);

}