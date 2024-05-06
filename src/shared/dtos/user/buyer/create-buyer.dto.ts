import { CreateUserDto } from '../create-user.dto';

export interface CreateBuyerDto extends CreateUserDto {
  name: string;
  lastname: string;
}
