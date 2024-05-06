/* import { ICartItem } from './ICartItem'; */

/* export interface ICart {
  id: number;
  user_uuid: string;
  total: number;
  modified_at?: Date | null;
  cart_items: ICartItem[];
} */

export interface ICart {
  id: number;
  user_uuid: string;
  total: number;
  modified_at?: Date;
  cart_items: ICartItem[];
}

interface ICartItem {
  id: number;
  cart_id: number;
  variant_uuid: string;
  quantity: number;
  created_at: Date;
  product_variants: {
    id: number;
    uuid: string;
    product_id: number;
    material_id: number;
    color_id: number;
    size_id: number;
    price: number;
    stock: number;
    upc: string;
    sku?: string;
    products: {
      id: number;
      name: string;
      description: string;
      brand: string;
      category_id: number;
    };
    product_colors: {
      id: number;
      name: string;
      hex_code: string;
    };
    product_sizes: {
      id: number;
      number: string;
      centimeters: string;
    };
    product_materials: {
      id: number;
      name: string;
    };
    product_images: [
      {
        id: number;
        source: string;
      }
    ];
  };
}
