export interface IVariantImage {
  id?: number | null;
  variant_uuid: string;
  source: string;
  active: boolean;
  created_at: Date | string;
}
