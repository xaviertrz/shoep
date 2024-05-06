import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { IoSaveSharp } from 'react-icons/io5';

import { useModalStore } from '../hooks/useModalStore';
import { useEffect, useState } from 'react';
import { useProductStore } from '../hooks/useProductStore';
import { IEditVariantForm } from '../interfaces/IEditVariantForm';
import { useProductOptionsStore } from '../hooks/useProductOptionsStore';
Modal.setAppElement('#root');

export function EditVariantModal() {
  const { activeVariant, editVariant } = useProductStore();
  const { colors, materials, sizes, fetchProductOptions } = useProductOptionsStore();
  const { isEditVariantModalOpen, closeEditVariantModal } = useModalStore();
  const [variantForm, setVariantForm] = useState<IEditVariantForm>({
    uuid: '',
    size_id: 0,
    material_id: 0,
    color_id: 0,
    upc: null,
    sku: null,
    stock: 0,
    price: 0
  });

  useEffect(() => {
    fetchProductOptions();
  }, []);

  useEffect(() => {
    if (activeVariant) {
      setVariantForm({
        uuid: activeVariant.uuid,
        size_id: activeVariant.size_id,
        material_id: activeVariant.material_id,
        color_id: activeVariant.color_id,
        upc: activeVariant.upc,
        sku: activeVariant.sku,
        stock: activeVariant.stock,
        price: activeVariant.price
      });
    }
  }, [activeVariant]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    editVariant(variantForm);
  }

  useEffect(() => {
    return () => {
      closeEditVariantModal();
    };
  }, []);

  return (
    <Modal
      isOpen={isEditVariantModalOpen}
      onRequestClose={closeEditVariantModal}
      className="sticky top-0 w-2/5 flex-col p-8 text-left border rounded-lg bg-white"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30"
      closeTimeoutMS={50}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800">Editando variante</h2>
            <button
              type="submit"
              className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <IoSaveSharp size={20} className="text-gray-800" />
            </button>
          </div>
          <button type="button" onClick={closeEditVariantModal}>
            <AiOutlineClose size={20} className="text-gray-900 hover:text-gray-500 transition-all duration-200" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col">
            <label htmlFor="size_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Tamaño
            </label>
            <select
              id="size_id"
              name="size_id"
              value={variantForm.size_id}
              onChange={e => setVariantForm({ ...variantForm, size_id: Number(e.target.value) })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
              {sizes.map((size, index) => (
                <option key={index} value={size.id}>
                  {size.number}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="material_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Material
            </label>
            <select
              id="material_id"
              name="material_id"
              value={variantForm.material_id}
              onChange={e => setVariantForm({ ...variantForm, material_id: Number(e.target.value) })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
              {materials.map((material, index) => (
                <option key={index} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="color_id" className="font-light text-gray-500 text-sm uppercase mb-1">
              Color
            </label>
            <select
              id="color_id"
              name="color_id"
              value={variantForm.color_id}
              onChange={e => setVariantForm({ ...variantForm, color_id: Number(e.target.value) })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            >
              {colors.map((color, index) => (
                <option key={index} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="upc" className="font-light text-gray-500 text-sm uppercase mb-1">
              UPC
            </label>
            <input
              type="number"
              id="upc"
              name="upc"
              value={variantForm.upc || 0}
              onChange={e => setVariantForm({ ...variantForm, upc: Number(e.target.value) })}
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
              onChange={e => setVariantForm({ ...variantForm, sku: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="stock" className="font-light text-gray-500 text-sm uppercase mb-1">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={variantForm.stock}
              onChange={e => setVariantForm({ ...variantForm, stock: Number(e.target.value) })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="font-light text-gray-500 text-sm uppercase mb-1">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={variantForm.price}
              onChange={e => setVariantForm({ ...variantForm, price: Number(e.target.value) })}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
