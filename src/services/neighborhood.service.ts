import { ResponseDto } from '../shared/dtos/response/response.dto';
import { NeighborhoodRepository } from '../repositories/neighborhood.repository';
import { INeighborhood } from '../interfaces/neighborhood.interface';

export class NeighborhoodService {
  static async getAll(): Promise<ResponseDto<INeighborhood[]>> {
    return await NeighborhoodRepository.getAll();
  }
}
