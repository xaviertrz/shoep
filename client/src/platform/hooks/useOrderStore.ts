import { useAppDispatch, useAppSelector } from '../../hooks/config';
import { ResponseDto } from '../../dtos/ResponseDto';
import { IOrder } from '../../interfaces/IOrder';
import { onSetOrders } from '../../store/orders/orderSlice';
import { ENV } from '../../env';

export function useOrderStore() {
  const { orders } = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();
  const url = ENV.PROD;

  async function fetchOrdersByBuyerUuid(buyerUuid: string) {
    try {
      const endpoint = 'orders';
      const filter = 'by-buyerUuid';
      const response = await fetch(`${url}/${endpoint}/${filter}/${buyerUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const ordersData: ResponseDto<IOrder[]> = await response.json();
      dispatch(onSetOrders(ordersData.success ? ordersData.data! : []));
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchOrdersBySellerUuid(sellerUuid: string) {
    try {
      const endpoint = 'orders';
      const filter = 'by-sellerUuid';
      const response = await fetch(`${url}/${endpoint}/${filter}/${sellerUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const ordersData: ResponseDto<IOrder[]> = await response.json();
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
