import { PrismaClient, Prisma } from '@prisma/client';
import { MySQLException } from '../shared/domain/exceptions/MySQLException';
import { roleIds } from '../constants/role-ids';
import { IBuyer } from '../interfaces/buyer.interface';
import { BuyerDto } from '../shared/dtos/user/buyer/buyer.dto';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { generateJwt } from '../utils/jwt/generate-jwt';
const prisma: PrismaClient = new PrismaClient();

export class BuyerRepository {
  static async create(buyerData: IBuyer): Promise<ResponseDto<BuyerDto>> {
    try {
      const { id, ...createData } = buyerData; // eslint-disable-line @typescript-eslint/no-unused-vars
      await prisma.user.create({ data: createData });
      const buyerDto = await mapToBuyerDto(buyerData);
      return { success: true, message: 'Usuario creado correctamente', data: buyerDto };
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        const mysqlError = MySQLException.getMySQLError(error.message);
        return { success: false, message: mysqlError.message };
      }
      return { success: false, message: 'Ocurrió un error al intentar crear al comprador' };
    }
  }

  static async getAll(page: number, perPage: number): Promise<ResponseDto<BuyerDto[]>> {
    try {
      const skip = (page - 1) * perPage;
      const users = (await prisma.user.findMany({
        where: {
          active: true,
          role_id: roleIds.BUYER
        },
        skip,
        take: perPage
      })) as IBuyer[];
      const buyers = await mapToBuyersDto(users);
      return { success: true, message: 'Lista de compradores consultada correctamente', data: buyers };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los compradores' };
    }
  }
}

async function mapToBuyerDto(buyerData: IBuyer): Promise<BuyerDto> {
  const token = await generateJwt(buyerData.uuid, buyerData.role_id);
  return {
    uuid: buyerData.uuid,
    role_id: buyerData.role_id,
    username: buyerData.username,
    email: buyerData.email,
    phone_number: buyerData.phone_number,
    confirmed: buyerData.confirmed,
    token
  };
}

async function mapToBuyersDto(buyersData: IBuyer[]): Promise<BuyerDto[]> {
  const buyersDto: BuyerDto[] = [];
  for (const buyerData of buyersData) {
    const buyerDto = await mapToBuyerDto(buyerData);
    buyersDto.push(buyerDto);
  }
  return buyersDto;
}
