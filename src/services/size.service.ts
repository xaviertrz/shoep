import { ResponseDto } from '../shared/dtos/response/response.dto';
import { SizeRepository } from '../repositories/size.repository';
import { GetAllSizesDto } from '../shared/dtos/size/get-all-sizes.dto';

export class SizeService {
  static async getAll(): Promise<ResponseDto<GetAllSizesDto[]>> {
    return await SizeRepository.getAll();
  }
}
