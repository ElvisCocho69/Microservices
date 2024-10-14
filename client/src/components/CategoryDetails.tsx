import { Category } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteCategory } from "../services/CategoryService"; // Asegúrate de crear este servicio.

type CategoryDetailsProps = {
  category: Category;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteCategory(+params.id); 
    return redirect("/categories"); 
  }
}

export default function CategoryDetails({ category }: CategoryDetailsProps) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-100">
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {category.name}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle table-description">
        {category.description}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        <div className="button-group">
          <button
            className="edit"
            onClick={() => navigate(`/categories/${category.categoryId}/edit`)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <Form
            method="POST"
            action={`/categories/${category.categoryId}/delete`}
            onSubmit={(e) => {
              if (!confirm("¿Seguro que quieres borrar esta categoría?")) {
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
