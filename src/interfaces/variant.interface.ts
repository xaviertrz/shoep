export interface IVariant {
  id: number;
  uuid: string;
  product_uuid: string;
  stock: number;
  price: number;
  active: boolean;
  color_id: number;
  material_id: number;
  size_id: number;
  sku?: string | null;
  upc?: bigint | null;
  created_at: Date;
  deleted_at?: Date | null;
  modified_at?: Date | null;
}
