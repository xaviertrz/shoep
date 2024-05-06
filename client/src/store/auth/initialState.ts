import { IAuthState } from './interfaces/IAuthState';

export const initialState: IAuthState = {
  status: 'not-authenticated',
  user: undefined,
  errorMessage: undefined
};
