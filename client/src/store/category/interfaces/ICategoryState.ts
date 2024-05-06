import { GetAllCategoriesDto } from '../../../dtos/CategoryDto';

export interface ICategoryState {
  categories: GetAllCategoriesDto[];
  active?: GetAllCategoriesDto | null;
}
