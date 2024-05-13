import { IUserState } from './interfaces/IUserState';

export const initialState: IUserState = {
  user: {
    uuid: '',
    email: '',
    username: '',
    role_id: 0,
    phone_number: '',
    nit: '',
    created_at: new Date(),
    mp_access_token: '',
    mp_refresh_token: '',
    mp_token_expiration_date: new Date()
  }
};
