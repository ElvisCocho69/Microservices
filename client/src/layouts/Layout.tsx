import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faBoxOpen,
  faTags,
  faTruck,
  faShoppingCart,
  faUsers,
  faCog,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    let sideBar = document.querySelector("aside") as HTMLElement;
    let toggle = document.querySelector("#toggle");

    if (!toggle) return;

    function handleToggle() {
      if (sideBar.classList.contains("mini")) {
        sideBar.classList.remove("mini");
        sideBar.style.width = "16rem";
      } else {
        sideBar.classList.add("mini");
        sideBar.style.width = "4rem";
      }
    }

    toggle.addEventListener("click", handleToggle);

    return () => {
      toggle.removeEventListener("click", handleToggle);
    };
  }, []);

  const isActive = (path: string): boolean => location.pathname.includes(path);

  return (
    <div className="flex">
      <aside className="bg-gray-800 text-white h-screen">
        <button id="toggle">
          <i className="text-2xl">
            <FontAwesomeIcon icon={faBars} />
          </i>
        </button>
        <div className="link">
          <ul>
            <Link to="/home">
              <li className={isActive("/home") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faHome} />
                </i>
                <label>Inicio</label>
              </li>
            </Link>

            <Link to="/products">
              <li className={isActive("/products") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faBoxOpen} />
                </i>
                <label>Productos</label>
              </li>
            </Link>

            <Link to="/categories">
              <li className={isActive("/categories") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faTags} />
                </i>
                <label>Categorías</label>
              </li>
            </Link>

            <Link to="/suppliers">
              <li className={isActive("/suppliers") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faTruck} />
                </i>
                <label>Proveedores</label>
              </li>
            </Link>

            <Link to="/sales">
              <li className={isActive("/sales") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </i>
                <label>Ventas</label>
              </li>
            </Link>

            <Link to="/clients">
              <li className={isActive("/clients") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faUsers} />
                </i>
                <label>Clientes</label>
              </li>
            </Link>
            <Link to="/settings">
              <li className={isActive("/settings") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faCog} />
                </i>
                <label>Ajustes</label>
              </li>
            </Link>
          </ul>
        </div>

        <div className="user">
          <ul>
            <li>
              <i>
                <img
                  src="./src/img/user.jpg"
                  alt="Imagen de usuario"
                  className="rounded-full w-10 h-10"
                />
              </i>
              <label>Sergio Pavo</label>
            </li>
            <Link to="/signout">
              <li className={isActive("/signout") ? "active" : ""}>
                <i>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </i>
                <label>Cerrar Sesión</label>
              </li>
            </Link>
          </ul>
        </div>
      </aside>

      <div className="w-full">
        <nav className="bg-white shadow p-4 fixed w-full z-10">
          <div className="box">
            <input type="checkbox" id="check" />
            <div className="search-box">
              <input type="text" placeholder="Escribe para buscar..." />
              <label htmlFor="check" className="icon">
                <FontAwesomeIcon icon={faSearch} />
              </label>
            </div>
          </div>
        </nav>

        <main className="mt-24 mx-auto max-w-6xl p-10 bg-white shadow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
