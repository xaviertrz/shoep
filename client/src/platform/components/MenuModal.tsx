import Modal from 'react-modal';
import { useModalStore } from '../hooks/useModalStore';
import { useEffect } from 'react';
import { Menu } from '../../components/Menu';
import { Link } from 'react-router-dom';

export function MenuModal() {
  const { isMenuModalOpen, closeMenuModal } = useModalStore();

  useEffect(() => {
    return () => {
      closeMenuModal();
    };
  }, []);

  return (
    <Modal
      isOpen={isMenuModalOpen}
      onRequestClose={closeMenuModal}
      className="bg-white rounded-lg text-gray-800 w-2/3 outline-none p-4"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center"
      closeTimeoutMS={50}
    >
      <div className="flex flex-col text-left">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-2xl font-bold">Menú</h2>
          <hr className="my-2" />

          <button
            onClick={closeMenuModal}
            className="self-end text-gray-500 hover:text-black transition-all duration-200"
          >
            X
          </button>
        </div>

        <div className='flex flex-col gap-2'>
          <Link
            className="uppercase block font-light px-2 text-gray-500 hover:text-black transition-all duration-200"
            to={'/'}
          >
            Inicio
          </Link>
          <Link
            className="uppercase block font-light px-2 text-gray-500 hover:text-black transition-all duration-200"
            to={'/catalogo'}
          >
            Catálogo
          </Link>
          <Menu style="flex-col text-left gap-2" />
        </div>
      </div>
    </Modal>
  );
}
