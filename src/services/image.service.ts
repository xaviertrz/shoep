import { ImageRepository } from '../repositories/image.repository';
import { PostVariantImageDto } from '../shared/dtos/product/post-variant-image.dto';
import { IVariantImage } from '../interfaces/variant-image.interface';
import { ProductService } from './product.service';
import { registerDefaults } from '../constants/register-defaults';
import { ProductRepository } from '../repositories/product.repository';

export class ImageService {
  static async create(postVariantImageDto: PostVariantImageDto) /* : Promise<ResponseDto<IMaterial[]>> */ {
    if (!postVariantImageDto.images || postVariantImageDto.images.length === 0) {
      return { success: false, message: 'No se han adjuntado imágenes' };
    }

    if (postVariantImageDto.images.length < 1 || postVariantImageDto.images.length > 5) {
      return { success: false, message: 'Puede subir mínimo 1 y máximo 5 imágenes' };
    }

    const images = await ImageRepository.getAllByVariantUuid(postVariantImageDto.variant_uuid);
    if (images.success && images.data!.length > 4) {
      return { success: false, message: 'No se pueden subir más de 5 imágenes por variante' };
    }

    postVariantImageDto.images.forEach(async image => {
      const imageData = mapToImage(postVariantImageDto.variant_uuid, postVariantImageDto.basePath, image.filename);
      await ImageRepository.create(imageData);
    });

    const variant = await ProductService.getVariantById(postVariantImageDto.variant_uuid);
    if (!variant.success) {
      return { success: false, message: 'Error obteniendo variante' };
    }

    const product = await ProductRepository.getById(variant.data!.product_uuid);
    return { success: true, message: 'Imagen(es) subida(s) correctamente', data: product.data };
  }

  static async getAllByVariantUuid(variant_uuid: string) /* : Promise<ResponseDto<IMaterial[]>> */ {
    return await ImageRepository.getAllByVariantUuid(variant_uuid);
  }

  static async delete(image_id: number) /* : Promise<ResponseDto<IMaterial[]>> */ {
    const image = await ImageRepository.getById(image_id);
    if (!image.success) {
      return { success: false, message: image.message };
    }
    const variants = await ImageRepository.getAllByVariantUuid(image.data!.variant_uuid);
    if (!variants.success) {
      return { success: false, message: 'Error obteniendo variantes' };
    }

    if (variants.data!.length === 1) {
      return { success: false, message: 'No se puede eliminar la última imagen de la variante' };
    }

    const deletedImage = await ImageRepository.delete(image_id);
    if (!deletedImage.success) {
      return { success: false, message: 'Error eliminando imagen' };
    }

    const variant = await ProductService.getVariantById(image.data!.variant_uuid);
    if (!variant.success) {
      return { success: false, message: 'Error obteniendo variante' };
    }

    const product = await ProductService.getById(variant.data!.product_uuid);
    return { success: true, message: 'Imagen eliminada correctamente', data: product.data };

    /*     if (!response.success) {
      return { success: false, message: 'Error eliminando imagen' };
    } */

    /*     const variant = await ProductService.getVariantByImageId(image_id);
    if (!variant.success) {
      return { success: false, message: 'Error obteniendo variante' };
    }

    const product = await ProductService.getById(variant.data!.product_uuid);
    return { success: true, message: 'Imagen eliminada correctamente', data: product.data }; */
  }
}

function mapToImage(variant_uuid: string, basePath: string, fileName: string): IVariantImage {
  return {
    variant_uuid,
    source: `${basePath}${fileName}`,
    active: registerDefaults.ACTIVE,
    created_at: registerDefaults.CREATED_AT
  };
}
