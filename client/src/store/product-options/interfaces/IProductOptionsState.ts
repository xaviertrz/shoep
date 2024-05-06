import { IColor } from '../../../interfaces/IColor';
import { IMaterial } from '../../../interfaces/IMaterial';
import { ISize } from '../../../interfaces/ISize';

export interface IProductOptionsState {
  materials: IMaterial[];
  colors: IColor[];
  sizes: ISize[];
}
