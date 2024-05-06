import { IBuyer } from '../../../interfaces/buyer.interface';
import { ISeller } from '../../../interfaces/seller.interface';

export interface GetAllUsersDto {
  success: boolean;
  message?: string;
  users?: (IBuyer | ISeller)[];
}
