package com.micro.products.impl;

import com.micro.products.dto.SupplierDto;
import com.micro.products.entity.Supplier;
import com.micro.products.exception.EntityAlreadyExistsException;
import com.micro.products.exception.ResourceNotFoundException;
import com.micro.products.mapper.SupplierMapper;
import com.micro.products.repository.SupplierRepository;
import com.micro.products.services.ISupplierService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SupplierServiceImpl implements ISupplierService {

    private SupplierRepository supplierRepository;

    @Override
    public List<SupplierDto> getAllSuppliers() {
        return supplierRepository.findAll()
                .stream()
                .map(SupplierMapper::mapToSupplierDto)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierDto getSupplierById(Long supplierId) {
        Supplier supplier = supplierRepository
                .findBySupplierId(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", "supplierId", supplierId));
        return SupplierMapper.mapToSupplierDto(supplier);
    }

    /**
     * @param supplierDto - SupplierDto Object
     */
    @Override
    public void createSupplier(SupplierDto supplierDto) {
        Supplier supplier = SupplierMapper.mapToSupplier(supplierDto, new Supplier()); // Create Supplier
        supplierRepository.findByName(supplier.getName())
                .ifPresent(s -> {
                    throw new EntityAlreadyExistsException("Supplier already exists, name: " + supplierDto.getName());
                });
        supplierRepository.save(supplier);
    }

    /**
     * @param supplierId - SupplierId Object
     * @return boolean indicating success or failure
     */
    @Override
    public boolean updateSupplier(Long supplierId, SupplierDto supplierDto) {
        Supplier supplier = supplierRepository
                .findBySupplierId(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", "supplierId", supplierId));
        boolean hasChanges = !supplier.equals(SupplierMapper.mapToSupplier(supplierDto, new Supplier()));
        if (hasChanges) {
            SupplierMapper.mapToSupplier(supplierDto, supplier);
            supplierRepository.save(supplier);
            return true;
        }
        return false;
    }

    /**
     * @param supplierId - Input SupplierId
     * @return boolean indicating if the delete of Supplier is successful or not
     */
    @Override
    public boolean deleteSupplier(Long supplierId) {
        Supplier supplier = supplierRepository
                .findBySupplierId(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", "supplierId", supplierId));
        supplierRepository.deleteById(supplier.getSupplierId());
        return true;
    }
}
