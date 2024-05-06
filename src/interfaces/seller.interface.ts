import { IUser } from './user.interface';

export interface ISeller extends IUser {
  nit: bigint;
  mp_access_token?: string | null;
  mp_refresh_token?: string | null;
  mp_token_expiration_date?: Date | null;
}
