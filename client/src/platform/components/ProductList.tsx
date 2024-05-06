import { useEffect, useState } from 'react';
import { useProductStore } from '../hooks/useProductStore';
import { ProductPreview } from './ProductPreview';
import { useParams } from 'react-router-dom';

export function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams<{ id: string }>();
  const { fetchProductsByCategoryId, cleanList } = useProductStore();
  const { products } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductsByCategoryId(parseInt(id), currentPage);
    } else {
      cleanList();
    }
  }, [id, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  if (!id) {
    return <div className="w-full flex font-light text-xl">Selecciona una categoría para ver los productos.</div>;
  }

  if (!products.length) {
    return <div className="w-full flex font-light text-xl">No se han publicado productos de esta categoría.</div>;
  }

/*   const handlePageChange = (page: number) => {
    setCurrentPage(page); 
  }; */

  return (
    <div className="flex">
      <div className="grid grid-cols-4 gap-4 w-full">
        {products.map(product => (
          <div key={product.uuid}>
            <ProductPreview product={product} />
            {/* Paginación */}
            {/* <div className="mt-8">
              <Pagination totalPages={10} onPageChange={handlePageChange} />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
