import { Constants } from '../utils/constants';
import { Page } from '../shared/domain/value-object/Page';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { MaterialRepository } from '../repositories/material.repository';
import { IMaterial } from '../interfaces/material.interface';

export class MaterialService {
  static async getAll(page: Page): Promise<ResponseDto<IMaterial[]>> {
    const perPage = Constants.RECORDS_PER_PAGE;

    return await MaterialRepository.getAll(page.getValue(), perPage);
  }
}
