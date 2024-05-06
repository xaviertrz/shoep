import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { IGenericUser } from '../../interfaces/IGenericUser';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onSetUser: (state, action: PayloadAction<IGenericUser>) => {
      state.user = action.payload;
    }
  }
});

export const { onSetUser } = userSlice.actions;
export default userSlice.reducer;
