export interface IAddVariantForm {
  product_uuid: string;
  size_id: number;
  material_id: number;
  color_id: number;
  upc?: number | null;
  sku?: string | null;
  stock: number;
  price: number;
  images: File[];
}
