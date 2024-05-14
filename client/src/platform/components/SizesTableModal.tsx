import Modal from 'react-modal';
import { useModalStore } from '../hooks/useModalStore';
import { useEffect } from 'react';
import { useProductOptionsStore } from '../hooks/useProductOptionsStore';
import { AiOutlineClose } from 'react-icons/ai';

export function SizesTableModal() {
  const { isSizeTableModalOpen, closeSizeTableModal } = useModalStore();
  const { fetchProductOptions, sizes } = useProductOptionsStore();

  useEffect(() => {
    return () => {
      closeSizeTableModal();
    };
  }, []);

  useEffect(() => {
    fetchProductOptions();
  }, []);

  return (
    <Modal
      isOpen={isSizeTableModalOpen}
      onRequestClose={closeSizeTableModal}
      className="bg-white text-gray-800 w-3/4 md:w-1/3 outline-none p-4"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center"
      closeTimeoutMS={50}
    >
      <div className="flex flex-col">
        <div className="flex w-full justify-between items-center  mb-4">
          <h2 className="text-2xl uppercase font-serif font-medium text-left text-gray-800">Guía de tallas</h2>
          <button type="button" onClick={closeSizeTableModal}>
            <AiOutlineClose size={20} className="text-gray-900 hover:text-gray-500 transition-all duration-200" />
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Talla</th>
              <th className="border border-gray-300 p-2">Centímetros</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map(size => (
              <tr key={size.size_id}>
                <td className="border border-gray-300 p-2">{size.size_number}</td>
                <td className="border border-gray-300 p-2">{size.size_centimeters} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
