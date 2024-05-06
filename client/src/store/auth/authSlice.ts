import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBuyer } from '../../interfaces/IBuyer';
import { ISeller } from '../../interfaces/ISeller';
import { initialState } from './initialState';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: state => {
      state.status = 'checking';
      state.user = undefined;
      state.errorMessage = undefined;
    },
    onLoginBuyer: (state, action: PayloadAction<IBuyer>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLoginSeller: (state, action: PayloadAction<ISeller>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action: PayloadAction<string>) => {
      state.status = 'not-authenticated';
      state.user = undefined;
      state.errorMessage = action.payload;
    },
    clearErrorMessage: state => {
      state.errorMessage = undefined;
    }
  }
});

export const { onChecking, onLoginBuyer, onLoginSeller, onLogout, clearErrorMessage } = authSlice.actions;
export default authSlice.reducer;
