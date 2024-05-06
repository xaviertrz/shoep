export interface UpdateUserDTO {
  success: boolean;
  message?: string;
  user?: any;
  data?: any;
}
export interface UpdateSellerDTO extends UpdateUserDTO {
  nit: string;
}
