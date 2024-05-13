import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';

import { AiOutlineClose } from 'react-icons/ai';
import { IoSaveSharp } from 'react-icons/io5';

import { useModalStore } from '../hooks/useModalStore';
import { IEditProductForm } from '../interfaces/IEditProductForm';
import { useProductStore } from '../hooks/useProductStore';
import { useCategoryStore } from '../hooks/useCategoryStore';

Modal.setAppElement('#root');

export function EditProductModal() {
  const { productUuid } = useParams<{ productUuid: string }>();
  const { categories, fetchCategories } = useCategoryStore();
  const { active, fetchProductByUuid, editProduct } = useProductStore();
  const { isEditProductModalOpen, closeEditProductModal } = useModalStore();
  const [productForm, setProductForm] = useState<IEditProductForm>({
    uuid: productUuid || '',
    category_id: 0,
    name: '',
    brand: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (productUuid) {
      fetchProductByUuid(productUuid);
    } else {
      closeEditProductModal();
    }
  }, [productUuid]);

  useEffect(() => {
    if (active) {
      setProductForm({
        uuid: active.uuid,
        category_id: active.category_id,
        name: active.name,
        brand: active.brand,
        description: active.description
      });
    }
  }, [active]);

  useEffect(() => {
    return () => {
      closeEditProductModal();
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    editProduct(productForm);
  }

  return (
    <Modal
      isOpen={isEditProductModalOpen}
      onRequestClose={closeEditProductModal}
      className="sticky top-0 w-2/3 md:w-2/5 flex-col p-8 text-left border rounded-lg bg-white"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30"
      closeTimeoutMS={50}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800">Editando producto</h2>
            <button
              type="submit"
              className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <IoSaveSharp size={20} className="text-gray-800" />
            </button>
          </div>
          <button type="button" onClick={closeEditProductModal}>
            <AiOutlineClose size={20} className="text-gray-900 hover:text-gray-500 transition-all duration-200" />
          </button>
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="productName" className="font-light text-gray-500 text-sm uppercase mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="productName"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={productForm.name}
            onChange={e => setProductForm({ ...productForm, name: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="productBrand" className="font-light text-gray-500 text-sm uppercase mb-1">
              Marca
            </label>
            <input
              type="text"
              id="productBrand"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={productForm.brand}
              onChange={e => setProductForm({ ...productForm, brand: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="productCategory" className="font-light text-gray-500 text-sm uppercase mb-1">
              Categoría
            </label>
            <select
              id="category_id"
              name="category_id"
              value={productForm.category_id}
              onChange={e => setProductForm({ ...productForm, category_id: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="productDescription" className="font-light text-gray-500 text-sm uppercase mb-1">
            Descripción
          </label>
          <textarea
            id="productDescription"
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-32 resize-none"
            value={productForm.description || ''}
            onChange={e => setProductForm({ ...productForm, description: e.target.value })}
          />
        </div>
      </form>
    </Modal>
  );
}
