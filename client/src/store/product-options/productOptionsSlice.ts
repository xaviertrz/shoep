import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { GetAllMaterialsDto } from '../../dtos/GetAllMaterialsDto';
import { GetAllColorsDto } from '../../dtos/GetAllColorsDto';
import { GetAllSizesDto } from '../../dtos/GetAllSizesDto';

export const productOptionsSlice = createSlice({
  name: 'productOptions',
  initialState,
  reducers: {
    onSetMaterials: (state, action: PayloadAction<GetAllMaterialsDto[]>) => {
      state.materials = action.payload;
    },
    onSetColors: (state, action: PayloadAction<GetAllColorsDto[]>) => {
      state.colors = action.payload;
    },
    onSetSizes: (state, action: PayloadAction<GetAllSizesDto[]>) => {
      state.sizes = action.payload;
    }
  }
});

export const { onSetMaterials, onSetColors, onSetSizes } = productOptionsSlice.actions;
export default productOptionsSlice.reducer;
