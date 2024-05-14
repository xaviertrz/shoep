import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { GetAllMaterialsDto } from '../../dtos/GetAllMaterialsDto';

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    onSetMaterials: (state, action: PayloadAction<GetAllMaterialsDto[]>) => {
      state.materials = action.payload;
    }
  }
});

export const { onSetMaterials } = materialSlice.actions;
export default materialSlice.reducer;
