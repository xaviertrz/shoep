import { IVariantForm } from './IVariantForm';

export interface IProductForm {
  category_id: number;
  seller_uuid: string;
  name: string;
  brand: string;
  description?: string | null;
  variant: IVariantForm;
}
