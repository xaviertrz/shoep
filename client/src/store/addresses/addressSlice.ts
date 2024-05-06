import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { AddressDto } from '../../dtos/AddressDto';

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    onSetAddresses: (state, action: PayloadAction<AddressDto[]>) => {
      state.addresses = action.payload;
    },

    onSetActive: (state, action: PayloadAction<AddressDto>) => {
      state.active = action.payload;
    }
  }
});

export const { onSetAddresses, onSetActive } = addressSlice.actions;
export default addressSlice.reducer;
