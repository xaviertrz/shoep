import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { GetAllCategoriesDto } from '../../dtos/CategoryDto';

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    onSetCategories: (state, action: PayloadAction<GetAllCategoriesDto[]>) => {
      state.categories = action.payload;
    },
    onSetActive: (state, action: PayloadAction<number>) => {
      state.active = state.categories.find(category => category.id_category === action.payload) || null;
    }
  }
});

export const { onSetCategories, onSetActive } = categorySlice.actions;
export default categorySlice.reducer;
