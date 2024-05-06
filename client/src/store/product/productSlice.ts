import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { IProduct } from '../../interfaces/IProduct';
import { IProductVariant } from '../../interfaces/IProductVariant';
import { IProductImage } from '../../interfaces/IProductImage';

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    onSetProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    onSetActive: (state, action: PayloadAction<IProduct>) => {
      state.active = action.payload;
    },
    onSetActiveVariant: (state, action: PayloadAction<IProductVariant>) => {
      state.activeVariant = { ...action.payload, upc: Number(action?.payload?.upc) };
    },
    onSetActiveImages: (state, action: PayloadAction<IProductImage[]>) => {
      state.activeImages = action.payload;
    }
  }
});

export const { onSetProducts, onSetActive, onSetActiveVariant, onSetActiveImages } = productSlice.actions;
export default productSlice.reducer;
