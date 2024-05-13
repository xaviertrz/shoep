export interface UserDto {
  uuid: string;
  role_id: number;
  username: string;
  email: string;
  phone_number: bigint;
  confirmed: boolean;
  created_at: Date;
}
