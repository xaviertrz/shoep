import { IProductListState } from './interfaces/IProductListState';

export const initialState: IProductListState = {
  products: [],
  active: {
    id: null,
    uuid: '',
    seller_uuid: '',
    category_id: 0,
    name: '',
    description: '',
    brand: '',
    created_at: '',
    modified_at: null,
    deleted_at: null,
    active: false,
    product_variants: [],
    users: {
      uuid: '',
      role_id: 0,
      username: '',
      email: '',
      phone_number: '',
      confirmed: false,
      nit: ''
    }
  },
  activeVariant: {
    id: null,
    uuid: '',
    product_uuid: '',
    sku: '',
    stock: 0,
    price: 0,
    created_at: '',
    modified_at: null,
    deleted_at: null,
    size_id: 0,
    material_id: 0,
    upc: 0,
    color_id: 0,
    active: false,
    product_images: [],
    product_colors: {
      id: 0,
      name: '',
      hex_code: ''
    },
    product_materials: {
      id: 0,
      name: ''
    },
    product_sizes: {
      id: 0,
      number: 0,
      centimeters: ''
    },
    products: {
      id: 0,
      uuid: '',
      seller_uuid: '',
      category_id: 0,
      name: '',
      description: '',
      brand: '',
      created_at: '',
      modified_at: null,
      deleted_at: null,
      active: false,
      product_variants: [],
      users: {
        uuid: '',
        role_id: 0,
        username: '',
        email: '',
        phone_number: '',
        confirmed: false,
        nit: ''
      }
    }
  },
  activeImages: []
};
