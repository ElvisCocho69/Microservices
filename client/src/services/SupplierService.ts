import { safeParse } from 'valibot';
import { DraftSupplierSchema, SuppliersSchema, SupplierSchema, Supplier } from '../types';
import axios from 'axios';

type SupplierData = {
  [k: string]: FormDataEntryValue;
};

// Método para agregar un nuevo proveedor
export async function addSupplier(data: SupplierData) {
  try {
    const result = safeParse(DraftSupplierSchema, {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/create-supplier`;
      await axios.post(url, {
        name: result.output.name,
        phone: result.output.phone,
        email: result.output.email,
        address: result.output.address,
      });
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {
    console.log('Error al agregar el proveedor:', error);
  }
}

// Método para obtener todos los proveedores
export async function getSuppliers() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/suppliers`;
    console.log(url);
    const { data } = await axios(url);
    const result = safeParse(SuppliersSchema, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error al obtener los proveedores.');
    }
  } catch (error) {
    console.log('Error al obtener los proveedores:', error);
  }
}

// Método para obtener un proveedor por ID
export async function getSupplierById(supplierId: number) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/supplier/${supplierId}`;
    const { data } = await axios(url);
    const result = safeParse(SupplierSchema, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error al obtener el proveedor.');
    }
  } catch (error) {
    console.log('Error al obtener el proveedor:', error);
  }
}

// Método para actualizar un proveedor
export async function updateSupplier(supplierId: number, data: SupplierData) {
  try {
    const result = safeParse(DraftSupplierSchema, {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/update-supplier/${supplierId}`;
      await axios.put(url, {
        name: result.output.name,
        phone: result.output.phone,
        email: result.output.email,
        address: result.output.address,
      });
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {
    console.log('Error al actualizar el proveedor:', error);
  }
}

export async function deleteSupplier(supplierId: Supplier['supplierId']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/delete-supplier/${supplierId}`;
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}