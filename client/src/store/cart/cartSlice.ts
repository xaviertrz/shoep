import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { ICart } from '../../interfaces/ICart';

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onSetCart: (state, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    }
  }
});

export const { onSetCart } = cartSlice.actions;
export default cartSlice.reducer;
