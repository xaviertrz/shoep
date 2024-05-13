import { SellerDto } from '../dtos/SellerDto';
import { IProductVariant } from './IProductVariant';

export interface IProduct {
  id?: number | null;
  uuid: string;
  category_id: number;
  seller_uuid: string;
  name: string;
  description: string | null;
  created_at: string;
  modified_at: string | null;
  brand: string;
  blocked: boolean;
  deleted_at: string | null;
  active: boolean;
  product_variants: IProductVariant[];
  users: SellerDto;
}
