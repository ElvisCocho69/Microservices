import { Supplier } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteSupplier } from "../services/SupplierService"; 

type SupplierDetailsProps = {
  supplier: Supplier;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteSupplier(+params.id);
    return redirect("/suppliers");
  }
}

export default function SupplierDetails({ supplier }: SupplierDetailsProps) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-100">
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {supplier.name}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {supplier.phone}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {supplier.email}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        {supplier.address}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center align-middle">
        <div className="button-group">
          <button
            className="edit"
            onClick={() => navigate(`/suppliers/${supplier.supplierId}/edit`)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <Form
            method="POST"
            action={`/suppliers/${supplier.supplierId}/delete`}
            onSubmit={(e) => {
              if (!confirm("¿Seguro que quieres borrar este proveedor?")) {
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
