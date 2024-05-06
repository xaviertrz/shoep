import { BuyerDto } from './buyer.dto';

export interface GetAllBuyersDto {
  success: boolean;
  message?: string;
  users?: BuyerDto[];
}
