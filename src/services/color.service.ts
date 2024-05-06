import { Constants } from '../utils/constants';
import { Page } from '../shared/domain/value-object/Page';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { ColorRepository } from '../repositories/color.repository';
import { IColor } from '../interfaces/color.interface';

export class ColorService {
  static async getAll(page: Page): Promise<ResponseDto<IColor[]>> {
    const perPage = Constants.RECORDS_PER_PAGE;

    return await ColorRepository.getAll(page.getValue(), perPage);
  }
}
