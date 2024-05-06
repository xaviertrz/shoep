export interface ViewProductsDto {
  readonly id?: string;
  product_category: string;
  product_uuid: string;
  product_name: string;
  product_description?: string | null;
  product_brand: string;
  seller_uuid: string;
  seller_username: string;
  seller_email: string;
  seller_phone_number: bigint;
  variant_uuid: string;
  material_id: number;
  product_material: string;
  size_id: number;
  product_size: number;
  cm_size: number;
  color_id: number;
  product_colors: string;
  product_hexcode: string;
  product_stock: boolean;
  product_upc: number | null;
  product_sku: string | null;
  product_price: number;
}
