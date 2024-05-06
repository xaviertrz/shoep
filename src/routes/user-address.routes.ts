import { Router, Request, Response } from 'express';
import { UserAddressController } from '../controllers/user-address.controller';
import { validateJwt } from '../middlewares/validate-jwt.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';
import { roleIds } from '../constants/role-ids';
const router = Router();

router.get('/v1/user-addresses/by-user-uuid/:userUuid', async (req: Request, res: Response) =>
  UserAddressController.getAddressesByUserId(req, res)
);
router.post('/v1/user-addresses', validateJwt, validateRole(roleIds.BUYER), async (req: Request, res: Response) =>
  UserAddressController.createUserAddress(req, res)
);
router.put('/v1/user-addresses/:id', validateJwt, validateRole(roleIds.BUYER), async (req: Request, res: Response) =>
  UserAddressController.updateUserAddressById(req, res)
);
router.delete('/v1/user-addresses/:id', validateJwt, validateRole(roleIds.BUYER), async (req: Request, res: Response) =>
  UserAddressController.deleteUserAddressById(req, res)
);

export default router;
