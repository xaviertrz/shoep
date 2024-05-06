import { PrismaClient, Prisma } from '@prisma/client';
import { MySQLException } from '../shared/domain/exceptions/MySQLException';
import { IProduct } from '../interfaces/product.interface';
import { IProductVariant } from '../interfaces/product-variant.interface';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { IVariant } from '../interfaces/variant.interface';
import { IPreference } from '../interfaces/preference.interface';
const prisma: PrismaClient = new PrismaClient();

export class ProductRepository {
  static async create(productData: IProduct): Promise<void> {
    const { id, ...createData } = productData; // eslint-disable-line @typescript-eslint/no-unused-vars
    await prisma.product.create({ data: createData });
  }

  static async createVariant(variantData: IProductVariant): Promise<ResponseDto<void>> {
    try {
      const { id, ...createData } = variantData; // eslint-disable-line @typescript-eslint/no-unused-vars
      await prisma.product_variant.create({ data: createData });
      return { success: true, message: 'Variante creada correctamente' };
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        const mysqlError = MySQLException.getMySQLError(error.message);
        return { success: false, message: mysqlError.message };
      }
      return { success: false, message: 'Ocurrió un error al intentar crear la variante' };
    }
  }

  static async delete(uuid: string): Promise<ResponseDto<void | IProduct>> {
    try {
      const response = await this.getById(uuid);
      if (response.success) {
        await prisma.product.update({
          where: { uuid: uuid },
          data: { active: false, deleted_at: new Date() }
        });
        return { success: true, message: 'Producto eliminado correctamente' };
      }
      return response;
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error eliminando producto' };
    }
  }

  static async deleteVariant(uuid: string): Promise<ResponseDto<IVariant>> {
    try {
      const response = await this.getVariantById(uuid);
      if (response.success) {
        const deletedVariant = await prisma.product_variant.update({
          where: { uuid: uuid },
          data: { active: false, deleted_at: new Date() }
        });

        return { success: true, message: 'Variante eliminada correctamente', data: deletedVariant };
      }
      return response;
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error eliminando variante' };
    }
  }

  static async getAll(page: number, perPage: number): Promise<ResponseDto<any[]>> {
    try {
      const skip = (page - 1) * perPage;
      const products = await prisma.product.findMany({
        skip,
        take: perPage
      });
      if (products.length > 0) {
        /* const productsDto = products.map(product => mapToProductDto(product)); */
        return { success: true, message: 'Productos consultados correctamente', data: products };
      }

      return { success: true, message: 'No hay productos para consultar' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error consultando productos' };
    }
  }

  static async getById(uuid: string): Promise<any> {
    try {
      const product = await prisma.product.findUnique({
        include: {
          product_variants: {
            include: {
              product_images: {
                where: { active: true }
              },
              product_colors: true,
              product_materials: true,
              product_sizes: true
            },
            where: {
              active: true
            }
          },
          users: {
            select: {
              uuid: true,
              role_id: true,
              username: true,
              email: true,
              phone_number: true,
              confirmed: true,
              nit: true
            }
          }
        },
        where: {
          uuid,
          active: true
        }
      });

      if (product) {
        return { success: true, data: product };
      } else {
        return { success: false, message: 'Producto no encontrado' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando producto' };
    }
  }

  static async getOnlyProductData(uuid: string): Promise<any> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          uuid,
          active: true
        }
      });

      if (product) {
        return { success: true, data: product };
      } else {
        return { success: false, message: 'Producto no encontrado' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando producto' };
    }
  }

  static async getOnlyVariantData(uuid: string): Promise<any> {
    try {
      const variant = await prisma.product_variant.findUnique({
        where: {
          uuid,
          active: true
        }
      });

      if (variant) {
        return { success: true, data: variant };
      } else {
        return { success: false, message: 'Variante no encontrada' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando variante' };
    }
  }

  static async getVariantById(uuid: string): Promise<ResponseDto<IPreference>> {
    try {
      const variant = await prisma.product_variant.findUnique({
        where: {
          active: true,
          uuid: uuid
        },
        include: {
          products: {
            include: {
              product_categories: true,
              users: true
            }
          },
          product_images: {
            where: {
              active: true
            }
          },
          product_materials: true,
          product_sizes: true,
          product_colors: true
        }
      });
      if (variant) {
        return { success: true, data: variant };
      } else {
        return { success: false, message: 'Variante no encontrada' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando variante' };
    }
  }

  static async getVariantsByProductId(uuid: string): Promise<ResponseDto<IVariant[]>> {
    try {
      const variants = await prisma.product_variant.findMany({
        include: {
          product_images: {
            where: { active: true }
          }
        },
        where: {
          active: true,
          product_uuid: uuid
        }
      });
      if (variants) {
        return { success: true, data: variants };
      } else {
        return { success: false, message: 'Variantes no encontradas' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando variantes' };
    }
  }

  static async getAllBySellerUuidd(sellerUuid: string, page: number, perPage: number): Promise<any> {
    try {
      const skip = (page - 1) * perPage;
      const products = await prisma.product.findMany({
        include: {
          product_variants: {
            include: {
              product_images: {
                where: { active: true }
              }
            },
            where: {
              active: true
            }
          }
        },
        where: {
          seller_uuid: sellerUuid,
          active: true
        },
        skip,
        take: perPage
      });

      return { success: true, data: products };

      /* return { success: true, message: 'No hay productos para consultar' }; */
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error consultando productos' };
    }
  }

  static async getAllByCategoryId(categoryId: number, page: number, perPage: number): Promise<any> {
    try {
      const skip = (page - 1) * perPage;
      const products = await prisma.product.findMany({
        include: {
          product_variants: {
            include: {
              product_images: {
                where: { active: true }
              }
            }
          },
          users: {
            select: {
              uuid: true,
              role_id: true,
              username: true,
              email: true,
              phone_number: true,
              confirmed: true,
              nit: true
            }
          }
        },
        where: {
          category_id: categoryId,
          active: true
        },
        skip,
        take: perPage
      });

      /* const productsDto = products.map(product => {
        const mappedUser = mapToSellerDto(product.users);
        return { ...product, users: mappedUser };
      }); */

      return { success: true, data: products };

      /* return { success: true, message: 'No hay productos para consultar' }; */
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error consultando productos' };
    }
  }

  static async updateProduct(uuid: string, productData: IProduct): Promise<ResponseDto<any>> {
    try {
      const product = await prisma.product.findUnique({
        where: { uuid: uuid, active: true }
      });
      if (product) {
        const { id, ...updatedData } = productData; // eslint-disable-line @typescript-eslint/no-unused-vars
        const updatedProduct = await prisma.product.update({
          include: {
            product_variants: {
              include: {
                product_images: {
                  where: { active: true }
                },
                product_colors: true,
                product_materials: true,
                product_sizes: true
              }
            },
            product_categories: true
          },
          where: { uuid: uuid },
          data: updatedData
        });
        return { success: true, message: 'Producto actualizado correctamente', data: updatedProduct };
      } else {
        return { success: false, message: 'Product no encontrado' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error actualizando producto' };
    }
  }

  static async updateVariant(uuid: string, variantData: IProductVariant): Promise<ResponseDto<any>> {
    try {
      const variant = await prisma.product_variant.findUnique({
        where: { uuid: uuid, active: true }
      });
      if (variant) {
        const { id, ...updatedData } = variantData; // eslint-disable-line @typescript-eslint/no-unused-vars
        const updatedVariant = await prisma.product_variant.update({
          where: { uuid: uuid },
          data: updatedData
        });
        const fullProduct = await this.getById(updatedVariant.product_uuid);
        return { success: true, message: 'Variante actualizada correctamente', data: fullProduct.data };
      } else {
        return { success: false, message: 'Variante no encontrada' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error actualizando variante' };
    }
  }

  static async updateVariantStock(uuid: string, stock: number): Promise<ResponseDto<any>> {
    try {
      const variant = await prisma.product_variant.findUnique({
        where: { uuid: uuid, active: true }
      });
      if (variant) {
        const updatedVariant = await prisma.product_variant.update({
          where: { uuid: uuid },
          data: { stock }
        });
        return { success: true, message: 'Stock actualizado correctamente', data: updatedVariant };
      } else {
        return { success: false, message: 'Variante no encontrada' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error actualizando stock de variante' };
    }
  }
}

/* function mapToSellerDto(user: IUser): SellerDto {
  return {
    uuid: user.uuid,
    role_id: user.role_id,
    username: user.username,
    email: user.email,
    phone_number: user.phone_number,
    confirmed: user.confirmed,
    nit: user.nit!
  };
} */
