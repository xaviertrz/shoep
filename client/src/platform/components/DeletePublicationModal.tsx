import Modal from 'react-modal';
import { useModalStore } from '../hooks/useModalStore';
import { useEffect } from 'react';
import { useProductStore } from '../hooks/useProductStore';

export function DeletePublicationModal() {
  const { isDeletePublicationModalOpen, closeDeletePublicationModal } = useModalStore();
  const { active, blockProduct } = useProductStore();

  function handleConfirmDelete() {
    blockProduct(active.uuid);
    closeDeletePublicationModal();
  }

  function handleCancelDelete() {
    closeDeletePublicationModal();
  }

  useEffect(() => {
    return () => {
      closeDeletePublicationModal();
    };
  }, []);

  return (
    <Modal
      isOpen={isDeletePublicationModalOpen}
      onRequestClose={closeDeletePublicationModal}
      className="bg-white rounded-lg text-gray-800 w-4/5 md:w-1/4 outline-none p-4"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center"
      closeTimeoutMS={50}
    >
      <div>
        <h1 className="text-xl font-bold mb-4">Confirmar eliminación</h1>
        <p className="text-gray-700 mb-8">¿Estás seguro de que deseas eliminar esta publicación?</p>
        <div className="flex mt-4 w-full justify-between">
          <button
            onClick={handleCancelDelete}
            className="border-2 text-gray-800 px-4 py-2 rounded-md shadow-md mr-2 hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
}
