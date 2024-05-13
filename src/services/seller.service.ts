import { v4 as uuidv4 } from 'uuid';
import { ISeller } from '../interfaces/seller.interface';
import { CreateSellerDto } from '../shared/dtos/user/seller/create.seller.dto';
import { roleIds } from '../constants/role-ids';
import { SocrataApi } from '../utils/socrata.api';
import { registerConditions } from '../constants/register-conditions';
import { SocrataResponse } from '../shared/dtos/socrata.response.dto';
import { CaseUseException } from '../shared/domain/exceptions/CaseUseException';
import { registerDefaults } from '../constants/register-defaults';
import { SellerRepository } from '../repositories/seller.repository';
import { Constants } from '../utils/constants';
import { Page } from '../shared/domain/value-object/Page';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { SellerDto } from '../shared/dtos/user/seller/seller.dto';
import * as bcrypt from 'bcrypt';

export class SellerService {
  static async create(createSellerDto: CreateSellerDto): Promise<ResponseDto<SellerDto>> {
    try {
      const sellerData = await mapToSeller(createSellerDto);
      return await SellerRepository.create(sellerData);
    } catch (error) {
      console.log(error);
      if (error instanceof CaseUseException) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: 'Error creando usuario' };
      }
    }
  }

  static async getAll(page: Page): Promise<ResponseDto<SellerDto[]>> {
    const perPage = Constants.RECORDS_PER_PAGE;

    return await SellerRepository.getAll(page.getValue(), perPage);
  }
}

async function mapToSeller(createSellerDto: CreateSellerDto): Promise<ISeller> {
  const company = await validateSellerByNit(createSellerDto.nit);
  const hashedPassword = await bcrypt.hash(createSellerDto.password, 10);
  return {
    uuid: uuidv4(),
    role_id: roleIds.SELLER,
    username: company.razon_social,
    email: createSellerDto.email,
    nit: createSellerDto.nit,
    phone_number: createSellerDto.phone_number,
    password: hashedPassword,
    active: registerDefaults.ACTIVE,
    confirmed: registerDefaults.CONFIRMED,
    created_at: new Date()
  };
}

async function validateSellerByNit(nit: bigint): Promise<SocrataResponse> {
  const company = await SocrataApi.getCompanyDataByNit(nit);

  if (!registerConditions.company.cities.includes(company.ciudad.toUpperCase())) {
    throw new CaseUseException(`La empresa ${company.razon_social} no está en ${registerConditions.company.cities}.`);
  }

  if (!registerConditions.company.sizes.includes(company.tama_o_empresa.toUpperCase())) {
    throw new CaseUseException(`La empresa ${company.razon_social} no está en ${registerConditions.company.sizes}.`);
  }

  const companyDescriptionParsed = company.desc_ciiu1.toUpperCase().split(' ');
  registerConditions.company.sectors.forEach(sector => {
    if (!companyDescriptionParsed.includes(sector)) {
      throw new CaseUseException(
        `La empresa ${company.razon_social} no está en ${registerConditions.company.sectors}.`
      );
    }
  });

  if (!registerConditions.company.status.includes(company.estado.toUpperCase())) {
    throw new CaseUseException(`La empresa ${company.razon_social} no está en ${registerConditions.company.status}.`);
  }

  return company;
}
