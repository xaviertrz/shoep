export interface IGenericUser {
  uuid: string;
  email: string;
  username: string;
  role_id: number;
  phone_number: string;
  nit?: string;
  mp_access_token?: string;
  mp_refresh_token?: string;
  mp_token_expiration_date?: Date;
}
