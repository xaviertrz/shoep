import { Request, Response } from 'express';
import { Email } from '../shared/domain/value-object/Email';
import { PhoneNumber } from '../shared/domain/value-object/PhoneNumber';
import { Password } from '../shared/domain/value-object/User/Password';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { ValueObjectException } from '../shared/domain/exceptions/ValueObjectException';
import { Name } from '../shared/domain/value-object/User/Name';
import { LastName } from '../shared/domain/value-object/User/LastName';
import { InvalidArgumentError } from '../shared/domain/value-object/InvalidArgumentError';
import { CreateAdminDto } from '../shared/dtos/user/admin/create-admin.dto';
import { AdminService } from '../services/admin.service';
import { Key } from '../shared/domain/value-object/Admin/Key';

export class AdminController {
  static async create(req: Request, res: Response) {
    try {
      const createAdminDto: CreateAdminDto = req.body;
      const name = new Name(createAdminDto.name);
      const lastname = new LastName(createAdminDto.lastname);
      const email = new Email(createAdminDto.email);
      const key = new Key(createAdminDto.key);
      const phone_number = new PhoneNumber(createAdminDto.phone_number);
      const password = new Password(createAdminDto.password);
      const response = await AdminService.create({
        name: name.getValue(),
        lastname: lastname.getValue(),
        email: email.getValue(),
        key: key.getValue(),
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
}
