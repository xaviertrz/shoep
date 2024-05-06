import { Link } from 'react-router-dom';

import { IoMdAddCircle } from 'react-icons/io';
import { FaCog } from 'react-icons/fa';

import { useProductStore } from '../hooks/useProductStore';

export function ProductDashboard() {
  const { products } = useProductStore();

  return (
    <>
      {products.length > 0 ? (
        <table className="w-full">
          <thead className="flex bg-white justify-end">
            <tr>
              <th>
                <Link
                  to={'/crear-producto'}
                  className="flex items-center gap-2 px-3 rounded-md py-1 text-black font-medium border-t-2 border-x-2 border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <IoMdAddCircle size={20} />
                  Añadir producto
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col border rounded-lg">
            {products.map(product => (
              <tr key={product.id} className="border-b flex text-left items-center border-gray-200 bg-gray-50">
                <td className="px-4 py-4">
                  <img
                    src={product.product_variants?.[0]?.product_images?.[0]?.source}
                    alt={product.name}
                    className="w-12 h-12 rounded-md border-2 border-gray-300"
                  />
                </td>
                <td className="px-4 flex flex-col py-2 w-1/12">
                  <h6 className="text-gray-500 mb-1 text-xs  uppercase">Marca</h6>
                  <span className="text-black -mt-1.5">{product.brand}</span>
                </td>
                <td className="px-4 flex flex-col py-2 w-1/3">
                  <h6 className="text-gray-500 mb-1 text-xs  uppercase">Nombre del Producto</h6>
                  <span className="text-black -mt-1.5">{product.name}</span>
                </td>
                <td className="px-4 flex flex-col py-2">
                  <h6 className="text-gray-500 mb-1 text-xs uppercase">Variantes</h6>
                  <span className="text-black -mt-1.5">{product.product_variants.length}</span>
                </td>
                <td className="px-4 py-2 w-1/2 flex justify-end">
                  <Link
                    to={`/editar-producto/${product.uuid}`}
                    className="flex items-center gap-2 px-3 rounded-md py-1 bg-white text-black font-medium border border-gray-200 hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    <FaCog size={20} />
                    Modificar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-gray-500 text-lg text-center">No has publicado ningún producto.</p>
        </div>
      )}
    </>
  );
}
