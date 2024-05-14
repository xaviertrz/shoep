import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

export const quantitySlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    onIncreaseQuantityByOne: state => {
      state.quantity += 1;
    },
    onDecreaseQuantityByOne: state => {
      state.quantity -= 1;
    },
    onSetQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    }
  }
});

export const { onIncreaseQuantityByOne, onDecreaseQuantityByOne, onSetQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
