import { CreateUserDto } from '../create-user.dto';

export interface CreateAdminDto extends CreateUserDto {
  name: string;
  lastname: string;
  key: string;
}
