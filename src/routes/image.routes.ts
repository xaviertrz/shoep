import { Router, Request, Response } from 'express';
import { ImageController } from '../controllers/image.controller';
import upload from '../middlewares/multer.middleware';
const router = Router();

router.post('/v1/variant-images', upload.array('images'), (req: Request, res: Response) =>
  ImageController.create(req, res)
);
router.get('/v1/variant-images/by-variant-uuid/:variantUuid', (req: Request, res: Response) =>
  ImageController.getAllByVariantUuid(req, res)
);
router.delete('/v1/variant-images/:imageId', (req: Request, res: Response) => ImageController.delete(req, res));
/* router.get('/v1/users/seller', (req: Request, res: Response) => SellerController.getAll(req, res)); */
/* router.put('/v1/users/seller/:userId', (req: Request, res: Response) => SellerController.update(req, res)); */
/* router.get('/v1/sellers', (req: Request, res: Response) => sellerController.getAllUsers(req, res));
router.post('/v1/users/seller', (req: Request, res: Response) => sellerController.createSeller(req, res));
router.post('/v1/users/buyer', (req: Request, res: Response) => sellerController.createBuyer(req, res));
router.get('/v1/users/:userId', (req: Request, res: Response) => sellerController.getUserById(req, res));
router.get('/v1/users/:userId', (req: Request, res: Response) => sellerController.getUserById(req, res));
router.put('/v1/users/:roleId', (req: Request, res: Response) => sellerController.getUserById(req, res));
router.delete('/v1/users/:userId', (req: Request, res: Response) => sellerController.deleteUser(req, res));
router.post('/v1/users/authenticate', (req: Request, res: Response) => sellerController.authenticateUser(req, res)); */

export default router;
