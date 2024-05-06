import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { IVariantImage } from '../interfaces/variant-image.interface';
const prisma: PrismaClient = new PrismaClient();

export class ImageRepository {
  static async create(imageData: IVariantImage): Promise<ResponseDto<IVariantImage>> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...createData } = imageData;

      const image = await prisma.product_images.create({
        data: {
          ...createData
        }
      });
      return { success: true, message: 'Imagen subida correctamente', data: image };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error subiendo imagen' };
    }
  }

  static async getById(image_id: number): Promise<ResponseDto<IVariantImage>> {
    try {
      const image = await prisma.product_images.findUnique({
        where: { id: image_id, active: true }
      });
      if (!image) {
        return { success: false, message: 'Imagen no encontrada' };
      }

      return { success: true, message: 'Imagen obtenida correctamente', data: image };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo imagen' };
    }
  }

  static async getAllByVariantUuid(variant_uuid: string): Promise<ResponseDto<IVariantImage[]>> {
    try {
      const images = await prisma.product_images.findMany({
        where: { variant_uuid, active: true }
      });
      return { success: true, message: 'Imagen(es) obtenida(s) correctamente', data: images };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo imágenes' };
    }
  }

  static async delete(image_id: number): Promise<ResponseDto<IVariantImage>> {
    try {
      const image = await prisma.product_images.update({
        where: { id: image_id },
        data: { active: false, deleted_at: new Date() }
      });
      return { success: true, message: 'Imagen eliminada correctamente', data: image };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error eliminando imagen' };
    }
  }
}
