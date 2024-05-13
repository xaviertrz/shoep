import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

export class MpRepository {
  static async storeToken(user_uuid: string, data: any) {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expirationTimestamp = currentTimestamp + data.expires_in;
      const expirationDate = new Date(expirationTimestamp * 1000);

      const mp_expiration_date = expirationDate.toISOString();
      await prisma.users.update({
        where: {
          uuid: user_uuid!
        },
        data: {
          mp_access_token: data?.access_token,
          mp_refresh_token: data?.refresh_token,
          mp_token_expiration_date: mp_expiration_date
        }
      });

      return {
        success: true,
        message: 'Vinculación realizada correctamente. Puedes cerrar esta página'
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error almacenando tokens en la base de datos' };
    }
  }
}
