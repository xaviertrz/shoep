import { Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { ColorService } from '../services/color.service';

export class ColorController {
  static async getAll(req: Request, res: Response) {
    try {
      const response = await ColorService.getAll();
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
