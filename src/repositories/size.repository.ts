import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { GetAllSizesDto } from '../shared/dtos/size/get-all-sizes.dto';
const prisma: PrismaClient = new PrismaClient();

export class SizeRepository {
  static async getAll(): Promise<ResponseDto<GetAllSizesDto[]>> {
    try {
      const sizes = await prisma.$queryRaw<GetAllSizesDto[]>`
      SELECT
          ps.id AS size_id,
          ps.number AS size_number,
          ps.centimeters AS size_centimeters,
          COALESCE(COUNT(DISTINCT CASE WHEN p.active = true AND pv.active = true THEN p.uuid END), 0) AS product_count
      FROM
          product_sizes ps
      LEFT JOIN
          product_variants pv ON ps.id = pv.size_id
      LEFT JOIN
          products p ON pv.product_uuid = p.uuid AND p.active = true AND p.blocked = FALSE
      GROUP BY
          ps.id, ps.number, ps.centimeters;
`;
      return { success: true, message: 'Lista de tallas consultada correctamente', data: sizes };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todas las tallas' };
    }
  }
}
