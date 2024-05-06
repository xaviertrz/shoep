import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { ISize } from '../interfaces/size.interface';
const prisma: PrismaClient = new PrismaClient();

export class SizeRepository {
  static async getAll(page: number, perPage: number): Promise<ResponseDto<ISize[]>> {
    try {
      const skip = (page - 1) * perPage;
      const sizes = await prisma.product_sizes.findMany({
        skip,
        take: perPage
      });
      return { success: true, message: 'Lista de tallas consultada correctamente', data: sizes };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todas las tallas' };
    }
  }
}
