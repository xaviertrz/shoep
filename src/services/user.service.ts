import { IBuyer } from '../interfaces/buyer.interface';
import { ISeller } from '../interfaces/seller.interface';
import { UserRepository } from '../repositories/user.repository';
import { AuthUserDto } from '../shared/dtos/user/auth-user.dto';
import { SellerDto } from '../shared/dtos/user/seller/seller.dto';
import { BuyerDto } from '../shared/dtos/user/buyer/buyer.dto';
import { roleIds } from '../constants/role-ids';
import { Constants } from '../utils/constants';
import { Page } from '../shared/domain/value-object/Page';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { IUser } from '../interfaces/user.interface';
import { MpService } from './mp.service';
import { generateJwt } from '../utils/jwt/generate-jwt';
import { JwtDto } from '../shared/dtos/jwt.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export class UserService {
  static async getAll(page: Page): Promise<ResponseDto<IUser[]>> {
    const perPage = Constants.RECORDS_PER_PAGE;

    return await UserRepository.getAll(page.getValue(), perPage);
  }

  static async delete(uuid: string): Promise<ResponseDto<void | IUser>> {
    return await UserRepository.delete(uuid);
  }

  static async getById(uuid: string): Promise<ResponseDto<SellerDto | BuyerDto | IUser>> {
    const response = await UserRepository.getById(uuid);
    if (response.success) {
      return { success: true, data: await mapToDto(response.data as ISeller | IBuyer) };
    }
    return response;
  }

  static async authenticate(authUserDto: AuthUserDto): Promise<ResponseDto<SellerDto | BuyerDto>> {
    try {
      const response = await UserRepository.getByEmail(authUserDto.email);
      if (!response.success) {
        return { success: false, message: 'Email no registrado' };
      }

      const validPassword = await bcrypt.compare(authUserDto.password, response.data?.password);
      if (!validPassword) {
        return { success: false, message: 'Contraseña incorrecta' };
      }

      if (response.data?.role_id === roleIds.SELLER && response.data?.mp_token_expiration_date) {
        const expirationDate = new Date(response.data.mp_token_expiration_date);
        const currentDate = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(currentDate.getDate() + 30);

        if (expirationDate < thirtyDaysFromNow) {
          await MpService.refreshToken(response.data.uuid, response.data.mp_refresh_token!);
        }
      }
      return {
        success: true,
        message: 'Autenticación exitosa',
        data: await mapToDto(response.data as ISeller | IBuyer)
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error autenticando usuario' };
    }
  }

  static async refreshToken(jwt: JwtDto): Promise<ResponseDto<SellerDto | BuyerDto>> {
    try {
      const user = await this.getById(jwt.token_user_uuid);
      if (user.success) {
        return {
          success: true,
          message: 'Token actualizado',
          data: await mapToDto(user.data! as ISeller | IBuyer)
        };
      }

      return { success: false, message: 'Usuario no encontrado' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error actualizando token' };
    }
  }
}

async function mapToDto(user: ISeller | IBuyer): Promise<SellerDto | BuyerDto> {
  const token = await generateJwt(user.uuid, user.role_id);
  if (user.role_id === roleIds.SELLER) {
    return {
      uuid: user.uuid,
      email: user.email,
      username: user.username,
      role_id: user.role_id,
      phone_number: user.phone_number,
      nit: (user as ISeller).nit,
      created_at: user.created_at,
      mp_access_token: (user as ISeller).mp_access_token,
      mp_refresh_token: (user as ISeller).mp_refresh_token,
      mp_token_expiration_date: (user as ISeller).mp_token_expiration_date,
      token
    } as SellerDto;
  } else {
    return {
      uuid: user.uuid,
      email: user.email,
      username: user.username,
      role_id: user.role_id,
      phone_number: user.phone_number,
      created_at: user.created_at,
      token
    } as BuyerDto;
  }
}
