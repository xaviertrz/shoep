export interface IVariantState {
  active: ProductVariant;
}

export interface ProductVariant {
  id: number;
  uuid: string;
  product_uuid: string;
  sku?: string | null;
  stock: number;
  price: number;
  created_at: Date;
  modified_at: null;
  deleted_at: null;
  size_id: number;
  material_id: number;
  upc?: string | null;
  color_id: number;
  active: boolean;
  products: Products;
  product_images: ProductImage[];
  product_materials: Product;
  product_sizes: ProductSizes;
  product_colors: ProductColors;
}

export interface ProductColors {
  id: number;
  name: string;
  hex_code: string;
}

export interface ProductImage {
  id: number;
  variant_uuid: string;
  source: string;
  active: boolean;
  deleted_at: null;
  created_at: Date;
}

export interface Product {
  id: number;
  name: string;
}

export interface ProductSizes {
  id: number;
  number: number;
  centimeters: string;
}

export interface Products {
  id: number;
  uuid: string;
  category_id: number;
  seller_uuid: string;
  name: string;
  description: null;
  created_at: Date;
  modified_at: null;
  brand: string;
  deleted_at: null;
  active: boolean;
  product_categories: Product;
  users: Users;
}

export interface Users {
  id: number;
  uuid: string;
  role_id: number;
  username: string;
  email: string;
  phone_number: string;
  nit: string;
  password: string;
  active: boolean;
  created_at: Date;
  modified_at: null;
  deleted_at: null;
  confirmed: boolean;
  mp_access_token: string;
  mp_refresh_token: string;
  mp_token_expiration_date: Date;
}
