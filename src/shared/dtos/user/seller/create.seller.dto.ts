import { CreateUserDto } from '../create-user.dto';

export interface CreateSellerDto extends CreateUserDto {
  nit: bigint;
}
