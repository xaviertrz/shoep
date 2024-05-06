export interface UpdateUserAddressDto {
  neighborhood_id: number;
  address_line1: string;
  address_line2?: string;
  phone_number: bigint;
}
