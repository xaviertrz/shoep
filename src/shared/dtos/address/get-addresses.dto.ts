import { IUser } from '../../../interfaces/user.interface';

export interface GetUserAddressDto {
  id: number;
  neighborhood_id: number;
  user_uuid: string;
  address_line1: string;
  address_line2?: string | null;
  phone_number: bigint;
  users: IUser;
}
