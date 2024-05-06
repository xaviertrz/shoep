import { CaseUseException } from '../shared/domain/exceptions/CaseUseException';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { UserAddressRepository } from '../repositories/user-address.repository';
import { CreateUserAddressDto } from '../shared/dtos/user-address/create-user-address.dto';
import { IUserAddress } from '../interfaces/user-address.interface';
import { JwtDto } from '../shared/dtos/jwt.dto';
import { GetUserAddressDto } from '../shared/dtos/address/get-addresses.dto';

export class UserAddressService {
  static async createUserAddress(
    createUserAddressDto: CreateUserAddressDto
  ): Promise<ResponseDto<IUserAddress[] | null>> {
    try {
      const response = await UserAddressRepository.createUserAddress(createUserAddressDto);
      if (response.success) {
        return await UserAddressRepository.getAddressesByUserId(createUserAddressDto.user_uuid);
      }

      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof CaseUseException) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: 'Error agregando dirección' };
      }
    }
  }

  static async updateUserAddress(id: number, addressData: any, jwt: JwtDto): Promise<ResponseDto<IUserAddress[]>> {
    try {
      const existingAddress = await this.getAddressById(id);
      if (existingAddress.success) {
        if (existingAddress.data!.user_uuid !== jwt.token_user_uuid) {
          return { success: false, message: 'No tienes permisos para actualizar esta dirección' };
        }
        const { users, ...rest } = existingAddress.data!; // eslint-disable-line @typescript-eslint/no-unused-vars
        console.log({ rest });
        const updatedUserData: IUserAddress = {
          ...rest,
          ...addressData
        };
        console.log(updatedUserData);

        const response = await UserAddressRepository.updateUserAddress(id, updatedUserData);
        if (response.success) {
          return await UserAddressRepository.getAddressesByUserId(response.data!.user_uuid);
        }

        return { success: false, message: response.message };
      }
      return { success: false, message: 'Dirección no encontrada' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error actualizando dirección' };
    }
  }

  static async deleteUserAddressById(id: number, jwt: JwtDto): Promise<ResponseDto<IUserAddress[] | null>> {
    try {
      const existingAddress = await this.getAddressById(id);
      if (existingAddress.success) {
        if (existingAddress.data!.user_uuid !== jwt.token_user_uuid) {
          return { success: false, message: 'No tienes permisos para eliminar esta dirección' };
        }
      }

      const response = await UserAddressRepository.deleteUserAddressById(id);
      if (response.success) {
        return await UserAddressRepository.getAddressesByUserId(response.data!.user_uuid);
      }

      return { success: false, message: response.message };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error eliminando dirección' };
    }
  }

  static async getAddressesByUserId(user_uuid: string): Promise<ResponseDto<IUserAddress[]>> {
    try {
      return await UserAddressRepository.getAddressesByUserId(user_uuid);
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo direcciones' };
    }
  }

  static async getAddressById(id: number): Promise<ResponseDto<GetUserAddressDto | null>> {
    try {
      return await UserAddressRepository.getAddressById(id);
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo dirección' };
    }
  }
}
