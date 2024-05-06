import { Router, Request, Response } from 'express';
import { MpController } from '../controllers/mp.controller';
const router = Router();

router.get('/v1/mercado_pago_redirect', async (req: Request, res: Response) =>
  MpController.handleMercadoPagoRedirect(req, res)
);
router.post('/v1/preferences', async (req: Request, res: Response) => MpController.createPreference(req, res));
router.post('/v1/payments', async (req: Request, res: Response) => MpController.storePayment(req, res));

export default router;
