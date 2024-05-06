export interface IUserAddress {
  id: number;
  neighborhood_id: number;
  user_uuid: string;
  address_line1: string;
  address_line2?: string | null;
  phone_number: bigint;
}
