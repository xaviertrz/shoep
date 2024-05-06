import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { IOrder } from '../../interfaces/IOrder';
import { onSetOrders } from '../../store/orders/orderSlice';

export function useOrderStore() {
  const { orders } = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();

  async function fetchOrdersByBuyerUuid(buyerUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'orders';
      const filter = 'by-buyerUuid'
      const response = await fetch(`${url}/${endpoint}/${filter}/${buyerUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const ordersData: ResponseDto<IOrder[]> = await response.json();
      console.log(ordersData);
      dispatch(onSetOrders(ordersData.success ? ordersData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchOrdersBySellerUuid(sellerUuid: string) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'orders';
      const filter = 'by-sellerUuid'
      const response = await fetch(`${url}/${endpoint}/${filter}/${sellerUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const ordersData: ResponseDto<IOrder[]> = await response.json();
      console.log(ordersData);
      dispatch(onSetOrders(ordersData.success ? ordersData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades
    orders,

    // Métodos
    fetchOrdersByBuyerUuid,
    fetchOrdersBySellerUuid
  };
}
