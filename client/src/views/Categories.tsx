import {
  Link,
  useLocation,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import { getCategories } from "../services/CategoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Category } from "../types";
import CategoryDetails from "../components/CategoryDetails";

export async function loader() {
  const categories = await getCategories();
  return categories;
}

export default function Categories() {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = useLoaderData() as Category[];
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
        <h2 className="text-4xl font-black text-slate-500">Categorías</h2>
        <Link
          to="/categories/new"
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
              <th className="p-2 text-center">Descripción</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <CategoryDetails key={category.categoryId} category={category} />
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
              <p className="sub">La categoría ha sido añadida correctamente.</p>
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
