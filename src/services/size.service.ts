import { Constants } from '../utils/constants';
import { Page } from '../shared/domain/value-object/Page';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { ISize } from '../interfaces/size.interface';
import { SizeRepository } from '../repositories/size.repository';

export class SizeService {
  static async getAll(page: Page): Promise<ResponseDto<ISize[]>> {
    const perPage = Constants.RECORDS_PER_PAGE;

    return await SizeRepository.getAll(page.getValue(), perPage);
  }
}
