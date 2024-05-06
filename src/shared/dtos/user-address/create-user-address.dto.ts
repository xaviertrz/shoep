export interface CreateUserAddressDto {
  neighborhood_id: number;
  user_uuid: string;
  address_line1: string;
  address_line2?: string;
  phone_number: bigint;
}
