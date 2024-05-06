import { Router, Request, Response } from 'express';
import { OrderController } from '../controllers/order.controller';
const router = Router();

router.get('/v1/orders/by-buyerUuid/:buyerUuid', (req: Request, res: Response) =>
  OrderController.getByBuyerId(req, res)
);
router.get('/v1/orders/by-sellerUuid/:sellerUuid', (req: Request, res: Response) =>
  OrderController.getBySellerId(req, res)
);

export default router;
