import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateJwt } from '../middlewares/validate-jwt.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';
import { roleIds } from '../constants/role-ids';
const router = Router();

/*  Product Routes  */
router.get('/v1/products', (req: Request, res: Response) => ProductController.getAll(req, res));
router.get('/v1/products/by-uuid/:productUuid', (req: Request, res: Response) => ProductController.getById(req, res));
router.get('/v1/products/by-seller-uuid/:sellerUuid', (req: Request, res: Response) =>
  ProductController.getAllBySellerUuid(req, res)
);
router.get('/v1/products/by-category/:categoryId', (req: Request, res: Response) =>
  ProductController.getAllByCategoryId(req, res)
);
router.post('/v1/products', validateJwt, validateRole(roleIds.SELLER), (req: Request, res: Response) =>
  ProductController.create(req, res)
);
router.put('/v1/products/:productUuid', validateJwt, validateRole(roleIds.SELLER), (req: Request, res: Response) =>
  ProductController.updateProduct(req, res)
);

/* Product Variant Routes */
router.get('/v1/product-variants/:variantUuid', (req: Request, res: Response) =>
  ProductController.getVariantById(req, res)
);
router.post('/v1/product-variants', validateJwt, validateRole(roleIds.SELLER), (req: Request, res: Response) =>
  ProductController.createVariant(req, res)
);
router.put(
  '/v1/product-variants/:variantUuid',
  validateJwt,
  validateRole(roleIds.SELLER),
  (req: Request, res: Response) => ProductController.updateVariant(req, res)
);
router.delete(
  '/v1/product-variants/:variantId',
  validateJwt,
  validateRole(roleIds.SELLER),
  (req: Request, res: Response) => ProductController.deleteVariant(req, res)
);

export default router;
