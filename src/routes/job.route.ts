import { Router } from 'express';
import { getAllUnpaidJobsController, payForJobController } from '../controllers/job-controller';
import { getProfile } from '../middleware/getProfile';

const router = Router();

router.get('/jobs/unpaid', getProfile, getAllUnpaidJobsController);
router.post('/jobs/:job_id/pay', getProfile, payForJobController);

export default router;
