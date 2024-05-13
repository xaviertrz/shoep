import { useEffect, useState } from 'react';
import { useProductStore } from '../hooks/useProductStore';
import { ProductPreview } from './ProductPreview';
import { useParams } from 'react-router-dom';

export function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams<{ id: string }>();
  const {
    fetchProductsByMaterialId,
    fetchProductsBySizeId,
    fetchProductsByColorId,
    fetchProductsByCategoryId,

    cleanList
  } = useProductStore();
  const { products } = useProductStore();

  const { pathname } = window.location;
  const endpoint = pathname.split('/')[1];

  useEffect(() => {
    if (id) {
      if (endpoint === 'categorias') {
        fetchProductsByCategoryId(Number(id), currentPage);
      }

      if (endpoint === 'materiales') {
        fetchProductsByMaterialId(Number(id), currentPage);
      }

      if (endpoint === 'tallas') {
        fetchProductsBySizeId(Number(id), currentPage);
      }

      if (endpoint === 'colores') {
        fetchProductsByColorId(Number(id), currentPage);
      }
    } else {
      cleanList();
    }
  }, [id, currentPage, endpoint]);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  if (!id) {
    return (
      <div className="ml-0 md:ml-10 w-full flex font-light text-xl mt-10 md:mt-0 text-left ">
        Selecciona una categoría para ver los productos.
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="ml-0 md:ml-10 w-full flex  mt-10 md:mt-0 text-left font-light text-xl">
        No se han publicado productos de ese/a{' '}
        {endpoint === 'materiales'
          ? 'material'
          : endpoint === 'tallas'
            ? 'talla'
            : endpoint === 'colores'
              ? 'color'
              : 'categoría'}
        .
      </div>
    );
  }

  /*   const handlePageChange = (page: number) => {
    setCurrentPage(page); 
  }; */

  return (
    <div className="flex">
      <div className="md:ml-10 grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-10 md:mt-0">
        {products.map(product => (
          <div key={product.uuid}>
            <ProductPreview product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
