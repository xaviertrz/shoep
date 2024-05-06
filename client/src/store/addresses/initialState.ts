import { IAddressState } from './interfaces/IAddressState';

export const initialState: IAddressState = {
  addresses: [],
  active: {
    id: 0,
    address_line1: '',
    address_line2: '',
    neighborhood_id: 0,
    phone_number: 0,
    user_uuid: '',
    neighborhood: {
      id: 0,
      name: '',
      city_id: 0
    }
  }
};
