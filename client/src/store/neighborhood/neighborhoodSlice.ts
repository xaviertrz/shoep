import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { INeighborhood } from '../../interfaces/INeighborhood';

export const neighborhoodSlice = createSlice({
  name: 'neighborhood',
  initialState,
  reducers: {
    onSetNeighborhoods: (state, action: PayloadAction<INeighborhood[]>) => {
      state.neighborhoods = action.payload;
    },
    onSetActiveNeighborhood: (state, action: PayloadAction<INeighborhood>) => {
      state.active = action.payload;
    }
  }
});

export const { onSetNeighborhoods, onSetActiveNeighborhood } = neighborhoodSlice.actions;
export default neighborhoodSlice.reducer;
