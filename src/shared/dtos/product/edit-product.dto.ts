export interface UpdateProductDto {
  category_id: number;
  name: string;
  brand: string;
  description?: string | null;
}
