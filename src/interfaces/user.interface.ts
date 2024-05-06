export interface IUser {
  readonly id?: number | null;
  uuid: string;
  role_id: number;
  username: string;
  email: string;
  phone_number: bigint;
  nit?: bigint | null;
  password: string;
  active: boolean;
  created_at: Date;
  modified_at?: Date | null;
  deleted_at?: Date | null;
  confirmed: boolean;
  mp_access_token?: string | null;
  mp_refresh_token?: string | null;
  mp_token_expiration_date?: Date | null;
}
