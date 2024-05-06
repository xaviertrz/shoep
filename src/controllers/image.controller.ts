import { Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { ImageService } from '../services/image.service';
import { Uuid } from '../shared/domain/value-object/Uuid';
import { ImageId } from '../shared/domain/value-object/Image/ImageId';
import { ControllerError } from '../shared/domain/exceptions/ControllerException';
import { ImageRepository } from '../repositories/image.repository';
import { ProductRepository } from '../repositories/product.repository';

export class ImageController {
  static async create(req: Request, res: Response) {
    try {
      const variant_uuid = new Uuid(req.body.variant_uuid);
      const images = req.files as Express.Multer.File[];
      const basePath = `${req.protocol}://${req.get('host')}/public/images/`;
      const response = await ImageService.create({ variant_uuid: variant_uuid.getValue(), basePath, images: images! });
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        const images = await ImageRepository.getAllByVariantUuid(variant_uuid.getValue());
        if (images.data?.length === 0) {
          await ProductRepository.deleteVariant(variant_uuid.getValue());
        }

        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAllByVariantUuid(req: Request, res: Response) {
    try {
      const variant_uuid = new Uuid(req.params.variantUuid);
      const response = await ImageService.getAllByVariantUuid(variant_uuid.getValue());
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const image_id = new ImageId(Number(req.params.imageId));
      const response = await ImageService.delete(image_id.getValue());
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }
}
