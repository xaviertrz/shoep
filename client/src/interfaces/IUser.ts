export interface IUser {
  uuid: string;
  role_id: number;
  username: string;
  email: string;
  phone_number: number;
  confirmed: boolean;
  token: string;
}
