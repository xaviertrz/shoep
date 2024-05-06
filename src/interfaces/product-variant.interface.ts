export interface IProductVariant {
  readonly id?: number | null;
  uuid: string;
  product_uuid: string;
  size_id: number;
  material_id: number;
  color_id: number;
  upc?: number | null;
  sku?: string | null;
  stock: number;
  price: number;
  active: boolean;
  created_at: Date | string;
  modified_at?: Date | string | null;
  deleted_at?: Date | string | null;
}
