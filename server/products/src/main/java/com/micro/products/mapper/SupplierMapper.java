package com.micro.products.mapper;

import com.micro.products.dto.SupplierDto;
import com.micro.products.entity.Supplier;

public class SupplierMapper {

    public static Supplier mapToSupplier(SupplierDto supplierDto, Supplier supplier) {
        supplier.setName(supplierDto.getName());
        supplier.setPhone(supplierDto.getPhone());
        supplier.setEmail(supplierDto.getEmail());
        supplier.setAddress(supplierDto.getAddress());
        return supplier;
    }

    public static SupplierDto mapToSupplierDto(Supplier supplier) {
        SupplierDto supplierDto = new SupplierDto();
        supplierDto.setSupplierId(supplier.getSupplierId());
        supplierDto.setName(supplier.getName());
        supplierDto.setPhone(supplier.getPhone());
        supplierDto.setEmail(supplier.getEmail());
        supplierDto.setAddress(supplier.getAddress());
        return supplierDto;
    }

}
