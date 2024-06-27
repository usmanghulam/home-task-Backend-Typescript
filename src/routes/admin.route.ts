import { Router } from 'express';
import { getBestProfessionController, getBestClientsController } from '../controllers/admin-controller';

const router = Router();

router.get('/admin/best-profession', getBestProfessionController);
router.get('/admin/best-clients', getBestClientsController);

export default router;
