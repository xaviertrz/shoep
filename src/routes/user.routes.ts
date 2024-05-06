import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateJwt } from '../middlewares/validate-jwt.middleware';
const router = Router();

/* Users Routes */

router.get('/v1/users/id/:userId', (req: Request, res: Response) => UserController.getById(req, res));
router.delete('/v1/users/:userId', (req: Request, res: Response) => UserController.delete(req, res));
router.post('/v1/users/authenticate', (req: Request, res: Response) => UserController.authenticate(req, res));
router.get('/v1/users/refresh-token', validateJwt, (req: Request, res: Response) =>
  UserController.refreshToken(req, res)
);
export default router;
