import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { IMaterial } from '../../interfaces/IMaterial';
import { IColor } from '../../interfaces/IColor';
import { ISize } from '../../interfaces/ISize';

export const productOptionsSlice = createSlice({
  name: 'productOptions',
  initialState,
  reducers: {
    onSetMaterials: (state, action: PayloadAction<IMaterial[]>) => {
      state.materials = action.payload;
    },
    onSetColors: (state, action: PayloadAction<IColor[]>) => {
      state.colors = action.payload;
    },
    onSetSizes: (state, action: PayloadAction<ISize[]>) => {
      state.sizes = action.payload;
    }
  }
});

export const { onSetMaterials, onSetColors, onSetSizes } = productOptionsSlice.actions;
export default productOptionsSlice.reducer;
