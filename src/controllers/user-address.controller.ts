import { Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { ValueObjectException } from '../shared/domain/exceptions/ValueObjectException';
import { InvalidArgumentError } from '../shared/domain/value-object/InvalidArgumentError';
import { CreateUserAddressDto } from '../shared/dtos/user-address/create-user-address.dto';
import { NeighborhoodId } from '../shared/domain/value-object/UserAddress/NeighborhoodId';
import { Uuid } from '../shared/domain/value-object/Uuid';
import { AddressLine } from '../shared/domain/value-object/UserAddress/AddressLine';
import { UserAddressService } from '../services/user-address.service';
import { UpdateUserAddressDto } from '../shared/dtos/user-address/update-user-address.dto';
import { AddressPhone } from '../shared/domain/value-object/UserAddress/AddressPhone';

export class UserAddressController {
  static async createUserAddress(req: Request, res: Response) {
    try {
      const createUserAddressDto: CreateUserAddressDto = req.body;
      const neighborhood_id = new NeighborhoodId(createUserAddressDto.neighborhood_id);
      const user_uuid = new Uuid(createUserAddressDto.user_uuid);
      const phone_number = new AddressPhone(createUserAddressDto.phone_number);
      const address_line1 = new AddressLine(createUserAddressDto.address_line1);
      createUserAddressDto.address_line2 ? new AddressLine(createUserAddressDto.address_line2) : null;
      const response = await UserAddressService.createUserAddress({
        neighborhood_id: neighborhood_id.getValue(),
        user_uuid: user_uuid.getValue(),
        address_line1: address_line1.getValue(),
        address_line2: createUserAddressDto.address_line2,
        phone_number: phone_number.getValue()
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

  static async updateUserAddressById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updateUserAddressDto: UpdateUserAddressDto = req.body;
      updateUserAddressDto.neighborhood_id ? new NeighborhoodId(updateUserAddressDto.neighborhood_id) : null;
      updateUserAddressDto.phone_number ? new AddressPhone(updateUserAddressDto.phone_number) : null;
      updateUserAddressDto.address_line1 ? new AddressLine(updateUserAddressDto.address_line1) : null;
      updateUserAddressDto.address_line2 ? new AddressLine(updateUserAddressDto.address_line2) : null;
      const toUpdateData = {
        neighborhood_id: updateUserAddressDto.neighborhood_id,
        address_line1: updateUserAddressDto.address_line1,
        address_line2: updateUserAddressDto.address_line2,
        phone_number: updateUserAddressDto.phone_number
      };
      const response = await UserAddressService.updateUserAddress(id, toUpdateData, {
        token_user_uuid: req.body.token_user_uuid,
        token_role_id: req.body.token_role_id
      });

      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
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

  static async deleteUserAddressById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await UserAddressService.deleteUserAddressById(id, {
        token_user_uuid: req.body.token_user_uuid,
        token_role_id: req.body.token_role_id
      });
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  static async getAddressesByUserId(req: Request, res: Response) {
    try {
      const user_uuid = new Uuid(req.params.userUuid);
      const response = await UserAddressService.getAddressesByUserId(user_uuid.getValue());

      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }
}
