import { AddressDto } from '../../../dtos/AddressDto';

export interface IAddressState {
  addresses: AddressDto[];
  active: AddressDto;
}
