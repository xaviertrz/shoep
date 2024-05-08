import { MpRepository } from '../repositories/mp.repository';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { IPreference } from '../interfaces/preference.interface';
import { IPreOrderDto } from '../shared/dtos/order/pre-order.dto';
/* import { v4 as uuidv4 } from 'uuid'; */

export class MpService {
  private static test_token = true;
  private static mp_endpoint = process.env.MP_OAUTH_URL!;
  private static client_id = process.env.MP_CLIENT_ID!;
  private static client_secret = process.env.MP_CLIENT_SECRET!;
  private static redirect_uri = '/v1/mercado_pago_redirect';
  private static test_access_token = 'TEST-1460744161712328-041211-bf20c1b7b79f010c0433d095632d2e4b-1766276555';
  private static test_public_key = 'TEST-1e5dd829-9d8a-4e04-98e6-ee02f5139ab2';
  private static test_client_id = '1460744161712328';
  private static test_client_secret = '2ZXl2sHkmTcBgfxlBqwqZX710CSE3KlN';

  static async createToken(code: string, user_uuid: string, host: string) {
    const grant_type = 'authorization_code';

    const response = await fetch(this.mp_endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        client_id: this.test_client_id,
        client_secret: this.test_client_secret,
        code,
        grant_type,
        redirect_uri: `${host}${this.redirect_uri}`,
        test_token: this.test_token
      })
    });

    const data = await response.json();
    if (data?.access_token) {
      return await MpRepository.storeToken(user_uuid, data);
    }

    return { success: false, message: 'No se pudo obtener un access token desde Mercado Pago' };
  }

  static async refreshToken(user_uuid: string, refresh_token: string) {
    const grant_type = 'refresh_token';

    const response = await fetch(this.mp_endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type,
        refresh_token,
        test_token: this.test_token
      })
    });

    const data = await response.json();
    if (data?.access_token) {
      return await MpRepository.storeToken(user_uuid, data);
    }

    return { success: false, message: 'No se pudo obtener un nuevo access token desde Mercado Pago' };
  }

  static async createPreference(
    client: MercadoPagoConfig,
    preferenceData: IPreference,
    orderData: IPreOrderDto,
    host: string
  ): Promise<ResponseDto<string>> {
    if (preferenceData.stock < orderData.quantity) {
      return { success: false, message: 'No hay stock suficiente para la cantidad solicitada' };
    }

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: orderData.variant_uuid,
            title: preferenceData.products.name,
            quantity: orderData.quantity,
            unit_price: preferenceData.price
          }
        ],
        shipments: {
          receiver_address: {
            floor: orderData.address_id.toString()
          }
        },
        external_reference: orderData.user_uuid,
        notification_url: `${host}/v1/payments`,
        marketplace_fee: 0.05,
        auto_return: 'all',
        back_urls: {
          success: `${host}/pagos/exitoso`,
          failure: `${host}/pagos/fallido`
        },
        redirect_urls: {
          success: `${host}/pagos/exitoso`,
          failure: `${host}/pagos/fallido`
        }
      }
    });
    return { success: true, message: 'Preferencia creada correctamente', data: preference.sandbox_init_point };
  }
}
