import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { ProductVariant } from './interfaces/IVariantState';

export const variantSlice = createSlice({
  name: 'variant',
  initialState,
  reducers: {
    onSetActive: (state, action: PayloadAction<ProductVariant>) => {
      state.active = action.payload;
    }
  }
});

export const { onSetActive } = variantSlice.actions;
export default variantSlice.reducer;
