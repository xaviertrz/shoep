export interface AddressDto {
  id: number;
  address_line1: string;
  address_line2?: string | null;
  neighborhood_id: number;
  phone_number: number;
  user_uuid: string;
  neighborhood: {
    city_id: number;
    id: number;
    name: string;
  };
}
