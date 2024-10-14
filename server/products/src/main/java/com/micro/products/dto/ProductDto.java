package com.micro.products.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Schema(name = "Product", description = "Schema to hold products information")
public class ProductDto {

    @Schema(description = "ID of product", example = "1")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long productId;

    @Schema(description = "Name of product", example = "Laptop")
    @NotEmpty(message = "Name cannot be empty")
    @Size(min = 5, max = 30, message = "Name of product must be between 5 and 30 characters")
    private String name;

    @Schema(description = "Description of product", example = "High-performance laptop, ideal for work and entertainment.")
    @NotEmpty(message = "Description cannot be empty")
    private String description;

    @Schema(description = "Price of product", example = "1000")
    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0.0", message = "Price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Price should be a valid number with up to 10 digits and 2 decimal places")
    private Double price;

    @Schema(description = "Stock of product", example = "10")
    @NotNull(message = "Stock cannot be null")
    @Min(value = 0, message = "Stock cannot be less than 0")
    private Integer stock;

    @Schema(description = "CategoryId of product", example = "1")
    @NotNull(message = "CategoryId cannot be null")
    @Positive(message = "CategoryId must be a positive number")
    private Long categoryId;

    @Schema(description = "SupplierId of product", example = "1")
    @NotNull(message = "SupplierId cannot be null")
    @Positive(message = "SupplierId must be a positive number")
    private Long supplierId;
}