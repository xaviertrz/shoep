import { Router, Request, Response } from 'express';
import { NeighborhoodController } from '../controllers/neighborhood.controller';
const router = Router();

router.get('/v1/neighborhoods', (req: Request, res: Response) => NeighborhoodController.getAll(req, res));

export default router;
