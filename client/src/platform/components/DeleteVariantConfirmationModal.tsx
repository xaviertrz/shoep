import Modal from 'react-modal';
import { useModalStore } from '../hooks/useModalStore';
import { useEffect } from 'react';
import { useProductStore } from '../hooks/useProductStore';

export function DeleteVariantConfirmationModal() {
  const { isDeleteVariantConfirmationModalOpen, closeDeleteVariantConfirmationModal } = useModalStore();
  const { activeVariant, deleteVariant } = useProductStore();

  function handleConfirmDelete() {
    deleteVariant(activeVariant.uuid);
    closeDeleteVariantConfirmationModal();
  }

  function handleCancelDelete() {
    closeDeleteVariantConfirmationModal();
  }

  useEffect(() => {
    return () => {
      closeDeleteVariantConfirmationModal();
    };
  }, []);

  return (
    <Modal
      isOpen={isDeleteVariantConfirmationModalOpen}
      onRequestClose={closeDeleteVariantConfirmationModal}
      className="bg-white rounded-lg text-gray-800 w-3/4 md:w-1/3 outline-none p-4"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center"
      closeTimeoutMS={50}
    >
      <div className="max-w-sm">
        <h1 className="text-xl font-bold mb-4">Confirmar eliminación</h1>
        <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar esta variante?</p>
        <div className="flex flex-col">
          <p className="text-gray-700 font-semibold mb-2">
            Tamaño: {activeVariant.product_sizes.number} ({activeVariant.product_sizes.centimeters} cm)
          </p>
          <p className="text-gray-700 font-semibold mb-2">Material: {activeVariant.product_materials.name}</p>
          <p className="text-gray-700 font-semibold mb-2">Color: {activeVariant.product_colors.name}</p>
          <p className="text-gray-700 font-semibold mb-2">UPC: {activeVariant.upc || 'N/A'}</p>
          <p className="text-gray-700 font-semibold mb-2">SKU: {activeVariant.sku || 'N/A'}</p>
          <p className="text-gray-700 font-semibold mb-2">Stock: {activeVariant.stock}</p>
          <p className="text-gray-700 font-semibold mb-2">Precio: ${activeVariant.price}</p>
        </div>
        <div className="flex w-full items-center justify-between mt-4">
          <button
            onClick={handleCancelDelete}
            className="border-2 text-gray-800 px-4 py-2 rounded-md shadow-md mr-2 hover:bg-gray-400 transition duration-300 ease-in-out"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Confirmar eliminación
          </button>
        </div>
      </div>
    </Modal>
  );
}
