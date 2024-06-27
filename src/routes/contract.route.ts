import { Router } from 'express';
import { getUserContractById, getUserContractList } from '../controllers/contract-controller';
import { getProfile } from '../middleware/getProfile';

const router = Router();

router.get('/contracts/:id', getProfile, getUserContractById);
router.get('/contracts', getProfile, getUserContractList);

export default router;
