export interface IProduct {
  readonly id?: number | null;
  uuid: string;
  category_id: number;
  seller_uuid: string;
  name: string;
  brand: string;
  description?: string | null;
  active: boolean;
  blocked: boolean;
  created_at: Date | string;
  modified_at?: Date | string | null;
  deleted_at?: Date | string | null;
}
