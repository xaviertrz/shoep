export interface IOrder {
  readonly id?: number | null;
  uuid: string;
  user_uuid: string;
  variant_uuid: string;
  address_id: number;
  quantity: number;
  total: number;
  status: string;
  paid_at: Date;
}
