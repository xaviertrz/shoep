import { Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { Page } from '../shared/domain/value-object/Page';
import { SizeService } from '../services/size.service';

export class SizeController {
  static async getAll(req: Request, res: Response) {
    try {
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await SizeService.getAll(page);
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
