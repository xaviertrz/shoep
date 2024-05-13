import { ResponseDto } from '../shared/dtos/response/response.dto';
import { ColorRepository } from '../repositories/color.repository';
import { GetAllColorsDto } from '../shared/dtos/color/get-all-colors.dto';

export class ColorService {
  static async getAll(): Promise<ResponseDto<GetAllColorsDto[]>> {
    return await ColorRepository.getAll();
  }
}
