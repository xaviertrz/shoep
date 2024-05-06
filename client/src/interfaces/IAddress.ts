import { IBuyer } from './IBuyer';
import { INeighborhood } from './INeighborhood';

export interface IAddress {
  id: number;
  neighborhood_id: number;
  user_uuid: string;
  address_line1: string;
  address_line2?: string | null;
  phone_number: number;
  neighborhood: INeighborhood;
  users: IBuyer;
}
