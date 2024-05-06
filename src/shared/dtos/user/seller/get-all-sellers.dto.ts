import { SellerDto } from './seller.dto';

export interface GetAllSellersDto {
  success: boolean;
  message?: string;
  users?: SellerDto[];
}
