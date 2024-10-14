import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader } from "./views/Products.tsx";
import Categories, { loader as categoriesLoader } from "./views/Categories.tsx";
import Suppliers, { loader as suppliersLoader } from "./views/Suppliers.tsx";
import EditProduct, { loader as editProductLoader } from "./views/EditProduct.tsx";
import EditCategory, { loader as editCategoryLoader } from "./views/EditCategory.tsx";
import EditSupplier, { loader as editSupplierLoader } from "./views/EditSupplier.tsx";
import NewProduct, { action as newProductAction, loader as comboLoader } from "./views/NewProduct.tsx";
import NewCategory, { action as NewCategoryAction } from "./views/NewCategory.tsx";
import NewSupplier, { action as newSupplierAction } from "./views/NewSuppliers.tsx";
import Index from "./views/Index.tsx";
import Clients from "./views/Clients.tsx";
import Sales from "./views/Sales.tsx";
import Settings from "./views/Settings.tsx";
import SignOut from "./views/SignOut.tsx";
import { action as deleteProductAction } from "./components/ProductDetails.tsx";
import { action as deleteCategoryAction } from "./components/CategoryDetails";
import { action as deleteSupplierAction } from "./components/SupplierDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace={true} />,
      },
      {
        path: "home",
        element: <Index />,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction,
        loader: comboLoader,
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
        action: newProductAction,
        loader: editProductLoader,
      },
      {
        path: "products/:id/delete",
        action: deleteProductAction,
      },
      {
        path: "categories",
        element: <Categories />,
        loader: categoriesLoader,
      },
      {
        path: "categories/new",
        element: <NewCategory />,
        action: NewCategoryAction,
      },
      {
        path: "categories/:id/edit",
        element: <EditCategory />,
        action: NewCategoryAction,
        loader: editCategoryLoader,
      },
      {
        path: "categories/:id/delete",
        action: deleteCategoryAction,
      },
      {
        path: "suppliers",
        element: <Suppliers />,
        loader: suppliersLoader,
      },
      {
        path: "suppliers/new",
        element: <NewSupplier />,
        action: newSupplierAction,
      },
      {
        path: "suppliers/:id/edit",
        element: <EditSupplier />,
        action: newSupplierAction,
        loader: editSupplierLoader,
      },
      {
        path: "suppliers/:id/delete",
        action: deleteSupplierAction,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "signout",
        element: <SignOut />,
      },
    ],
  },
]);
