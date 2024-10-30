import { Router, Request, Response } from 'express';
import { BuyerController } from '../controllers/buyer.controller';
const router = Router();

/* Buyer Routes */
router.post('/v1/users/buyer', (req: Request, res: Response) => BuyerController.create(req, res));
router.get('/v1/users/buyer', (req: Request, res: Response) => BuyerController.getAll(req, res));

export default router;
