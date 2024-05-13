import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { GetAllCategoriesDto } from '../shared/dtos/category/get-all-categories.dto';
const prisma: PrismaClient = new PrismaClient();

export class CategoryRepository {
  static async getAll(): Promise<ResponseDto<GetAllCategoriesDto[]>> {
    try {
      const categories = await prisma.$queryRaw<GetAllCategoriesDto[]>`
        SELECT
            pc.id AS id_category,
            pc.name AS category,
            COUNT(p.id) AS count
        FROM
            product_categories pc
        LEFT JOIN products p ON
            pc.id = p.category_id AND
            p.active = TRUE AND
            p.blocked = FALSE
            GROUP BY
                pc.id,
                pc.name
            ORDER BY
                pc.id;
    `;
      /* const categorias = await prisma.product_categories.findMany({});
      console.log(categorias); */
      return { success: true, message: 'Lista de categorías consultada correctamente', data: categories };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todas las categorías' };
    }
  }
}
