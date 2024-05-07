import { PrismaClient } from '@prisma/client';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { IUser } from '../interfaces/user.interface';
const prisma: PrismaClient = new PrismaClient();

export class UserRepository {
  static async getAll(page: number, perPage: number): Promise<ResponseDto<IUser[]>> {
    try {
      const skip = (page - 1) * perPage;
      const users = await prisma.users.findMany({
        where: {
          active: true
        },
        skip,
        take: perPage
      });
      return { success: true, message: 'Usuarios consultados correctamente', data: users };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando a todos los usuarios' };
    }
  }

  static async delete(uuid: string): Promise<ResponseDto<void | IUser>> {
    try {
      const response = await this.getById(uuid);
      if (response.success) {
        await prisma.users.update({
          where: { uuid: uuid },
          data: { active: false, deleted_at: new Date() }
        });
        return { success: true, message: 'Usuario eliminado correctamente' };
      }
      return response;
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error eliminando usuario' };
    }
  }

  static async getById(uuid: string): Promise<ResponseDto<IUser>> {
    try {
      const user = await prisma.users.findUnique({
        where: {
          uuid: uuid,
          active: true
        }
      });
      if (user) {
        return { success: true, data: user };
      }
      return { success: false, message: 'Usuario no encontrado' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando usuario' };
    }
  }

  static async getByEmail(email: string): Promise<ResponseDto<IUser>> {
    try {
      const user = await prisma.users.findUnique({
        where: { email }
      });

      if (user) {
        return { success: true, data: user };
      } else {
        return { success: false, message: 'Usuario no encontrado' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error consultando usuario por email' };
    }
  }
}
