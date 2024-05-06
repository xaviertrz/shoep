import { roleIds } from '../constants/role-ids';
import { CaseUseException } from '../shared/domain/exceptions/CaseUseException';
import { registerDefaults } from '../constants/register-defaults';
import { CreateBuyerDto } from '../shared/dtos/user/buyer/create-buyer.dto';
import { IBuyer } from '../interfaces/buyer.interface';
import { BuyerRepository } from '../repositories/buyer.repository';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Page } from '../shared/domain/value-object/Page';
import { Constants } from '../utils/constants';
import { BuyerDto } from '../shared/dtos/user/buyer/buyer.dto';
import { ResponseDto } from '../shared/dtos/response/response.dto';

export class BuyerService {
  static async create(createBuyerDto: CreateBuyerDto): Promise<ResponseDto<BuyerDto>> {
    try {
      const sellerData = await mapToBuyer(createBuyerDto);
      const response = await BuyerRepository.create(sellerData);

      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof CaseUseException) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: 'Error creando usuario' };
      }
    }
  }

  static async getAll(page: Page): Promise<ResponseDto<BuyerDto[]>> {
    const perPage = Constants.RECORDS_PER_PAGE;
    return await BuyerRepository.getAll(page.getValue(), perPage);
  }
}

async function mapToBuyer(createSellerDto: CreateBuyerDto): Promise<IBuyer> {
  const username = createSellerDto.name.toUpperCase() + ' ' + createSellerDto.lastname.toUpperCase();
  const hashedPassword = await bcrypt.hash(createSellerDto.password, 10);
  return {
    uuid: uuidv4(),
    role_id: roleIds.BUYER,
    username,
    email: createSellerDto.email,
    phone_number: createSellerDto.phone_number,
    password: hashedPassword,
    active: registerDefaults.ACTIVE,
    confirmed: registerDefaults.CONFIRMED,
    created_at: registerDefaults.CREATED_AT
  };
}
