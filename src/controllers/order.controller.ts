import { Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { OrderService } from './../services/order.service';
import { Uuid } from '../shared/domain/value-object/Uuid';
import { ValueObjectException } from '../shared/domain/exceptions/ValueObjectException';
import { InvalidArgumentError } from '../shared/domain/value-object/InvalidArgumentError';

export class OrderController {
  static async getByBuyerId(req: Request, res: Response) {
    try {
      const user_uuid = new Uuid(req.params.buyerUuid);
      const response = await OrderService.getByBuyerId(user_uuid.getValue());
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ValueObjectException || error instanceof InvalidArgumentError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getBySellerId(req: Request, res: Response) {
    try {
      const user_uuid = new Uuid(req.params.sellerUuid);
      const response = await OrderService.getBySellerId(user_uuid.getValue());
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ValueObjectException || error instanceof InvalidArgumentError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }
}
