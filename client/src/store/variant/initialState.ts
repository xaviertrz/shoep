import { IVariantState } from './interfaces/IVariantState';

export const initialState: IVariantState = {
  active: {
    id: 0,
    uuid: '',
    product_uuid: '',
    stock: 0,
    price: 0,
    created_at: new Date(),
    modified_at: null,
    deleted_at: null,
    size_id: 0,
    material_id: 0,
    upc: null,
    color_id: 0,
    active: false,
    products: {
      id: 0,
      uuid: '',
      category_id: 0,
      seller_uuid: '',
      name: '',
      description: null,
      brand: '',
      created_at: new Date(),
      modified_at: null,
      deleted_at: null,
      active: false,
      product_categories: {
        id: 0,
        name: ''
      },
      users: {
        id: 0,
        role_id: 0,
        uuid: '',
        username: '',
        email: '',
        password: '',
        nit: '',
        phone_number: '',
        confirmed: false,
        mp_access_token: '',
        mp_refresh_token: '',
        mp_token_expiration_date: new Date(),
        created_at: new Date(),
        modified_at: null,
        deleted_at: null,
        active: false
      }
    },
    product_images: [],
    product_materials: {
      id: 0,
      name: ''
    },
    product_sizes: {
      id: 0,
      number: 0,
      centimeters: ''
    },
    product_colors: {
      id: 0,
      name: '',
      hex_code: ''
    }
  }
};
