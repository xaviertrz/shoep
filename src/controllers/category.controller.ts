import { Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    try {
      const response = await CategoryService.getAll();
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
