import { IProductVariant } from './IProductVariant';

export interface ICartItem {
  id: number;
  cart_id: number;
  variant_uuid: string;
  quantity: number;
  created_at: Date;
  product_variants: IProductVariant;
}
