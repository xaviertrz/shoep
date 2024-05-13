import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { GetAllMaterialsDto } from '../shared/dtos/material/get-all-materials.dto';
const prisma: PrismaClient = new PrismaClient();

export class MaterialRepository {
  static async getAll(): Promise<ResponseDto<GetAllMaterialsDto[]>> {
    try {
      const materials = await prisma.$queryRaw<GetAllMaterialsDto[]>`
        SELECT
          pm.id AS material_id,
          pm.name AS material_name,
          COALESCE(COUNT(DISTINCT CASE WHEN pv.active = true THEN p.uuid END), 0) AS product_count
        FROM
          product_materials pm
        LEFT JOIN
          product_variants pv ON pm.id = pv.material_id
        LEFT JOIN
          products p ON pv.product_uuid = p.uuid AND p.blocked = FALSE
        WHERE
          (p.active = true OR p.active IS NULL)
        GROUP BY
          pm.id, pm.name;
  `;
      return { success: true, message: 'Lista de materiales consultada correctamente', data: materials };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los materiales' };
    }
  }
}
