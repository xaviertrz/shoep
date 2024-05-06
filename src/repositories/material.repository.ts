import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { IMaterial } from '../interfaces/material.interface';
const prisma: PrismaClient = new PrismaClient();

export class MaterialRepository {
  static async getAll(page: number, perPage: number): Promise<ResponseDto<IMaterial[]>> {
    try {
      const skip = (page - 1) * perPage;
      const materials = await prisma.product_materials.findMany({
        skip,
        take: perPage
      });
      return { success: true, message: 'Lista de materiales consultada correctamente', data: materials };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los materiales' };
    }
  }
}
