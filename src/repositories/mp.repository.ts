import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

export class MpRepository {
  static async storeToken(user_uuid: string, data: any) {
    try {
      // Calcular la fecha de expiración del token
      const currentTimestamp = Math.floor(Date.now() / 1000); // Fecha actual en segundos
      const expirationTimestamp = currentTimestamp + data.expires_in; // Fecha de expiración en segundos
      const expirationDate = new Date(expirationTimestamp * 1000); // Convertir a milisegundos y crear objeto Date

      // Almacenar la fecha de expiración en formato datetime en la base de datos
      const mp_expiration_date = expirationDate.toISOString();
      const updatedUser = await prisma.user.update({
        where: {
          uuid: user_uuid!
        },
        data: {
          mp_access_token: data?.access_token,
          mp_refresh_token: data?.refresh_token,
          mp_token_expiration_date: mp_expiration_date
        }
      });

      return { success: true, message: 'Datos de Mercado Pago almacenados correctamente', data: updatedUser };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error almacenando tokens en la base de datos' };
    }
  }
}
