import { Request, Response } from 'express';
import { CreateSellerDto } from '../shared/dtos/user/seller/create.seller.dto';
import { Email } from '../shared/domain/value-object/Email';
import { Nit } from '../shared/domain/value-object/User/Nit';
import { PhoneNumber } from '../shared/domain/value-object/PhoneNumber';
import { Password } from '../shared/domain/value-object/User/Password';
import { SellerService } from '../services/seller.service';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { ValueObjectException } from '../shared/domain/exceptions/ValueObjectException';
import { InvalidArgumentError } from '../shared/domain/value-object/InvalidArgumentError';
import { Page } from '../shared/domain/value-object/Page';

export class SellerController {
  static async create(req: Request, res: Response) {
    try {
      const createSellerDto: CreateSellerDto = req.body;
      const email = new Email(createSellerDto.email);
      const nit = new Nit(createSellerDto.nit);
      console.log(createSellerDto.phone_number);
      const phone_number = new PhoneNumber(createSellerDto.phone_number);
      const password = new Password(createSellerDto.password);
      const response = await SellerService.create({
        email: email.getValue(),
        nit: nit.getValue(),
        phone_number: phone_number.getValue(),
        password: password.getValue()
      });
      if (response.success) {
        res.status(HttpResponseCodes.CREATED).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException || error instanceof InvalidArgumentError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await SellerService.getAll(page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  /* static async update(req: Request, res: Response) {
    try {
      const uuidParam = req.params.userId;
      const name = req.body.name ? new Name(req.body.name).value : undefined;
      const password = req.body.password ? new Password(req.body.password).value : undefined;
      const response = await UserService.update(uuidParam, {
        name,
        password
      });
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
      }
    }
  } */
}
