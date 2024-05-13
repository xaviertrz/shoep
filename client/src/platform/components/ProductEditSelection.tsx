import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdAddCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';
import { AiOutlineDislike } from 'react-icons/ai';

import { useProductStore } from '../hooks/useProductStore';
import { useModalStore } from '../hooks/useModalStore';
import { EditProductModal } from './EditProductModal';
import { useCategoryStore } from '../hooks/useCategoryStore';
import { EditVariantModal } from './EditVariantModal';
import { IProductVariant } from '../../interfaces/IProductVariant';
import { AddVariantModal } from './AddVariantModal';
import { DeleteVariantConfirmationModal } from './DeleteVariantConfirmationModal';
import { ImageManagerModal } from './ImageManagerModal';
import { Layout } from '../../components/Layout';
import { PageTitle } from '../../components/PageTitle';
import { calculateElapsedTime } from '../../helpers/calculateElapsedTime';
import Swal from 'sweetalert2';
import { SearchBox } from './SearchBox';

export function ProductEditSelection() {
  const navigate = useNavigate();
  const { productUuid } = useParams<{ productUuid: string }>();
  const { categories } = useCategoryStore();
  const { active, setActiveVariant, fetchProductByUuid } = useProductStore();
  const {
    openEditProductModal,
    openEditVariantModal,
    openAddVariantModal,
    openDeleteVariantConfirmationModal,
    openImageManagerModal
  } = useModalStore();
  const categoryName = categories.find(category => category.id_category === active?.category_id)?.category;
  const createdAfter = calculateElapsedTime(new Date(active?.created_at));
  const modifiedAfter = calculateElapsedTime(active.modified_at ? new Date(active.modified_at) : undefined);

  const [search, setSearch] = useState('');
  const [filteredVariants, setFilteredVariants] = useState<IProductVariant[]>([]);

  useEffect(() => {
    if (search === '') {
      setFilteredVariants(active.product_variants);
    }
  }, [search, active]);

  useEffect(() => {
    if (productUuid) {
      fetchProductByUuid(productUuid);
    }
  }, []);

  useEffect(() => {
    if (active) {
      if (active.blocked) {
        Swal.fire('Producto bloqueado', 'Este producto ha sido bloqueado por el administrador', 'warning');
        navigate('/productos');
      }
    }
  }, [active]);

  function openProductModal() {
    openEditProductModal();
  }

  function openVariantModal(variant: IProductVariant) {
    setActiveVariant(variant);
    openEditVariantModal();
  }

  function openAddMyVariantModal() {
    openAddVariantModal();
  }

  function openImageModalManager(variant: IProductVariant) {
    setActiveVariant(variant);
    openImageManagerModal();
  }

  function handleDeleteVariant(variant: IProductVariant) {
    setActiveVariant(variant);
    openDeleteVariantConfirmationModal();
  }

  function handleSearch() {
    setFilteredVariants([
      ...active.product_variants.filter(variant => {
        // Buscar por SKU
        if (variant?.sku?.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        // Buscar por UPC
        if (variant?.upc && variant?.upc?.toString().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      })
    ]);
  }

  return active ? (
    <Layout>
      <PageTitle title="Modificar Producto" />
      <div className="flex flex-col md:flex-row gap-8 w-full tracking-tight">
        {/* Sección de Imagen y Detalles del Producto */}
        <div className="w-full md:w-2/5 flex-col p-8 text-left border rounded-lg">
          <div className="flex justify-between items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800 mb-2">Datos del producto</h2>
            <button
              onClick={openProductModal}
              className="p-1.5 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <BiSolidEditAlt size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col col-span-2">
              <p className="font-light text-gray-500 text-sm uppercase">Id</p>
              <p className="text-gray-600 text-base font-semibold">{active.uuid}</p>
            </div>

            <div className="flex flex-col col-span-2">
              <p className="font-light text-gray-500 text-sm uppercase">Nombre</p>
              <p className="text-gray-600 font-semibold text-base">{active.name}</p>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <p className="font-light text-gray-500 text-sm uppercase">Categoría</p>
                <p className="text-gray-600 font-semibold text-base capitalize">{categoryName}</p>
              </div>
              <div>
                <p className="font-light text-gray-500 text-sm uppercase">Marca</p>
                <p className="text-gray-600 font-semibold text-base">{active.brand}</p>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <p className="font-light text-gray-500 text-sm uppercase">Creado</p>
                <p className="text-gray-600 font-semibold text-base">{createdAfter}</p>
              </div>
              <div>
                <p className="font-light text-gray-500 text-sm uppercase">Última vez modificado</p>
                <p className="text-gray-600 font-semibold text-base">{modifiedAfter || 'Nunca'}</p>
              </div>
            </div>

            <div className="flex flex-col col-span-2">
              <p className="font-light text-gray-500 text-sm uppercase">Descripción</p>
              <p className="text-gray-600 font-semibold text-base">{active.description || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Sección de Variantes */}
        <div className="flex w-full md:w-3/5 py-8 flex-col text-left">
          <div className="flex justify-between items-center gap-6 mb-6">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800 mb-2">Variantes</h2>
            <button
              onClick={openAddMyVariantModal}
              className="py-1.5 px-2.5 flex border-2 items-center gap-2 text-black border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <IoMdAddCircle size={20} />
              <span className="font-medium">Agregar variante</span>
            </button>
          </div>
          <SearchBox search={search} setSearch={setSearch} handleSearch={handleSearch} />
          <ul className="flex flex-col gap-10 mt-5">
            {filteredVariants.length > 0 ? (
              filteredVariants?.map(variant => (
                <li
                  key={variant.uuid}
                  className="justify-between border-gray-300 grid p-8 border rounded-lg grid-cols-1 md:grid-cols-2 gap-2"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col col-span-2">
                      <p className="font-light text-gray-500 text-sm uppercase">Id</p>
                      <p className="text-gray-600 text-base font-semibold">{variant.uuid}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full ">
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">Color</p>
                        <p className="text-gray-600 font-semibold text-base">{variant.product_colors?.name}</p>
                      </div>
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">Material</p>
                        <p className="text-gray-600 font-semibold text-base">{variant.product_materials?.name}</p>
                      </div>
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">Talla</p>
                        <p className="text-gray-600 font-semibold text-base">
                          {variant.product_sizes?.number}{' '}
                          <span className="font-light text-xs">({variant.product_sizes?.centimeters} cm)</span>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full ">
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">SKU</p>
                        <p className="text-gray-600 font-semibold text-base">{variant.sku || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">UPC</p>
                        <p className="text-gray-600 font-semibold text-base">{variant.upc || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-full gap-4">
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">En stock</p>
                        <p className="text-gray-600 font-semibold text-base">
                          {variant.stock} {variant.stock > 1 ? 'unidades' : 'unidad'}
                        </p>
                      </div>
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">Precio</p>
                        <p className="text-gray-600 font-semibold text-base">
                          $ {variant.price.toLocaleString('es-CO')}{' '}
                          <span className="uppercase text-xs text-gray-400">COP</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-col text-left">
                      <h4 className="font-medium text-gray-600 mb-2 flex">Imágenes</h4>
                      <div className="flex gap-2">
                        {variant.product_images?.map(image => (
                          <img
                            key={image.id}
                            src={image.source}
                            alt=""
                            className="w-10 h-10 rounded-md border-2 border-gray-300 object-cover"
                          />
                        ))}
                        <button
                          onClick={() => openImageModalManager(variant)}
                          className="flex items-center justify-center w-10 h-10 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
                        >
                          <FaCog size={20} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full md:mt-0 mt-4">
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">Creado</p>
                        <p className="text-gray-600 font-semibold text-base">
                          {calculateElapsedTime(new Date(variant.created_at))}
                        </p>
                      </div>
                      <div>
                        <p className="font-light text-gray-500 text-sm uppercase">Modificado</p>
                        <p className="text-gray-600 font-semibold text-base">
                          {calculateElapsedTime(variant.modified_at ? new Date(variant.modified_at) : undefined)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end mt-4 md:mt-0">
                      <div className="flex gap-2 items-end">
                        <button
                          onClick={() => openVariantModal(variant)}
                          className="p-1.5 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
                        >
                          <BiSolidEditAlt size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteVariant(variant)}
                          className="p-1.5 border bg-red-500 text-white border-red-400 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                          <MdDeleteForever size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col gap-2 items-center text-center mt-5">
                <div className="flex p-5 rounded-full border-4 text-gray-500 items-center justify-center">
                  <AiOutlineDislike size={100} className="text-gray-500" />
                </div>
                <p className="text-gray-500 text-lg">No existe esa variante</p>
              </div>
            )}
          </ul>
        </div>

        <EditProductModal />
        <EditVariantModal />
        <AddVariantModal />
        <DeleteVariantConfirmationModal />
        <ImageManagerModal />
      </div>
    </Layout>
  ) : (
    <div className="flex flex-col items-center justify-center mt-8">
      <p className="text-gray-500 text-lg text-center">El producto no existe o fue eliminado.</p>
    </div>
  );
}
