import { Request, Response } from 'express';
/* import { Page } from '../shared/domain/value-object/Page'; */
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { UserService } from '../services/user.service';
import { Uuid } from '../shared/domain/value-object/Uuid';
import { Email } from '../shared/domain/value-object/Email';
import { AuthUserDto } from '../shared/dtos/user/auth-user.dto';
import { ValueObjectException } from '../shared/domain/exceptions/ValueObjectException';
import { InvalidArgumentError } from '../shared/domain/value-object/InvalidArgumentError';
import { Page } from '../shared/domain/value-object/Page';
import { RoleId } from '../shared/domain/value-object/User/RoleId';

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await UserService.getAll(page);
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

  static async delete(req: Request, res: Response) {
    try {
      const uuid = new Uuid(req.params.userId);
      const response = await UserService.delete(uuid.getValue());
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

  static async getById(req: Request, res: Response) {
    try {
      const uuid = new Uuid(req.params.userId);
      const response = await UserService.getById(uuid.getValue());
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

  static async authenticate(req: Request, res: Response) {
    try {
      const authUserDto: AuthUserDto = req.body;
      const email = new Email(authUserDto.email);
      if (!authUserDto.password) throw new ValueObjectException('La contraseña es obligatoria');

      const response = await UserService.authenticate({ email: email.getValue(), password: authUserDto.password });
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

  static async refreshToken(req: Request, res: Response) {
    try {
      const user_uuid = new Uuid(req.body.token_user_uuid);
      const role_id = new RoleId(req.body.token_role_id);
      const response = await UserService.refreshToken({
        token_user_uuid: user_uuid.getValue(),
        token_role_id: role_id.getValue()
      });

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
