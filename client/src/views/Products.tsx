import {
  Link,
  useLocation,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { getCategories } from "../services/CategoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Product, Category } from "../types";
import ProductDetails from "../components/ProductDetails";

export async function loader() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const categoryMap = (categories ?? []).reduce(
    (map: Record<number, string>, category: Category) => {
      map[category.categoryId] = category.name;
      return map;
    },
    {}
  );

  return { products, categoryMap };
}

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, categoryMap } = useLoaderData() as {
    products: Product[];
    categoryMap: Record<number, string>;
  };
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
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="/products/new"
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
              <th className="p-2 text-center">Precio</th>
              <th className="p-2 text-center">Categoría</th>
              <th className="p-2 text-center">Stock</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails
                key={product.productId}
                product={product}
                categoryName={categoryMap[product.categoryId]}
              />
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
              <p className="sub">El producto ha sido añadido correctamente.</p>
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
