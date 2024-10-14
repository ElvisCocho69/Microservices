package com.micro.products.services;

import com.micro.products.dto.SupplierDto;

import java.util.List;

public interface ISupplierService {

    /**
     *
     * @return List of Suppliers
     */
    List <SupplierDto> getAllSuppliers();

    /**
     *
     * @param supplierId - Input SupplierId
     * @return Supplier details based on SupplierId
     */
    SupplierDto getSupplierById(Long supplierId);

    /**
     *
     * @param supplierDto - SupplierDto Object
     */
    void createSupplier(SupplierDto supplierDto);

    /**
     *
     * @param supplierId - Input SupplierId
     * @return boolean indicating success or failure
     */
    boolean updateSupplier(Long supplierId, SupplierDto supplierDto);

    /**
     *
     * @param supplierId - Input SupplierId
     * @return boolean indicating if the delete of Supplier is successful or not
     */
    boolean deleteSupplier(Long supplierId);

}