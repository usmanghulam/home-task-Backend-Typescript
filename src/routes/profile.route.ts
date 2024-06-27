import { Router } from 'express';
import { depositBalanceController } from '../controllers/profile-controller';
import { getProfile } from '../middleware/getProfile';

const router = Router();

router.post('/balances/deposit/:userId', getProfile, depositBalanceController);

export default router;
