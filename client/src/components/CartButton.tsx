import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
/* import CartModal from './CartModal'; */
export function CartButton() {
  /* if (cartId) {
    cart = await getCart(cartId);
  }
  return <CartModal cart={cart} />; */

  return (
    <Link to={'/carrito'} className="cursor-pointer rounded-md bg-transparent">
      <div className="flex relative border border-gray-200 justify-center rounded-md items-center w-11 h-11 text-black duration-300">
        <HiOutlineShoppingCart className="h-4 w-4 transition-all duration-300 hover:scale-110" />
      </div>
    </Link>
  );
}
