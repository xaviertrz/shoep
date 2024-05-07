import { PrismaClient, Prisma } from '@prisma/client';
import { MySQLException } from '../shared/domain/exceptions/MySQLException';
import { ISeller } from '../interfaces/seller.interface';
import { SellerDto } from '../shared/dtos/user/seller/seller.dto';
import { roleIds } from '../constants/role-ids';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { generateJwt } from '../utils/jwt/generate-jwt';
const prisma: PrismaClient = new PrismaClient();

export class SellerRepository {
  static async create(sellerData: ISeller): Promise<ResponseDto<SellerDto>> {
    try {
      const { id, ...createData } = sellerData; // eslint-disable-line @typescript-eslint/no-unused-vars
      await prisma.users.create({ data: createData });
      const sellerDto = await mapToSellerDto(sellerData);
      return { success: true, message: 'Usuario creado correctamente', data: sellerDto };
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        const mysqlError = MySQLException.getMySQLError(error.message);
        return { success: false, message: mysqlError.message };
      }
      return { success: false, message: 'Ocurrió un error al intentar crear al vendedor' };
    }
  }

  static async getAll(page: number, perPage: number): Promise<ResponseDto<SellerDto[]>> {
    try {
      const skip = (page - 1) * perPage;
      const users = (await prisma.users.findMany({
        where: {
          active: true,
          role_id: roleIds.SELLER
        },
        skip,
        take: perPage
      })) as ISeller[];
      const sellers = await mapToSellersDto(users);
      return { success: true, message: 'Lista de vendedores consultada correctamente', data: sellers };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los vendedores' };
    }
  }
}

async function mapToSellerDto(sellerData: ISeller): Promise<SellerDto> {
  const token = await generateJwt(sellerData.uuid, sellerData.role_id);

  return {
    uuid: sellerData.uuid,
    role_id: sellerData.role_id,
    username: sellerData.username,
    email: sellerData.email,
    nit: sellerData.nit,
    phone_number: sellerData.phone_number,
    confirmed: sellerData.confirmed,
    mp_access_token: sellerData.mp_access_token,
    mp_refresh_token: sellerData.mp_refresh_token,
    mp_token_expiration_date: sellerData.mp_token_expiration_date,
    token
  };
}

async function mapToSellersDto(sellersData: ISeller[]): Promise<SellerDto[]> {
  const sellersDto: SellerDto[] = [];
  for (const sellerData of sellersData) {
    const sellerDto = await mapToSellerDto(sellerData);
    sellersDto.push(sellerDto);
  }
  return sellersDto;
}
