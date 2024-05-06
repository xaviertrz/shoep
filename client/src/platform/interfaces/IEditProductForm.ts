export interface IEditProductForm {
  uuid: string;
  category_id: number;
  name: string;
  brand: string;
  description?: string | null;
}
