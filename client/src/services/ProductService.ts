import { safeParse } from 'valibot'
import { DraftProductSchema,ProductsSchema, Product, ProductSchema } from "../types"
import axios from 'axios'
    
type ProductData = {
    [k: string]: FormDataEntryValue;
}
    
export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            description: data.description,
            price: +data.price,
            stock: +data.stock,
            categoryId: +data.categoryId,
            supplierId: +data.supplierId
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/create-product`
            await axios.post(url, {
                name: result.output.name,
                description: result.output.description,
                price: result.output.price,
                stock: result.output.stock,
                categoryId: result.output.categoryId,
                supplierId: result.output.supplierId
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data)     
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}    

export async function getProductById(productId: Product['productId']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/product/${productId}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data)        
        console.log(result)
        console.log(url)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}   

export async function updateProduct(productId: Product['productId'], data: ProductData) {
    try {
      const result = safeParse(DraftProductSchema, {
        name: data.name,
        description: data.description,
        price: +data.price,
        stock: +data.stock,
        categoryId: +data.categoryId,
        supplierId: +data.supplierId,
      });
  
      if (result.success) {
        const url = `${import.meta.env.VITE_API_URL}/api/update-product/${productId}`;
        await axios.put(url, {
          name: result.output.name,
          description: result.output.description,
          price: result.output.price,
          stock: result.output.stock,
          categoryId: result.output.categoryId,
          supplierId: result.output.supplierId,
        });
      } else {
        throw new Error('Datos no válidos');
      }
    } catch (error) {
      console.log('Error al actualizar el producto:', error);
    }
  }

  export async function deleteProduct(productId: Product['productId']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/delete-product/${productId}`;
        await axios.delete(url)
    }catch(error){
        console.log(error)
    }
  }