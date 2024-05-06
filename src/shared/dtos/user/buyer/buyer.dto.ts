import { UserDto } from '../user.dto';

export interface BuyerDto extends UserDto {
  token: string;
}
