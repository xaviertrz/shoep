import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBarcode } from 'react-icons/fa6';
import { SiMercadopago } from 'react-icons/si';
import { RxSize } from 'react-icons/rx';
import Swal from 'sweetalert2';

import { useProductStore } from '../hooks/useProductStore';
import { IProductImage } from '../../interfaces/IProductImage';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { roleIds } from '../../constants/role-ids';
import { DeletePublicationModal } from './DeletePublicationModal';
import { useModalStore } from '../hooks/useModalStore';
import { useQuantityStore } from '../hooks/useQuantityStore';
import { SizesTableModal } from './SizesTableModal';

export function Product() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { openDeletePublicationModal, openSizeTableModal } = useModalStore();
  const { productUuid } = useParams<{ productUuid: string }>();
  const { activeVariant, setActiveVariant } = useProductStore();
  const { active, fetchProductByUuid } = useProductStore();
  const { quantity, setQuantity, increaseQuantityByOne, decreaseQuantityByOne } = useQuantityStore();

  const [variantImage, setVariantImage] = useState<IProductImage>();

  useEffect(() => {
    if (productUuid) {
      fetchProductByUuid(productUuid);
    }
  }, []);

  useEffect(() => {
    if (active) {
      if (active?.blocked) {
        Swal.fire('Producto bloqueado', 'Este producto ha sido bloqueado por el administrador', 'error');
        navigate('/catalogo');
      }
    }
  }, [active]);

  useEffect(() => {
    setActiveVariant(active?.product_variants?.[0]);
  }, [active]);

  useEffect(() => {
    setVariantImage(activeVariant?.product_images?.[0]);
  }, [activeVariant]);

  useEffect(() => {
    if (activeVariant && activeVariant.stock > 0) {
      setQuantity(1);
    }
  }, [activeVariant]);

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value <= activeVariant.stock && value > 0) {
      setQuantity(value);
    }
  }

  function handleClick() {
    if (user?.role_id === roleIds.SELLER) {
      Swal.fire('No puedes comprar', 'Tu cuenta no está habilitada para hacer compras', 'error');
      return;
    }

    if (user?.role_id === roleIds.ADMIN) {
      openDeletePublicationModal();
      return;
    }

    if (!user) {
      Swal.fire('Inicia sesión', 'Ingresa a tu cuenta para continuar', 'info');
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
      <div className="flex flex-col mt-14 pb-32">
        <div className="flex flex-col md:flex-row w-full mx-auto justify-between">
          <div className="flex flex-row md:flex-col gap-2 h-fit w-52 md:mb-0 mb-5 bg-white items-start">
            {activeVariant?.product_images?.map(image => {
              return (
                <img
                  key={image.id}
                  onMouseOver={() => setVariantImage(image)}
                  src={image.source}
                  alt={active?.name}
                  className={`object-cover w-24 h-24  rounded-md hover:cursor-pointer hover:border-blue-600 hover:shadow-md transition duration-300 ease-in-out ${image.id === variantImage?.id ? 'border-2 border-blue-600 shadow-md ' : ''}`}
                />
              );
            })}
          </div>
          <img src={variantImage?.source} className="rounded-md w-full md:w-2/5 ml- object-contain " alt="" />
          <div className="flex flex-col mt-10 md:mt-0  md:ml-10 h-full text-left w-full md:w-3/5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="font-bold text-2xl -mt-1">{active?.name}</h2>
                <h4 className="font-light text-gray-500 text-sm mb-4 uppercase">Marca: {active?.brand}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-light text-sm ml-2">{activeVariant.upc || 'N/A'}</span>
                <FaBarcode size={24} />
              </div>
            </div>

            <span className="ml-5 uppercase text-sm text-gray-500 tracking-tighter">
              {' '}
              Sku: {activeVariant.sku || 'N/A'}
            </span>
            <h3 className="text-4xl mb-8 font-serif tracking-tighter">
              $ {activeVariant?.price?.toLocaleString('es-co')}{' '}
              <span className="text-base font-light font-sans tracking-normal text-gray-500">COP</span>
            </h3>

            <div className="flex flex-col gap-0.5 mb-4">
              <div className="text-sm flex items-center gap-2">
                <h4 className="font-light uppercase ">Color:</h4>
                <span className="font-bold capitalize"> {activeVariant?.product_colors?.name}</span>
              </div>
              <div className="flex gap-3">
                {active?.product_variants.map(variant => {
                  return (
                    <img
                      key={variant.id}
                      onClick={() => setActiveVariant(variant)}
                      src={variant.product_images?.[0]?.source}
                      className={`border-2 rounded-md w-16 h-16 hover:cursor-pointer hover:shadow-md transition duration-300 ease-in-out object-cover ${variant.id === activeVariant?.id ? 'border-blue-600' : 'border-gray-300'}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-0.5 mb-4">
              <h4 className="font-light text-sm uppercase">Material</h4>
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

            <div className="flex flex-col gap-0.5 mb-4 w-full">
              <div className="flex gap-2 items-center w-full justify-between">
                <h4 className="font-light text-sm uppercase">Talla</h4>
                <div className="flex gap-0.5 items-center">
                  <button
                    onClick={openSizeTableModal}
                    className="text-xs underline uppercase tracking-tight font-semibold"
                  >
                    Tabla de tallas
                  </button>
                  <RxSize size={15} />
                </div>
              </div>
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
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full mb-1 font-light text-sm">
              <span>Disponibles: {activeVariant.stock}</span>
              <div className="flex items-center gap-1">
                <SiMercadopago size={30} />
                <p>
                  Paga con{' '}
                  <a href="https://www.mercadopago.com.co/home" className="font-normal text-blue-700 underline">
                    Mercado Pago
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full flex items-center gap-4">
              <form className="items-center flex flex-col">
                <div className="flex items-center border-2 rounded-md">
                  <button
                    type="button"
                    id="decrement-button"
                    onClick={decreaseQuantityByOne}
                    data-input-counter-decrement="quantity-input"
                    className={`px-3 py-2 rounded-l-md transition items-center duration-300 ease-in-out text-xl ${quantity === 1 || user?.role_id === roleIds.ADMIN ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-blue-700 hover:text-white'}	`}
                    disabled={quantity === 1 || user?.role_id === roleIds.ADMIN}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    id="quantity-input"
                    data-input-counter
                    aria-describedby="helper-text-explanation"
                    className="h-11 text-center text-gray-900 text-sm w-10"
                    value={quantity}
                    onChange={handleQuantityChange}
                    required
                    disabled={user?.role_id === roleIds.ADMIN}
                  />
                  <button
                    type="button"
                    id="increment-button"
                    onClick={increaseQuantityByOne}
                    data-input-counter-increment="quantity-input"
                    className={` px-3 py-2 rounded-r-md transition duration-300 ease-in-out text-xl items-center ${activeVariant.stock === quantity || user?.role_id === roleIds.ADMIN ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-blue-700 hover:text-white'}`}
                    disabled={activeVariant.stock === quantity || user?.role_id === roleIds.ADMIN}
                  >
                    +
                  </button>
                </div>
              </form>

              <button
                onClick={handleClick}
                className={` text-white uppercase tracking-tighter text-sm font-bold rounded-md px-6 py-3 shadow-md transition duration-300 ease-in-out w-full items-center text-center ${user?.role_id === roleIds.ADMIN ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {user?.role_id === roleIds.ADMIN ? 'Eliminar publicación' : 'Comprar ahora'}
              </button>
            </div>
            <p className="text-sm tracking-tighter text-gray-400 mt-4">
              Publicado por:{' '}
              <Link to={`/perfil/${active.users.uuid}`} className="underline text-blue-600">
                {active.users.username}
              </Link>
            </p>
          </div>
        </div>
        {active.description && (
          <div className="w-3/5 mx-auto mt-8">
            <h3 className="text-2xl font-bold">Descripción</h3>
            <p className="text-gray-500 text-sm mt-2">{active.description}</p>
          </div>
        )}
        {user?.role_id === roleIds.ADMIN && <DeletePublicationModal />}
        <SizesTableModal />
      </div>
    )
  );
}
