import { Response } from 'express';
import { getUnpaidJobsService, payForJobService } from '../services/job-service';
import { CustomRequest } from '../types';

export const getAllUnpaidJobsController = async (req: CustomRequest, res: Response) => {
  const jobs = await getUnpaidJobsService(req.profile.id);
  res.json(jobs);
};

export const payForJobController = async (req: CustomRequest, res: Response) => {
  const { job_id } = req.params;
  const data = await payForJobService(parseInt(job_id), req.profile.id);
  console.log({ data });
  res.json({ success: true, data });
};
