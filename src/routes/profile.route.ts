import { Router } from 'express';
import { balanceDepositController } from '../controllers/profile-controller';
import { getProfile } from '../middleware/getProfile';

const router = Router();

router.post('/balances/deposit/:userId', getProfile, balanceDepositController);

export default router;
