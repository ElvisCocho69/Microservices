import { Link, Form, ActionFunctionArgs, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addSupplier } from "../services/SupplierService.ts";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await addSupplier(data);
  return {};
}

// Componente de registro de proveedor
export default function NewSupplier() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

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
      await addSupplier(formData);
      navigate("/suppliers", {
        state: { message: "Proveedor creado exitosamente" },
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">
          Registrar Nuevo Proveedor
        </h2>
        <Link
          to="/suppliers"
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
            Información del Proveedor
          </legend>

          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-800 font-bold mb-2"
            >
              Nombre del Proveedor:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full p-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Nombre del Proveedor"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-800 font-bold mb-2"
            >
              Teléfono:
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={`w-full p-3 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Teléfono del Proveedor"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Campo Correo */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 font-bold mb-2"
            >
              Correo Electrónico:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Correo del Proveedor"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Campo Dirección */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-800 font-bold mb-2"
            >
              Dirección:
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className={`w-full p-3 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Dirección del Proveedor"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </fieldset>

        {/* Botón de Registrar */}
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
            Registrar Proveedor
          </span>
        </button>
      </Form>
    </>
  );
}
