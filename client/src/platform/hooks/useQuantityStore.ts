import { useAppDispatch, useAppSelector } from '../../hooks/config';
import {
  onDecreaseQuantityByOne,
  onIncreaseQuantityByOne,
  onSetQuantity
} from '../../store/product-quantity/quantitySlice';

export function useQuantityStore() {
  const { quantity } = useAppSelector(state => state.quantity);
  const dispatch = useAppDispatch();

  async function increaseQuantityByOne() {
    try {
      dispatch(onIncreaseQuantityByOne());
    } catch (error) {
      console.error(error);
    }
  }

  async function decreaseQuantityByOne() {
    try {
      if (quantity > 0) {
        dispatch(onDecreaseQuantityByOne());
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function setQuantity(quantity: number) {
    try {
      dispatch(onSetQuantity(quantity));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    quantity,

    // Métodos
    increaseQuantityByOne,
    decreaseQuantityByOne,
    setQuantity
  };
}
