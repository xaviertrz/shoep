import { Prisma, PrismaClient } from '@prisma/client';
import { IOrder } from '../interfaces/order.interface';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { MySQLException } from '../shared/domain/exceptions/MySQLException';
const prisma: PrismaClient = new PrismaClient();

export class OrderRepository {
  static async createOrder(orderData: IOrder): Promise<ResponseDto<void>> {
    try {
      const { id, ...createData } = orderData; // eslint-disable-line @typescript-eslint/no-unused-vars
      await prisma.orders.create({ data: createData });
      return { success: true, message: 'Orden creada correctamente' };
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        const mysqlError = MySQLException.getMySQLError(error.message);
        return { success: false, message: mysqlError.message };
      }
      return { success: false, message: 'Ocurrió un error al intentar crear la orden' };
    }
  }

  static async getByBuyerId(buyer_uuid: string): Promise<ResponseDto<IOrder[]>> {
    try {
      const orders = await prisma.orders.findMany({
        where: { user_uuid: buyer_uuid },
        include: {
          user_addresses: {
            include: {
              neighborhood: {
                include: {
                  cities: true
                }
              },
              users: {
                select: {
                  uuid: true,
                  username: true,
                  email: true,
                  phone_number: true,
                  nit: true,
                  role_id: true,
                  mp_access_token: false,
                  mp_refresh_token: false,
                  password: false,
                  created_at: false,
                  modified_at: false,
                  deleted_at: false
                }
              }
            }
          },
          product_variants: {
            include: {
              product_colors: true,
              product_sizes: true,
              product_images: {
                where: { active: true }
              },
              product_materials: true,
              products: {
                include: {
                  product_categories: true,
                  users: {
                    select: {
                      uuid: true,
                      username: true,
                      email: true,
                      phone_number: true,
                      nit: true,
                      role_id: true,
                      mp_access_token: false,
                      mp_refresh_token: false,
                      password: false,
                      created_at: false,
                      modified_at: false,
                      deleted_at: false
                    }
                  }
                }
              }
            }
          }
        }
      });
      return { success: true, data: orders };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo ordenes' };
    }
  }

  static async getBySellerId(seller_uuid: string): Promise<ResponseDto<IOrder[]>> {
    try {
      const orders = await prisma.orders.findMany({
        include: {
          user_addresses: {
            include: {
              neighborhood: {
                include: {
                  cities: true
                }
              },
              users: {
                select: {
                  uuid: true,
                  username: true,
                  email: true,
                  phone_number: true,
                  nit: true,
                  role_id: true,
                  mp_access_token: false,
                  mp_refresh_token: false,
                  password: false,
                  created_at: false,
                  modified_at: false,
                  deleted_at: false
                }
              }
            }
          },
          product_variants: {
            include: {
              product_colors: true,
              product_sizes: true,
              product_images: {
                where: { active: true }
              },
              product_materials: true,
              products: {
                include: {
                  product_categories: true
                }
              }
            }
          }
        },
        where: {
          product_variants: {
            products: {
              seller_uuid
            }
          }
        }
      });
      return { success: true, data: orders };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo ordenes' };
    }
  }
}
