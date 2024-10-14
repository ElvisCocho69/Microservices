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
import {
  updateCategory,
  getCategoryById,
} from "../services/CategoryService.ts";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Response("Categoría no encontrada", { status: 404 });

  const category = await getCategoryById(parseInt(id, 10));
  if (!category) {
    throw new Response("Categoría no encontrada", { status: 404 });
  }

  return { category };
}

export default function EditCategory() {
  const navigate = useNavigate();
  const { category } = useLoaderData() as { category: any };

  const [formData, setFormData] = useState({
    name: category.name || "",
    description: category.description || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { ...errors };

    // Validar campos vacíos
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
        await updateCategory(category.categoryId, formData);
        navigate("/categories", {
          state: { message: "Categoría actualizada exitosamente" },
        });
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        alert("Ocurrió un error al actualizar la categoría");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Editar Categoría</h2>
        <Link
          to="/categories"
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
            Información de la Categoría
          </legend>

          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-800 font-bold mb-2"
            >
              Nombre de la Categoría:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full p-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Nombre de la Categoría"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Campo Descripción */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-800 font-bold mb-2"
            >
              Descripción de la Categoría:
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className={`w-full p-3 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Descripción de la Categoría"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </fieldset>

        <Link to={"/categories"}></Link>
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
