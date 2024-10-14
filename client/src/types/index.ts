import { object, string, number, InferOutput, array } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    description: string(),
    price: number(),
    stock: number(),
    categoryId: number(),
    supplierId: number()
})

export const ProductSchema = object({
    productId: number(),
    name: string(),
    description: string(),
    price: number(),
    stock: number(),
    categoryId: number(),
    supplierId: number()
})


export const DraftCategorySchema  = object({
    name: string(),
    description: string()    
})

export const CategorySchema = object({
    categoryId: number(),
    name: string(),
    description: string()
})

export const DraftSupplierSchema = object({
    name: string(),
    phone: string(),
    email: string(),
    address: string(),
});

export const SupplierSchema = object({
    supplierId: number(),
    name: string(),
    phone: string(),
    email: string(),
    address: string(),
});

export const ProductsSchema = array(ProductSchema)
export const CategoriesSchema = array(CategorySchema)
export const SuppliersSchema = array(SupplierSchema);

export type Product = InferOutput<typeof ProductSchema>
export type Category = InferOutput<typeof CategorySchema>
export type Supplier = InferOutput<typeof SupplierSchema>;