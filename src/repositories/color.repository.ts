import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { GetAllColorsDto } from '../shared/dtos/color/get-all-colors.dto';
const prisma: PrismaClient = new PrismaClient();

export class ColorRepository {
  static async getAll(): Promise<ResponseDto<GetAllColorsDto[]>> {
    try {
      const colors = await prisma.$queryRaw<GetAllColorsDto[]>`
      SELECT
          pc.id AS color_id,
          pc.name AS color_name,
          COALESCE(COUNT(DISTINCT CASE WHEN p.active = true AND pv.active = true THEN p.uuid END), 0) AS product_count
      FROM
          product_colors pc
      LEFT JOIN
          product_variants pv ON pc.id = pv.color_id
      LEFT JOIN
          products p ON pv.product_uuid = p.uuid AND (p.active = true OR p.active IS NULL) AND p.blocked = FALSE
      GROUP BY
          pc.id, pc.name;
`;
      return { success: true, message: 'Lista de colores consultada correctamente', data: colors };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los colores' };
    }
  }
}
