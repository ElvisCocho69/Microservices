import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBoxOpen,
  faTags,
  faTruck,
  faShoppingCart,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Layout() {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img
                  src="./src/img/logo.png"
                  className="h-10 me-3"
                  alt="FlowBite Logo"
                />
              </a>
              
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="./src/img/user.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-800 border-r border-gray-700 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto bg-gray-800">
          <ul className="space-y-4 font-medium flex-grow">
            <Link to="/home">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faHome}
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="ms-3">Inicio</span>
                </a>
              </li>
            </Link>

            <Link to="/products">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 mt-2"
                >
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="ms-3">Productos</span>
                </a>
              </li>
            </Link>

            <Link to="/categories">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 mt-2"
                >
                  <FontAwesomeIcon
                    icon={faTags}
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="ms-3">Categorías</span>
                </a>
              </li>
            </Link>

            <Link to="/suppliers">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 mt-2"
                >
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="ms-3">Proveedores</span>
                </a>
              </li>
            </Link>

            <Link to="/clients">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 mt-2"
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="ms-3">Clientes</span>
                </a>
              </li>
            </Link>

            <Link to="/sales">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 mt-2"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="ms-3">Ventas</span>
                </a>
              </li>
            </Link>
          </ul>

          {/* Agregar el botón de Cerrar Sesión al final */}
          <ul className="pt-4">
            <Link to="/signout">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="ms-3">Cerrar Sesión</span>
                </a>
              </li>
            </Link>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4dark:border-gray-700 mt-11">
          <main className="mt-16 mx-auto max-w-6xl p-10 bg-white shadow">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
