import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useProductStore } from '../hooks/useProductStore';
import { useCategoryStore } from '../hooks/useCategoryStore';
import { IProductImage } from '../../interfaces/IProductImage';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { roleIds } from '../../constants/role-ids';

export function Product() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { productUuid } = useParams<{ productUuid: string }>();
  const { activeVariant, setActiveVariant } = useProductStore();
  const { categories } = useCategoryStore();
  const { active, fetchProductByUuid } = useProductStore();
  const categoryName = categories.find(category => category.id_category === active.category_id)?.category;

  const [variantImage, setVariantImage] = useState<IProductImage>();

  useEffect(() => {
    if (productUuid) {
      fetchProductByUuid(productUuid);
    }
  }, []);

  useEffect(() => {
    setActiveVariant(active?.product_variants?.[0]);
  }, [active]);

  useEffect(() => {
    setVariantImage(activeVariant?.product_images?.[0]);
  }, [activeVariant]);

  /*   useEffect(() => {
    return () => {
      setActiveVariant({} as IProductVariant);
    };
  }, []); */

  function handleClick() {
    if (user?.role_id === roleIds.SELLER) {
      Swal.fire('No puedes comprar', 'Tu cuenta no está habilitada para hacer compras', 'error');
      return;
    }

    if (activeVariant.stock === 0) {
      Swal.fire('Stock agotado', 'Lo sentimos, este producto se encuentra agotado', 'error');
    } else {
      navigate(`/comprar/${activeVariant.uuid}`);
    }
  }

  return (
    active && (
      <div className="flex flex-col border rounded-md p-4">
        <div className="flex w-full mx-auto pb-10 justify-between ">
          <div className="flex flex-col gap-2 h-full w-14">
            {activeVariant?.product_images?.map(image => {
              return (
                <img
                  key={image.id}
                  onMouseOver={() => setVariantImage(image)}
                  src={image.source}
                  alt={active?.name}
                  className={`object-cover w-14 h-14 border-2 rounded-md hover:cursor-pointer hover:border-blue-600 hover:shadow-md transition duration-300 ease-in-out ${image.id === variantImage?.id ? 'border-blue-600 shadow-md ' : 'border-gray-300'}`}
                />
              );
            })}
          </div>
          <img src={variantImage?.source} className="rounded-md max-w-xl object-contain" alt="" />
          <div className="flex flex-col h-full text-left border rounded-md w-1/3 p-4">
            <h4 className="font-light text-gray-500 text-base">{active?.brand}</h4>
            <h2 className="font-medium text-2xl -mt-1 mb-4">{active?.name}</h2>
            <h3 className="font-light text-3xl mb-8">$ {activeVariant?.price?.toLocaleString('es-co')}</h3>

            <div className="flex flex-col gap-2 mb-4">
              <div className="text-base flex gap-1">
                <h4 className="font-light">Color:</h4>
                <span className="font-medium capitalize"> {activeVariant?.product_colors?.name}</span>
              </div>
              <div className="flex gap-3">
                {active?.product_variants.map(variant => {
                  return (
                    <img
                      key={variant.id}
                      onClick={() => setActiveVariant(variant)}
                      src={variant.product_images?.[0]?.source}
                      className={`border-2 rounded-md w-12 h-12 hover:cursor-pointer hover:shadow-md transition duration-300 ease-in-out ${variant.id === activeVariant?.id ? 'border-blue-600' : 'border-gray-300'}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <h4 className="font-light text-base">Material</h4>
              <div className="flex gap-3">
                {active?.product_variants.map(variant => {
                  return (
                    <button
                      key={variant.id}
                      className={`p-2 border-2 rounded-md w-fit h-10 hover:cursor-pointer transition duration-300 ease-in-out ${variant.id === activeVariant?.id ? 'border-blue-600' : 'border-gray-300'} ${activeVariant?.product_materials !== variant.product_materials && 'hover:cursor-not-allowed bg-gray-200'}`}
                      /* onClick={() => setActive({ ...active, product_variants: [variant] })} */
                    >
                      <span className="capitalize font-light text-xs flex">{variant?.product_materials?.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <h4 className="font-light text-base">Talla</h4>
              <div className="flex gap-3">
                {active?.product_variants.map(variant => {
                  return (
                    <button
                      key={variant.id}
                      className={`border-2 rounded-md px-3 py-1 hover:cursor-pointer transition duration-300 ease-in-out ${variant.id === activeVariant?.id ? 'border-blue-600' : 'border-gray-300'} ${activeVariant?.product_sizes !== variant.product_sizes && 'hover:cursor-not-allowed bg-gray-200'}`}
                      /* onClick={() => setActive({ ...active, product_variants: [variant] })} */
                    >
                      <span className="capitalize font-light text-xs">{variant.product_sizes.number}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <h4 className="font-light text-base">Categoría</h4>
              <span className="font-medium">{categoryName}</span>
            </div>

            <div className="flex flex-col gap-1 mb-12">
              <h4 className="font-light text-base">Cantidad</h4>
              <span className="font-medium">
                {activeVariant.stock} {activeVariant.stock > 1 ? 'unidades' : 'unidad'}
              </span>
            </div>

            <div className="w-full flex">
              <button
                onClick={handleClick}
                className="bg-blue-500 text-white rounded-lg px-6 py-4 shadow-md hover:bg-blue-600 transition duration-300 ease-in-out w-full items-center text-center font-medium"
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t pt-10 text-left">
          <h2 className="font-light text-2xl mb-4">Descripción</h2>
          <p className="font-light text-base">{active?.description}</p>
        </div>
      </div>
    )
  );
}
