import { Link } from 'react-router-dom';

import { IoMdAddCircle } from 'react-icons/io';
import { FaCog } from 'react-icons/fa';

import { useProductStore } from '../hooks/useProductStore';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/IProduct';
import { SearchBox } from './SearchBox';
import { AiOutlineDislike } from 'react-icons/ai';

export function ProductDashboard() {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { products } = useProductStore();

  function handleSearch() {
    setFilteredProducts([
      ...products.filter(product => {
        // Buscar por nombre
        if (product.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        // Buscar por SKU
        if (product.product_variants.some(variant => variant?.sku?.toLowerCase().includes(search.toLowerCase()))) {
          return true;
        }
        // Buscar por UPC
        if (
          product.product_variants.some(
            variant => variant.upc && variant?.upc?.toString().includes(search.toLowerCase())
          )
        ) {
          return true;
        }
        return false;
      })
    ]);
  }

  useEffect(() => {
    if (search === '') {
      setFilteredProducts(products);
    }
  }, [products, search]);

  return (
    <>
      {products.length > 0 ? (
        <SearchBox search={search} setSearch={setSearch} handleSearch={handleSearch} />
      ) : (
        <div className="flex flex-col mt-8">
          <p className="text-gray-500 text-lg text-left mb-8">No has publicado ningún producto.</p>
        </div>
      )}

      <table className="w-full overflow-x-auto">
        <thead className="flex bg-white justify-end">
          <tr>
            <th>
              <Link
                to={'/crear-producto'}
                className={`flex items-center gap-2 px-3 rounded-md py-1 text-black font-medium  border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out ${filteredProducts.length > 0 ? 'border-t-2 border-x-2 ' : 'border-2'}`}
              >
                <IoMdAddCircle size={20} />
                Añadir producto
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className={`flex flex-col rounded-lg ${filteredProducts.length > 0 && 'border'}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <tr key={product.id} className={`flex text-left items-center border-gray-200 bg-gray-50 border-b`}>
                <td className="px-4 py-4 w-20">
                  <img
                    src={product.product_variants?.[0]?.product_images?.[0]?.source}
                    alt={product.name}
                    className="w-12 h-12 rounded-md border-2 border-gray-300"
                  />
                </td>
                <td className="px-4 flex flex-col py-2 md:w-1/12">
                  <h6 className="text-gray-500 mb-1 text-xs  uppercase">Marca</h6>
                  <span className="text-black -mt-1.5">{product.brand}</span>
                </td>
                <td className="px-4 flex flex-col py-2 md:w-1/12 tracking-tighter">
                  <h6 className="text-gray-500 mb-1 text-xs  uppercase">Sku</h6>
                  {product.product_variants.map(variant => {
                    return (
                      <span key={variant.id} className="text-black md:text-xs">
                        {variant.sku || 'N/A'}
                      </span>
                    );
                  })}
                </td>
                <td className="px-4 flex flex-col py-2 md:w-1/12 tracking-tighter">
                  <h6 className="text-gray-500 mb-1 text-xs  uppercase">Upc</h6>
                  {product.product_variants.map(variant => {
                    return (
                      <span key={variant.id} className="text-black md:text-xs">
                        {variant.upc || 'N/A'}
                      </span>
                    );
                  })}
                </td>
                <td className="px-4 flex flex-col py-2 w-60 md:w-1/3">
                  <h6 className="text-gray-500 mb-1 text-xs  uppercase">Nombre del Producto</h6>
                  <span className="text-black -mt-1.5">{product.name}</span>
                </td>
                <td className="px-4 flex flex-col py-2">
                  <h6 className="text-gray-500 mb-1 text-xs uppercase">Variantes</h6>
                  <span className="text-black -mt-1.5">{product.product_variants.length}</span>
                </td>
                {product.blocked && (
                  <td className="flex flex-col rounded-md px-4 py-1 bg-red-600">
                    <span className="text-white uppercase font-medium text-sm">Bloqueado</span>
                  </td>
                )}
                <td className="px-4 py-2 md:w-1/2 flex justify-end">
                  <Link
                    to={product.blocked ? `` : `/editar-producto/${product.uuid}`}
                    className={`flex items-center gap-2 px-3 rounded-md py-1  text-black font-medium border  transition duration-300 ease-in-out ${product.blocked ? 'hover:cursor-not-allowed bg-gray-200' : 'bg-white border-gray-200 hover:bg-gray-200'}`}
                  >
                    <FaCog size={20} />
                    Modificar
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className="flex flex-col gap-2 items-center justify-center text-center mt-5">
              <td className="flex flex-col gap-2 items-center justify-center text-center">
                <AiOutlineDislike
                  size={100}
                  className="flex p-5 rounded-full border-4 text-gray-500 items-center justify-center"
                />
                <p className="text-gray-500 text-lg">No existe esa producto</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
