import { IProduct } from '../../../interfaces/IProduct';
import { IProductImage } from '../../../interfaces/IProductImage';
import { IProductVariant } from '../../../interfaces/IProductVariant';

export interface IProductListState {
  products: IProduct[];
  active: IProduct;
  activeVariant: IProductVariant;
  activeImages: IProductImage[];
}
