import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { AuthForm } from './AuthForm';
import { useModalStore } from '../../platform/hooks/useModalStore';
Modal.setAppElement('#root');

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useModalStore();

  useEffect(() => {
    return () => {
      closeLoginModal();
    };
  }, []);

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onRequestClose={closeLoginModal}
      className="bg-white rounded-lg text-gray-800 md:w-2/3 lg:w-1/3 outline-none p-10 font-light"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30"
      closeTimeoutMS={50}
    >
      <div className="flex w-full justify-between">
        <h1 className="text-2xl">Inicio de sesión</h1>
        <h2 className="font-serif font-bold text-2xl tracking-tighter lowercase underline decoration underline-offset-4">
          Shoep.
        </h2>
      </div>
      <AuthForm />
      <span className="flex gap-1 text-center justify-center mt-4">
        ¿Aún no tienes una cuenta?{' '}
        <Link className="underline underline-offset-4" to={'/registrar'}>
          Regístrate
        </Link>
      </span>
    </Modal>
  );
}
