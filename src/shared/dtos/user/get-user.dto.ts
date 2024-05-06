import { BuyerDto } from './buyer/buyer.dto';
import { SellerDto } from './seller/seller.dto';

export interface GetUserDto {
  success: boolean;
  message?: string;
  user?: BuyerDto | SellerDto;
}
