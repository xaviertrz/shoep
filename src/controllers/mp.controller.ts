import { Request, Response } from 'express';
import { MpService } from '../services/mp.service';
import { ControllerError } from '../shared/domain/exceptions/ControllerException';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { CreatePreferenceDto } from '../shared/dtos/mp/create-preference.dto';
import { AddressId } from '../shared/domain/value-object/UserAddress/AddressId';
import { Uuid } from '../shared/domain/value-object/Uuid';
import { ProductRepository } from '../repositories/product.repository';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { OrderService } from '../services/order.service';
import { Quantity } from '../shared/domain/value-object/Quantity';

export class MpController {
  private static client: MercadoPagoConfig;

  static async handleMercadoPagoRedirect(req: Request, res: Response) {
    try {
      const current_url = req.url;
      const urlParams = new URLSearchParams(current_url.split('?')[1]);
      const code = urlParams.get('code');
      const user_uuid = urlParams.get('state');
      if (!code || !user_uuid) {
        throw new ControllerError(
          'Parámetros "code" y "state" son requeridos en la URL para manejar el redirect de Mercado Pago'
        );
      }

      const response = await MpService.createToken(code, user_uuid);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async createPreference(req: Request, res: Response) {
    try {
      const createPreferenceDto: CreatePreferenceDto = req.body;
      const variant_uuid = new Uuid(createPreferenceDto.variant_uuid);
      const user_uuid = new Uuid(createPreferenceDto.user_uuid);
      const address_id = new AddressId(createPreferenceDto.address_id);
      const quantity = new Quantity(createPreferenceDto.quantity);
      const preferenceData = await ProductRepository.getVariantById(createPreferenceDto.variant_uuid);
      if (!preferenceData.success) throw new ControllerError(preferenceData.message!);

      const orderData = {
        variant_uuid: variant_uuid.getValue(),
        user_uuid: user_uuid.getValue(),
        address_id: address_id.getValue(),
        quantity: quantity.getValue()
      };

      this.client = new MercadoPagoConfig({ accessToken: preferenceData.data!.products.users.mp_access_token! });
      const response = await MpService.createPreference(this.client, preferenceData.data!, orderData);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async storePayment(req: Request, res: Response) {
    try {
      const notification = req.body as { data: { id: number } };
      const payment = await new Payment({ accessToken: this.client.accessToken }).get({ id: notification.data?.id });
      if (payment && payment.status === 'approved') {
        const order = {
          user_uuid: payment.external_reference!,
          variant_uuid: payment.additional_info!.items![0]!.id,
          address_id: Number(payment.additional_info!.shipments!.receiver_address!.floor),
          quantity: Number(payment.additional_info!.items![0]!.quantity),
          total: Number(payment.transaction_details!.total_paid_amount),
          status: payment.status,
          paid_at: new Date(payment.date_approved!)
        };

        await OrderService.createOrder(order);
      }

      res.status(HttpResponseCodes.OK).json({ success: true, message: 'Pedido almacenado' });
    } catch (error) {
      console.log(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }
}
