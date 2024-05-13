import { ResponseDto } from '../shared/dtos/response/response.dto';
import { MaterialRepository } from '../repositories/material.repository';
import { GetAllMaterialsDto } from '../shared/dtos/material/get-all-materials.dto';

export class MaterialService {
  static async getAll(): Promise<ResponseDto<GetAllMaterialsDto[]>> {
    return await MaterialRepository.getAll();
  }
}
