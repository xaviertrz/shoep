import { ResponseDto } from '../shared/dtos/response/response.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { GetAllCategoriesDto } from '../shared/dtos/category/get-all-categories.dto';

export class CategoryService {
  static async getAll(): Promise<ResponseDto<GetAllCategoriesDto[]>> {
    return await CategoryRepository.getAll();
  }
}
