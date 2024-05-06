import { IAddress } from './IAddress';
import { IProductVariant } from './IProductVariant';

export interface IOrder {
  uuid: string;
  user_uuid: string;
  variant_uuid: string;
  address_id: number;
  quantity: number;
  total: number;
  status: string;
  paid_at: Date;
  user_addresses: IAddress;
  product_variants: IProductVariant;

}
