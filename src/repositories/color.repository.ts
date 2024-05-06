import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { IColor } from '../interfaces/color.interface';
const prisma: PrismaClient = new PrismaClient();

export class ColorRepository {
  static async getAll(page: number, perPage: number): Promise<ResponseDto<IColor[]>> {
    try {
      const skip = (page - 1) * perPage;
      const colors = await prisma.product_colors.findMany({
        skip,
        take: perPage
      });
      return { success: true, message: 'Lista de colores consultada correctamente', data: colors };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los colores' };
    }
  }
}
