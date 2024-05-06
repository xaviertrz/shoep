import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { ICart } from '../../interfaces/ICart';
import { onSetCart } from '../../store/cart/cartSlice';

export function useCartStore() {
  const { cart } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  async function fetchCart(userUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'cart-items';
      const response = await fetch(`${url}/${endpoint}/${userUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const cartData: ResponseDto<ICart> = await response.json();
      console.log(cartData);
      dispatch(onSetCart(cartData.success ? cartData.data! : ({} as ICart)));
    } catch (error) {
      console.error(error);
    }
  }

  async function addCartItem(cartId: number, variantUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'cart-items';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart_id: cartId, variant_uuid: variantUuid, quantity: 1 })
      });
      const cartData: ResponseDto<ICart> = await response.json();
      alert(cartData.message);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeItem(itemId: number) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'cart-items';
      const response = await fetch(`${url}/${endpoint}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const cartData: ResponseDto<ICart> = await response.json();
      console.log(cartData);
      if (cartData.success) {
        dispatch(onSetCart(cartData.data!));
      }
      alert(cartData.message);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    cart,

    // Métodos
    fetchCart,
    addCartItem,
    removeItem
  };
}
