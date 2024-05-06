import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { IOrder } from '../../interfaces/IOrder';

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    onSetOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    }
  }
});

export const { onSetOrders } = orderSlice.actions;
export default orderSlice.reducer;
