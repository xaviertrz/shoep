import { IProduct } from './IProduct';
import { IProductColors } from './IProductColors';
import { IProductImage } from './IProductImage';
import { IProductMaterials } from './IProductMaterials';
import { IProductSizes } from './IProductSizes';

export interface IProductVariant {
  id?: number | null;
  uuid: string;
  product_uuid: string;
  color_id: number;
  material_id: number;
  size_id: number;
  sku: string;
  stock: number;
  price: number;
  created_at: string;
  modified_at?: string | null;
  deleted_at?: string | null;
  upc?: number | null;
  active: boolean;
  product_images: IProductImage[];
  product_colors: IProductColors;
  product_materials: IProductMaterials;
  product_sizes: IProductSizes;
  products: IProduct
}
