/* import { IUser } from '../../../interfaces/user.interface';

export interface UserDto {
  success: boolean;
  message?: string;
  user?: IUser;
  data?: any;
}

export interface UsersDto {
  success: boolean;
  message?: string;
  users?: IUser[];
  data?: any;
}
 */

import { UserDto } from '../user.dto';

export interface SellerDto extends UserDto {
  nit: bigint;
  mp_access_token?: string | null;
  mp_refresh_token?: string | null;
  mp_token_expiration_date?: Date | null;
  token: string;
}
