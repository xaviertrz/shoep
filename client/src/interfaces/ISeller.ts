import { IUser } from './IUser';

export interface ISeller extends IUser {
  nit: number;
  mp_access_token?: string | null;
  mp_refresh_token?: string | null;
  mp_token_expiration_date?: string | null;
}
