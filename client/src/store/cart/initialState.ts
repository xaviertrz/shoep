import { ICartState } from './interfaces/ICartState';

export const initialState: ICartState = {
  cart: {
    id: 0,
    user_uuid: '',
    total: 0,
    cart_items: [],
  }
};
