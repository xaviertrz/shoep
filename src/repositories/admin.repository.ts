import { PrismaClient, Prisma } from '@prisma/client';
import { MySQLException } from '../shared/domain/exceptions/MySQLException';
import { BuyerDto } from '../shared/dtos/user/buyer/buyer.dto';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { generateJwt } from '../utils/jwt/generate-jwt';
import { IAdmin } from '../interfaces/admin.interface';
import { AdminDto } from '../shared/dtos/user/admin/admin.dto';
const prisma: PrismaClient = new PrismaClient();

export class AdminRepository {
  static async create(adminData: IAdmin): Promise<ResponseDto<BuyerDto>> {
    try {
      const { id, ...createData } = adminData; // eslint-disable-line @typescript-eslint/no-unused-vars
      await prisma.users.create({ data: createData });
      const adminDto = await mapToAdminDto(adminData);
      return { success: true, message: 'Administrador creado correctamente', data: adminDto };
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        const mysqlError = MySQLException.getMySQLError(error.message);
        return { success: false, message: mysqlError.message };
      }
      return { success: false, message: 'Ocurrió un error al intentar crear al administrador' };
    }
  }
}

async function mapToAdminDto(adminData: IAdmin): Promise<AdminDto> {
  const token = await generateJwt(adminData.uuid, adminData.role_id);
  return {
    uuid: adminData.uuid,
    role_id: adminData.role_id,
    username: adminData.username,
    email: adminData.email,
    phone_number: adminData.phone_number,
    confirmed: adminData.confirmed,
    created_at: adminData.created_at,
    token
  };
}
