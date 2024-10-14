import { safeParse } from 'valibot';
import { DraftCategorySchema, CategoriesSchema, CategorySchema, Category } from '../types';
import axios from 'axios';

type CategoryData = {
  [k: string]: FormDataEntryValue;
};

// Método para agregar una nueva categoría
export async function addCategory(data: CategoryData) {
  try {
    const result = safeParse(DraftCategorySchema, {
      name: data.name,
      description: data.description,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/create-category`;
      await axios.post(url, {
        name: result.output.name,
        description: result.output.description,
      });
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/categories`;
    const { data } = await axios(url);
    const result = safeParse(CategoriesSchema, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error...');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryById(categoryId: number) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/category/${categoryId}`;
    const { data } = await axios(url);
    const result = safeParse(CategorySchema, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error...');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategory(
  categoryId: number,
  data: CategoryData
) {
  try {
    const result = safeParse(DraftCategorySchema, {
      name: data.name,
      description: data.description,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/update-category/${categoryId}`;
      await axios.put(url, {
        name: result.output.name,
        description: result.output.description,
      });
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {
    console.log('Error al actualizar la categoría:', error);
  }
}

export async function deleteCategory(categoryId: Category['categoryId']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/delete-category/${categoryId}`;
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}