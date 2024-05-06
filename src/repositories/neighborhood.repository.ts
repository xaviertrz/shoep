import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { INeighborhood } from '../interfaces/neighborhood.interface';
const prisma: PrismaClient = new PrismaClient();

export class NeighborhoodRepository {
  static async getAll(): Promise<ResponseDto<INeighborhood[]>> {
    try {
      const neighborhoods = await prisma.neighborhood.findMany({
        include: {
          cities: {
            include: {
              departments: true
            }
          }
        }
      });
      return { success: true, message: 'Lista de barrios consultada correctamente', data: neighborhoods };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los barrios' };
    }
  }
}
