import { CaseUseException } from '../shared/domain/exceptions/CaseUseException';
import { registerDefaults } from '../constants/register-defaults';
import { CreateProductDto } from '../shared/dtos/product/create-product.dto';
import { IProduct } from '../interfaces/product.interface';
import { ProductRepository } from '../repositories/product.repository';
import { ProductVariantDto } from '../shared/dtos/product/product-variant.dto';
import { IProductVariant } from '../interfaces/product-variant.interface';
import { Page } from '../shared/domain/value-object/Page';
import { Constants } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { ImageRepository } from '../repositories/image.repository';
import { JwtDto } from '../shared/dtos/jwt.dto';
import { IPreference } from '../interfaces/preference.interface';

export class ProductService {
  static async create(createProductDto: CreateProductDto): Promise<ResponseDto<IProductVariant>> {
    try {
      const productData = mapToProduct(createProductDto);
      await ProductRepository.create(productData);
      createProductDto.variant.product_uuid = productData.uuid;
      return await this.createVariant(createProductDto.variant);
    } catch (error) {
      console.log(error);
      if (error instanceof CaseUseException) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: 'Error creando producto' };
      }
    }
  }

  static async block(uuid: string): Promise<ResponseDto<void>> {
    try {
      return await ProductRepository.block(uuid);
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error bloqueando producto' };
    }
  }

  static async createVariant(productVariantDto: ProductVariantDto): Promise<ResponseDto<IProductVariant>> {
    try {
      const variantData = mapToVariant(productVariantDto);
      const response = await ProductRepository.createVariant(variantData);
      const variants = await ProductRepository.getVariantsByProductId(variantData.product_uuid);
      if (variants.data?.length === 0) await ProductRepository.delete(variantData.product_uuid);
      if (!response.success) return { success: false, message: response.message };

      return { success: true, message: 'Variante creada correctamente', data: variantData };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error creando variante' };
    }
  }

  static async deleteVariant(uuid: string, jwt: JwtDto): Promise<ResponseDto<IProduct>> {
    try {
      const existingProduct = await this.getVariantById(uuid);
      if (existingProduct.success) {
        if (existingProduct.data!.products.seller_uuid !== jwt.token_user_uuid) {
          return { success: false, message: 'No tienes permisos para eliminar esta variante' };
        }
      }

      const images = await ImageRepository.getAllByVariantUuid(uuid);
      if (images.success) {
        for (const image of images.data!) {
          await ImageRepository.delete(image.id!);
        }
      }

      const response = await ProductRepository.deleteVariant(uuid);
      if (response.success) {
        const variant = response.data!;
        const variants = await ProductRepository.getVariantsByProductId(variant.product_uuid);
        if (variants.success && variants.data!.length === 0) {
          /* await ProductRepository.delete(variant.product_uuid); */
          return { success: true, message: 'Producto y su última variante eliminados correctamente' };
        }

        const fullProduct = await this.getById(variant.product_uuid);
        return { success: true, message: 'Variante eliminada correctamente', data: fullProduct.data };
      }

      return { success: false, message: response.message };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error eliminando variante' };
    }
  }

  static async getVariantById(uuid: string): Promise<ResponseDto<IPreference>> {
    try {
      return await ProductRepository.getVariantById(uuid);
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error obteniendo variante' };
    }
  }

  static async getById(uuid: string): Promise<ResponseDto<IProduct>> {
    try {
      return await ProductRepository.getById(uuid);
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error obteniendo producto' };
    }
  }

  static async getOnlyProductDataById(uuid: string): Promise<ResponseDto<IProduct>> {
    try {
      return await ProductRepository.getOnlyProductData(uuid);
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error obteniendo producto' };
    }
  }

  static async getOnlyVariantDataById(uuid: string): Promise<ResponseDto<IProduct>> {
    try {
      return await ProductRepository.getOnlyVariantData(uuid);
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error obteniendo variante' };
    }
  }

  static async getAll(page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await ProductRepository.getAll(page.getValue(), perPage);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllBySellerUuid(seller_uuid: string, page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await ProductRepository.getAllBySellerUuidd(seller_uuid, page.getValue(), perPage);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllByCategoryId(category_id: number, page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await ProductRepository.getAllByCategoryId(category_id, page.getValue(), perPage);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllByMaterialId(material_id: number, page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await ProductRepository.getAllByMaterialId(material_id, page.getValue(), perPage);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllByColorld(color_id: number, page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await ProductRepository.getAllByColorId(color_id, page.getValue(), perPage);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllBySizeld(size_id: number, page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await ProductRepository.getAllBySizesId(size_id, page.getValue(), perPage);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateProduct(uuid: string, productData: any, jwt: JwtDto): Promise<ResponseDto<void>> {
    try {
      const existingProduct = await this.getOnlyProductDataById(uuid);
      if (existingProduct.success) {
        if (existingProduct.data!.seller_uuid !== jwt.token_user_uuid) {
          return { success: false, message: 'No tienes permisos para modificar este producto' };
        }

        const updatedProductData: IProduct = {
          ...existingProduct.data,
          ...productData,
          modified_at: new Date()
        };
        return await ProductRepository.updateProduct(uuid, updatedProductData);
      }
      return { success: false, message: 'Producto no encontrado' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando producto' };
    }
  }

  static async updateVariant(uuid: string, variantData: any, jwt: JwtDto): Promise<ResponseDto<void>> {
    try {
      const productByVariant = await this.getVariantById(uuid);
      if (productByVariant.success) {
        if (productByVariant.data!.products.seller_uuid !== jwt.token_user_uuid) {
          return { success: false, message: 'No tienes permisos para modificar este producto' };
        }
      }

      const existingVariant = await this.getOnlyVariantDataById(uuid);
      if (existingVariant.success) {
        const updatedVariantData: IProductVariant = {
          ...existingVariant.data,
          ...variantData,
          modified_at: new Date()
        };
        return await ProductRepository.updateVariant(uuid, updatedVariantData);
      }
      return { success: false, message: 'Variante no encontrada' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando variante' };
    }
  }

  static async updateVariantStock(uuid: string, stock: number): Promise<ResponseDto<any>> {
    try {
      return await ProductRepository.updateVariantStock(uuid, stock);
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error actualizando stock de variante' };
    }
  }
}

function mapToProduct(createProductDto: CreateProductDto): IProduct {
  return {
    uuid: uuidv4(),
    category_id: createProductDto.category_id,
    seller_uuid: createProductDto.seller_uuid,
    name: createProductDto.name,
    brand: createProductDto.brand,
    description: createProductDto.description,
    blocked: registerDefaults.BLOCKED,
    active: registerDefaults.ACTIVE,
    created_at: new Date(),
  };
}

function mapToVariant(createProductVariantDto: ProductVariantDto): IProductVariant {
  return {
    uuid: uuidv4(),
    product_uuid: createProductVariantDto.product_uuid,
    size_id: createProductVariantDto.size_id,
    material_id: createProductVariantDto.material_id,
    upc: createProductVariantDto.upc,
    color_id: createProductVariantDto.color_id,
    sku: createProductVariantDto.sku,
    stock: createProductVariantDto.stock,
    price: createProductVariantDto.price,
    active: registerDefaults.ACTIVE,
    created_at: new Date(),
  };
}
