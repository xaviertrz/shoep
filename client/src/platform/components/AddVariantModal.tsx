import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { IoSaveSharp } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';

import { useModalStore } from '../hooks/useModalStore';
import { useProductStore } from '../hooks/useProductStore';
import { useProductOptionsStore } from '../hooks/useProductOptionsStore';
import { IAddVariantForm } from '../interfaces/IAddVariantForm';
Modal.setAppElement('#root');

export function AddVariantModal() {
  const { productUuid } = useParams<{ productUuid: string }>();
  const { createVariant } = useProductStore();
  const { colors, materials, sizes, fetchProductOptions } = useProductOptionsStore();
  const { isAddVariantModalOpen, closeAddVariantModal } = useModalStore();
  const [variantForm, setVariantForm] = useState<IAddVariantForm>({
    product_uuid: productUuid || '',
    size_id: 0,
    material_id: 0,
    color_id: 0,
    upc: null,
    sku: null,
    stock: 0,
    price: 0,
    images: []
  });

  useEffect(() => {
    fetchProductOptions();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createVariant(variantForm);
  }

  useEffect(() => {
    return () => {
      closeAddVariantModal();
    };
  }, []);

  useEffect(() => {
    return () => {
      setVariantForm({
        product_uuid: productUuid || '',
        size_id: 0,
        material_id: 0,
        color_id: 0,
        upc: null,
        sku: null,
        stock: 0,
        price: 0,
        images: []
      });
    };
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setVariantForm({
      ...variantForm,
      [name]: value
    });
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const imagesArray: File[] = Array.from(event.target.files);
      setVariantForm({
        ...variantForm,
        images: imagesArray
      });
    }
  }

  return (
    <Modal
      isOpen={isAddVariantModalOpen}
      onRequestClose={closeAddVariantModal}
      className="sticky top-0 w-4/5 md:w-3/5 flex-col p-8 text-left border rounded-lg bg-white"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30"
      closeTimeoutMS={50}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800">Agregando variante</h2>
            <button
              type="submit"
              className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <IoSaveSharp size={20} className="text-gray-800" />
            </button>
          </div>

          <button type="button" onClick={closeAddVariantModal}>
            <AiOutlineClose size={20} className="text-gray-900 hover:text-gray-500 transition-all duration-200" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            <label htmlFor="size_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Tamaño *
            </label>
            <select
              id="size_id"
              name="size_id"
              value={variantForm.size_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
              <option value="">Seleccionar Tamaño</option>
              {sizes.map((size, index) => (
                <option key={index} value={size.size_id}>
                  {size.size_number} ({size.size_centimeters} cm)
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="material_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Material *
            </label>
            <select
              id="material_id"
              name="material_id"
              value={variantForm.material_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
              <option value="">Seleccionar Material</option>
              {materials.map((material, index) => (
                <option key={index} value={material.material_id}>
                  {material.material_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="color_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Color *
            </label>
            <select
              id="color_id"
              name="color_id"
              value={variantForm.color_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
              <option value="">Seleccionar Color</option>
              {colors.map((color, index) => (
                <option key={index} value={color.color_id}>
                  {color.color_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="stock" className="font-light text-gray-500 text-sm uppercase mb-1">
              Stock *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={variantForm.stock || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="font-light text-gray-500 text-sm uppercase mb-1">
              Precio *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={variantForm.price || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="upc" className="font-light text-gray-500 text-sm uppercase mb-1">
              UPC
            </label>
            <input
              type="text"
              id="upc"
              name="upc"
              value={variantForm.upc || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sku" className="font-light text-gray-500 text-sm uppercase mb-1">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={variantForm.sku || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="images" className="font-light text-gray-500 text-sm uppercase mb-1">
            Imágenes
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            lang="es"
            onChange={handleImageUpload}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
          <span className='text-sm font-light text-gray-400'>Mínimo 3 y máximo 5 imágenes permitidas</span>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mt-4 ml-auto"
        >
          Agregar variante
        </button>
      </form>
    </Modal>
  );
}
