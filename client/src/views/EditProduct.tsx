import {
  Link,
  Form,
  useNavigate,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { updateProduct, getProductById } from "../services/ProductService.ts";
import { getCategories } from "../services/CategoryService.ts";
import { getSuppliers } from "../services/SupplierService.ts";
import { Category, Supplier } from "../types/index.ts";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Response("Producto no encontrado", { status: 404 });

  const [product, categories, suppliers] = await Promise.all([
    getProductById(parseInt(id, 10)),
    getCategories(),
    getSuppliers(),
  ]);

  if (!product) {
    throw new Response("Producto no encontrado", { status: 404 });
  }

  return { product, categories, suppliers };
}

export default function EditProduct() {
  const navigate = useNavigate();
  const { product, categories, suppliers } = useLoaderData() as {
    product: any;
    categories: Category[];
    suppliers: Supplier[];
  };

  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price?.toString() || "",
    stock: product.stock?.toString() || "",
    categoryId: product.categoryId?.toString() || "",
    supplierId: product.supplierId?.toString() || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    supplierId: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { ...errors };

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] === "") {
        newErrors[key as keyof typeof formData] = "Este campo es obligatorio";
      } else {
        newErrors[key as keyof typeof formData] = "";
      }
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      try {
        await updateProduct(product.productId, formData); // Llamada a la actualización
        navigate("/products", {
          state: { message: "Producto actualizado exitosamente" },
        });
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert("Ocurrió un error al actualizar el producto");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Editar Producto</h2>
        <Link
          to="/products"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white font-bold rounded shadow-lg hover:from-gray-700 hover:via-gray-800 hover:to-black transition-all duration-200 ease-in-out transform hover:scale-105 space-x-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          <span>Volver</span>
        </Link>
      </div>

      <Form
        method="POST"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="mb-6 border border-indigo-600 p-4 rounded-md">
          <legend className="text-2xl font-bold text-indigo-600 mb-4 border-b border-indigo-400 pb-2">
            Información del Producto
          </legend>

          {[
            { label: "Nombre del Producto", name: "name", type: "text" },
            { label: "Descripción", name: "description", type: "text" },
            { label: "Precio", name: "price", type: "number", step: "0.01" },
          ].map(({ label, name, type, step }) => (
            <div className="mb-4" key={name}>
              <label
                htmlFor={name}
                className="block text-gray-800 font-bold mb-2"
              >
                {label}:
              </label>
              <input
                id={name}
                name={name}
                type={type}
                step={step}
                className={`w-full p-3 border ${
                  errors[name as keyof typeof errors]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
                value={formData[name as keyof typeof formData]}
                onChange={handleInputChange}
              />
              {errors[name as keyof typeof errors] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof typeof errors]}
                </p>
              )}
            </div>
          ))}
        </fieldset>

        <fieldset className="mb-6 border border-indigo-600 p-4 rounded-md">
          <legend className="text-2xl font-bold text-indigo-600 mb-4 border-b border-indigo-400 pb-2">
            Detalles del Producto
          </legend>

          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-gray-800 font-bold mb-2"
            >
              Stock Disponible:
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              className={`w-full p-3 border ${
                errors.stock ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              value={formData.stock}
              onChange={handleInputChange}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}
          </div>

          {[
            { label: "Categoría", name: "categoryId", options: categories },
            { label: "Proveedor", name: "supplierId", options: suppliers },
          ].map(({ label, name, options }) => (
            <div className="mb-4" key={name}>
              <label
                htmlFor={name}
                className="block text-gray-800 font-bold mb-2"
              >
                {label}:
              </label>
              <select
                id={name}
                name={name}
                className={`w-full p-3 border ${
                  errors[name as keyof typeof errors]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
                value={formData[name as keyof typeof formData] || ""}
                onChange={handleInputChange}
              >
                <option value="">Seleccione {label.toLowerCase()}</option>
                {options.map((option) => (
                  <option
                    key={
                      (option as Category).categoryId ||
                      (option as Supplier).supplierId
                    }
                    value={
                      (option as Category).categoryId ||
                      (option as Supplier).supplierId
                    }
                  >
                    {option.name}
                  </option>
                ))}
              </select>
              {errors[name as keyof typeof errors] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof typeof errors]}
                </p>
              )}
            </div>
          ))}
        </fieldset>

        <Link to={"/products"}></Link>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 
             hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 
             text-white font-bold py-3 rounded shadow-lg 
             transition-transform duration-200 ease-in-out 
             transform hover:scale-105 flex items-center justify-center space-x-2 
             will-change-transform"
          style={{
            fontSize: "1rem",
            lineHeight: "1.5rem",
            color: "white",
          }}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          <span
            style={{
              transition: "transform 0.2s ease-in-out",
              color: "inherit",
            }}
          >
            Guardar Cambios
          </span>
        </button>
      </Form>
    </>
  );
}
