import { Request, Response } from 'express';
import { Email } from '../shared/domain/value-object/Email';
import { PhoneNumber } from '../shared/domain/value-object/PhoneNumber';
import { Password } from '../shared/domain/value-object/User/Password';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { ValueObjectException } from '../shared/domain/exceptions/ValueObjectException';
import { CreateBuyerDto } from '../shared/dtos/user/buyer/create-buyer.dto';
import { BuyerService } from '../services/buyer.service';
import { Name } from '../shared/domain/value-object/User/Name';
import { LastName } from '../shared/domain/value-object/User/LastName';
import { InvalidArgumentError } from '../shared/domain/value-object/InvalidArgumentError';
import { Page } from '../shared/domain/value-object/Page';

export class BuyerController {
  static async create(req: Request, res: Response) {
    try {
      const createSellerDto: CreateBuyerDto = req.body;
      const name = new Name(createSellerDto.name);
      const lastname = new LastName(createSellerDto.lastname);
      const email = new Email(createSellerDto.email);
      const phone_number = new PhoneNumber(createSellerDto.phone_number);
      const password = new Password(createSellerDto.password);
      const response = await BuyerService.create({
        name: name.getValue(),
        lastname: lastname.getValue(),
        email: email.getValue(),
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
      const response = await BuyerService.getAll(page);
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
}
