import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../types";
import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
  categoryName: string;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/products");
  }
}

export default function ProductDetails({
  product,
  categoryName,
}: ProductDetailsProps) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-100">
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle table-description">
        {product.description}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        S/ {product.price.toFixed(2)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {categoryName}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {product.stock}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        <div className="button-group">
          <button
            className="edit"
            onClick={() => navigate(`/products/${product.productId}/edit`)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <Form
            method="POST"
            action={`/products/${product.productId}/delete`}
            onSubmit={(e) => {
              if (!confirm("¿Seguro que quieres borrar este producto?")) {
                e.preventDefault();
              }
            }}
          >
            <button className="delete">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
}
