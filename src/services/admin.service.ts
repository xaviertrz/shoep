import { roleIds } from '../constants/role-ids';
import { CaseUseException } from '../shared/domain/exceptions/CaseUseException';
import { registerDefaults } from '../constants/register-defaults';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { BuyerDto } from '../shared/dtos/user/buyer/buyer.dto';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { CreateAdminDto } from '../shared/dtos/user/admin/create-admin.dto';
import { IAdmin } from '../interfaces/admin.interface';
import { AdminRepository } from '../repositories/admin.repository';

export class AdminService {
  static async create(createAdminDto: CreateAdminDto): Promise<ResponseDto<BuyerDto>> {
    try {
      if (createAdminDto.key !== process.env.ADMIN_KEY) {
        return { success: false, message: 'Clave de administrador incorrecta' };
      }

      const adminData = await mapToAdmin(createAdminDto);
      const response = await AdminRepository.create(adminData);
      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof CaseUseException) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: 'Error creando administrador' };
      }
    }
  }
}

async function mapToAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {
  const username = createAdminDto.name.toUpperCase() + ' ' + createAdminDto.lastname.toUpperCase();
  const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
  return {
    uuid: uuidv4(),
    role_id: roleIds.ADMIN,
    username,
    email: createAdminDto.email,
    phone_number: createAdminDto.phone_number,
    password: hashedPassword,
    active: registerDefaults.ACTIVE,
    confirmed: registerDefaults.CONFIRMED,
    created_at: registerDefaults.CREATED_AT
  };
}
