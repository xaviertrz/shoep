import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { CreateUserAddressDto } from '../shared/dtos/user-address/create-user-address.dto';
import { IUserAddress } from '../interfaces/user-address.interface';
import { GetUserAddressDto } from '../shared/dtos/address/get-addresses.dto';
const prisma: PrismaClient = new PrismaClient();

export class UserAddressRepository {
  static async createUserAddress(createUserAddressDto: CreateUserAddressDto): Promise<ResponseDto<null>> {
    try {
      await prisma.user_addresses.create({
        data: createUserAddressDto
      });
      return { success: true, message: 'Dirección agregada correctamente' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error agregando dirección' };
    }
  }

  static async updateUserAddress(id: number, addressData: IUserAddress): Promise<ResponseDto<IUserAddress>> {
    try {
      const address = await prisma.user_addresses.findUnique({
        where: { id }
      });
      if (address) {
        const { id, ...updatedData } = addressData; // eslint-disable-line @typescript-eslint/no-unused-vars
        const updatedAddress = await prisma.user_addresses.update({
          where: { id },
          data: updatedData
        });
        return { success: true, message: 'Dirección actualizada correctamente', data: updatedAddress };
      } else {
        return { success: false, message: 'Dirección no encontrada' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error actualizando dirección' };
    }
  }

  static async deleteUserAddressById(id: number): Promise<ResponseDto<IUserAddress | null>> {
    try {
      const deletedAddress = await prisma.user_addresses.delete({
        where: {
          id
        }
      });
      return { success: true, message: 'Dirección eliminada correctamente', data: deletedAddress };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error eliminando dirección' };
    }
  }

  static async getAddressesByUserId(user_uuid: string): Promise<ResponseDto<IUserAddress[]>> {
    try {
      const addresses = await prisma.user_addresses.findMany({
        where: {
          user_uuid
        },
        include: {
          neighborhood: true
        }
      });
      return { success: true, message: 'Direcciones encontradas', data: addresses };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo direcciones' };
    }
  }

  static async getAddressById(id: number): Promise<ResponseDto<GetUserAddressDto | null>> {
    try {
      const address = await prisma.user_addresses.findUnique({
        where: {
          id
        },
        include: {
          users: true
        }
      });
      return { success: true, message: 'Dirección encontrada', data: address };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo dirección' };
    }
  }
}
