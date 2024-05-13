import { GetAllColorsDto } from '../../../dtos/GetAllColorsDto';
import { GetAllMaterialsDto } from '../../../dtos/GetAllMaterialsDto';
import { GetAllSizesDto } from '../../../dtos/GetAllSizesDto';

export interface IProductOptionsState {
  materials: GetAllMaterialsDto[];
  colors: GetAllColorsDto[];
  sizes: GetAllSizesDto[];
}
