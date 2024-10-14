package com.micro.products.controller;

import com.micro.products.constants.EntityConstants;
import com.micro.products.dto.*;
import com.micro.products.services.ICategoryService;
import com.micro.products.services.IProductService;
import com.micro.products.services.ISupplierService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org. springframework. http. ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
     name = "CRUD REST APIs for Products",
     description = "CRUD REST APIs to CREATE, READ, UPDATE, DELETE Products, Categories and Suppliers"
)
@RestController
@RequestMapping(path = "/api", produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
@AllArgsConstructor
public class ProductController {

    private IProductService IProductService;
    private ICategoryService ICategoryService;
    private ISupplierService ISupplierService;

    // Product Methods ------------------------------------------------------------------------------------------
    @Operation(
            summary = "Get Products",
            description = "REST API to get all Products"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> productDtoList = IProductService.getAllProducts();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productDtoList);
    }

    @Operation(
            summary = "Get Product",
            description = "REST API to get Product by productId"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable ("productId") Long productId) {
        ProductDto productDto = IProductService.getProductById(productId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productDto);
    }

    @Operation(
            summary = "Create Product",
            description = "REST API to create new Product"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "HTTP Status CREATED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PostMapping("/create-product")
    public ResponseEntity<ResponseDto> createProduct(@Valid @RequestBody ProductDto productDto) {
        IProductService.createProduct(productDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(EntityConstants.STATUS_201, EntityConstants.MESSAGE_201_PRODUCT));
    }

    @Operation(
            summary = "Update Product",
            description = "REST API to update Product"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "417", description = "HTTP Status EXPECTATION FAILED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PutMapping("/update-product/{productId}")
    public ResponseEntity<ResponseDto> updateProduct(@Valid @PathVariable ("productId") Long productId, @RequestBody ProductDto productDto) {
        boolean updated = IProductService.updateProduct(productId, productDto);
        if (updated) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(EntityConstants.STATUS_200, EntityConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(EntityConstants.STATUS_417, EntityConstants.MESSAGE_417_UPDATE));
        }
    }

    @Operation(
            summary = "Delete Product",
            description = "REST API to delete Product"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "417", description = "HTTP Status EXPECTATION FAILED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @DeleteMapping("/delete-product/{productId}")
    public ResponseEntity<ResponseDto> deleteProduct(@PathVariable ("productId") Long productId) {
        boolean deleted = IProductService.deleteProduct(productId);
        if (deleted) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(EntityConstants.STATUS_200, EntityConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(EntityConstants.STATUS_417, EntityConstants.MESSAGE_417_DELETE));
        }
    }

    // Category Methods ------------------------------------------------------------------------------------------
    @Operation(
            summary = "Get Categories",
            description = "REST API to get all Categories"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtoList = ICategoryService.getAllCategories();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryDtoList);
    }

    @Operation(
            summary = "Get Category",
            description = "REST API to get Category by categoryId"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable ("categoryId") Long categoryId) {
        CategoryDto categoryDto = ICategoryService.getCategoryById(categoryId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryDto);
    }

    @Operation(
            summary = "Create Category",
            description = "REST API to create new Category"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "HTTP Status CREATED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PostMapping("/create-category")
    public ResponseEntity<ResponseDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        ICategoryService.createCategory(categoryDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(EntityConstants.STATUS_201, EntityConstants.MESSAGE_201_CATEGORY));
    }

    @Operation(
            summary = "Update Category",
            description = "REST API to update Category"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "417", description = "HTTP Status EXPECTATION FAILED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PutMapping("/update-category/{categoryId}")
    public ResponseEntity<ResponseDto> updateCategory(@Valid @PathVariable ("categoryId") Long categoryId, @RequestBody CategoryDto categoryDto) {
        boolean updated = ICategoryService.updateCategory(categoryId, categoryDto);
        if (updated) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(EntityConstants.STATUS_200, EntityConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(EntityConstants.STATUS_417, EntityConstants.MESSAGE_417_UPDATE));
        }
    }

    @Operation(
            summary = "Delete Category",
            description = "REST API to delete Category"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "417", description = "HTTP Status EXPECTATION FAILED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @DeleteMapping("/delete-category/{categoryId}")
    public ResponseEntity<ResponseDto> deleteCategory(@PathVariable ("categoryId") Long categoryId) {
        boolean deleted = ICategoryService.deleteCategory(categoryId);
        if (deleted) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(EntityConstants.STATUS_200, EntityConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(EntityConstants.STATUS_417, EntityConstants.MESSAGE_417_DELETE));
        }
    }

    // Supplier Methods ------------------------------------------------------------------------------------------
    @Operation(
            summary = "Get Suppliers",
            description = "REST API to get all Suppliers"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/suppliers")
    public ResponseEntity<List<SupplierDto>> getAllSuppliers() {
        List<SupplierDto> supplierDtoList = ISupplierService.getAllSuppliers();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(supplierDtoList);
    }

    @Operation(
            summary = "Get Supplier",
            description = "REST API to get Supplier by supplierId"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<SupplierDto> getSupplierById(@PathVariable ("supplierId") Long supplierId) {
        SupplierDto supplierDto = ISupplierService.getSupplierById(supplierId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(supplierDto);
    }

    @Operation(
            summary = "Create Supplier",
            description = "REST API to create new Supplier"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "HTTP Status CREATED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PostMapping("/create-supplier")
    public ResponseEntity<ResponseDto> createSupplier(@Valid @RequestBody SupplierDto supplierDto) {
        ISupplierService.createSupplier(supplierDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(EntityConstants.STATUS_201, EntityConstants.MESSAGE_201_SUPPLIER));
    }

    @Operation(
            summary = "Update Supplier",
            description = "REST API to update Supplier"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "417", description = "HTTP Status EXPECTATION FAILED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @PutMapping("/update-supplier/{supplierId}")
    public ResponseEntity<ResponseDto> updateSupplier(@Valid @PathVariable ("supplierId") Long supplierId, @RequestBody SupplierDto supplierDto) {
        boolean updated = ISupplierService.updateSupplier(supplierId, supplierDto);
        if (updated) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(EntityConstants.STATUS_200, EntityConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(EntityConstants.STATUS_417, EntityConstants.MESSAGE_417_UPDATE));
        }
    }

    @Operation(
            summary = "Delete Supplier",
            description = "REST API to delete Supplier"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK"),
            @ApiResponse(responseCode = "417", description = "HTTP Status EXPECTATION FAILED"),
            @ApiResponse(responseCode = "500", description = "HTTP Status INTERNAL SERVER ERROR", content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))
    })
    @DeleteMapping("/delete-supplier/{supplierId}")
    public ResponseEntity<ResponseDto> deleteSupplier(@PathVariable ("supplierId") Long supplierId) {
        boolean deleted = ISupplierService.deleteSupplier(supplierId);
        if (deleted) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(EntityConstants.STATUS_200, EntityConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(EntityConstants.STATUS_417, EntityConstants.MESSAGE_417_DELETE));
        }
    }

}