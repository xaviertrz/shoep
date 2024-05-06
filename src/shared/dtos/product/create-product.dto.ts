import { ProductVariantDto } from './product-variant.dto';

export interface CreateProductDto {
  category_id: number;
  seller_uuid: string;
  name: string;
  brand: string;
  description?: string | null;
  variant: ProductVariantDto;
}
