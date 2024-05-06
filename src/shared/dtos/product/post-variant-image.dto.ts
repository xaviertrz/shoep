export interface PostVariantImageDto {
  variant_uuid: string;
  basePath: string;
  images: Express.Multer.File[];
}
