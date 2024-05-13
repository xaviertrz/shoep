import { Link } from 'react-router-dom';
/* import SearchBar from './SearchBar';
import { CartButton } from './CartButton'; */
import { Menu } from './Menu';
import { AiOutlineMenu } from 'react-icons/ai';
import { useModalStore } from '../platform/hooks/useModalStore';
import { MenuModal } from '../platform/components/MenuModal';

export function Navbar() {
  const { openMenuModal } = useModalStore();

  return (
    <nav className="flex w-full py-4 tracking-tight items-center md:justify-normal justify-between">
      <div className="w-1/3 justify-start hidden md:block text-left">
        <Link
          to={'/catalogo'}
          className="uppercase font-light text-gray-500 hover:text-black py-5 transition-all duration-200"
        >
          Catálogo
        </Link>
      </div>

      <div className="flex justify-center items-center w-1/3">
        <Link
          to="/"
          className="font-serif font-bold text-4xl tracking-tighter lowercase underline decoration underline-offset-4"
        >
          Shoep.
        </Link>
      </div>

      <button
        data-collapse-toggle="navbar"
        type="button"
        onClick={openMenuModal}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Abrir menú</span>
        <AiOutlineMenu className="w-6 h-6" />
      </button>

      <div className="w-1/3 justify-end hidden md:flex text-right " id="navbar-default">
        <div className="flex">
          <Menu />
        </div>
      </div>

      <MenuModal />
    </nav>
  );
}
