import Modal from 'react-modal';
import { useModalStore } from '../hooks/useModalStore';
import { useEffect } from 'react';
import { useProductStore } from '../hooks/useProductStore';

export function DeleteVariantConfirmationModal() {
  const { isDeleteVariantConfirmationModalOpen, closeDeleteVariantConfirmationModal } = useModalStore();
  const { activeVariant, deleteVariant } = useProductStore();

  function handleConfirmDelete() {
    // Aquí puedes agregar la lógica para confirmar la eliminación de la variante
    deleteVariant(activeVariant.uuid);
    closeDeleteVariantConfirmationModal();
  }

  function handleCancelDelete() {
    // Aquí puedes agregar la lógica para cancelar la eliminación de la variante

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
      className="bg-white rounded-lg text-gray-800 w-1/3 outline-none p-4"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center"
      closeTimeoutMS={50}
    >
      <div className="max-w-sm">
        <h1 className="text-xl font-bold mb-4">Confirmar eliminación</h1>
        <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar esta variante?</p>
        <div className="flex flex-col">
          <p className="text-gray-700 font-semibold mb-2">SKU: {activeVariant.sku}</p>
          <p className="text-gray-700 font-semibold mb-2">Stock: {activeVariant.stock}</p>
          <p className="text-gray-700 font-semibold mb-2">Precio: ${activeVariant.price}</p>
          <p className="text-gray-700 font-semibold mb-2">Tamaño: {activeVariant.size_id}</p>
          <p className="text-gray-700 font-semibold mb-2">Material: {activeVariant.material_id}</p>
          <p className="text-gray-700 font-semibold mb-2">UPC: {activeVariant.upc}</p>
          <p className="text-gray-700 font-semibold mb-2">Color: {activeVariant.color_id}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCancelDelete}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md mr-2 hover:bg-gray-400 transition duration-300 ease-in-out"
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
