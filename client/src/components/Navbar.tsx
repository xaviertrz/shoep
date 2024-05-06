import { Link } from 'react-router-dom';
/* import SearchBar from './SearchBar';
import { CartButton } from './CartButton'; */
import { Menu } from './Menu';

export function Navbar() {
  return (
    <nav className="flex w-full tracking-tight">
      <div className="flex w-1/3 justify-start">
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

      <div className="flex justify-end w-1/3">
        <div className="flex">
          <Menu />
        </div>
      </div>
    </nav>
  );
}
