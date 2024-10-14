import {
  Link,
  useLocation,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import { getSuppliers } from "../services/SupplierService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Supplier } from "../types";
import SupplierDetails from "../components/SupplierDetails";

export async function loader() {
  const suppliers = await getSuppliers();
  return suppliers;
}

export default function Suppliers() {
  const location = useLocation();
  const navigate = useNavigate();
  const suppliers = useLoaderData() as Supplier[];
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setShowMessage(true);

      const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
      const closeTimer = setTimeout(() => {
        setShowMessage(false);
        setFadeOut(false);
        navigate(location.pathname, { replace: true });
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [location, navigate]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black text-slate-500">Proveedores</h2>
        <Link
          to="/suppliers/new"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white font-bold rounded shadow-lg hover:from-gray-700 hover:via-gray-800 hover:to-black transition-all duration-200 ease-in-out transform hover:scale-105 space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span>Agregar</span>
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto border-collapse">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2 text-center">Nombre</th>
              <th className="p-2 text-center">Teléfono</th>
              <th className="p-2 text-center">Correo</th>
              <th className="p-2 text-center">Dirección</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <SupplierDetails key={supplier.supplierId} supplier={supplier} />
            ))}
          </tbody>
        </table>
      </div>

      {showMessage && (
        <div className={`alert_wrapper active ${fadeOut ? "fade-out" : ""}`}>
          <div className="alert_item alert_success">
            <div className="icon data_icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div className="data">
              <p className="title">
                <span>Éxito:</span> {message}
              </p>
              <p className="sub">El proveedor ha sido añadido correctamente.</p>
            </div>
            <div className="icon close" onClick={() => setShowMessage(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="progress_border"></div>
          </div>
        </div>
      )}
    </>
  );
}
