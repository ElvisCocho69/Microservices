package com.micro.products.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(name = "Category", description = "Schema to hold information about category")
public class CategoryDto {

    @Schema(description = "ID of category", example = "1")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long categoryId;

    @Schema(description = "Name of category", example = "Electronics")
    @NotEmpty(message = "Name cannot be empty")
    @Size(min = 5, max = 30, message = "Name of category must be between 5 and 30 characters")
    private String name;

    @Schema(description = "Description of category", example = "Electronic devices")
    @NotEmpty(message = "Description cannot be empty")
    private String description;

}