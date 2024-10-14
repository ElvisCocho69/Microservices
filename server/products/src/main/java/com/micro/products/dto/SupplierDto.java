package com.micro.products.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(name = "Supplier", description = "Schema to hold information about a supplier")
public class SupplierDto {

    @Schema(description = "ID of supplier", example = "1")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long supplierId;

    @Schema(description = "Supplier name", example = "Amazon")
    @NotEmpty(message = "Supplier name cannot be empty")
    @Size(min = 5, max = 30, message = "Supplier name must be between 5 and 30 characters")
    private String name;

    @Schema(description = "Supplier phone", example = "123456789")
    @NotEmpty(message = "Supplier phone cannot be empty")
    @Pattern(regexp = "(^$|[0-9]{9})", message = "Phone number must be a valid 9 digit number")
    private String phone;

    @Schema(description = "Supplier email", example = "XHfzK@example.com")
    @NotEmpty(message = "Supplier email cannot be empty")
    @Email(message = "Email address should be a valid value")
    private String email;

    @Schema(description = "Supplier address", example = "123 Main Street, City, USA")
    @NotEmpty(message = "Supplier address cannot be empty")
    private String address;

}
