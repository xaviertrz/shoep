import { Router, Request, Response } from 'express';
import { AdminController } from '../controllers/admin.controller';
const router = Router();

router.post('/v1/users/admin', (req: Request, res: Response) => AdminController.create(req, res));
export default router;
