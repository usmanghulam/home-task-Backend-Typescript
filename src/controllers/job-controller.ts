import { Response } from 'express';
import { getUnpaidJobsService, payForJobService } from '../services/job-service';
import { CustomRequest } from '../types';

export const getAllUnpaidJobsController = async (req: CustomRequest, res: Response) => {
  const jobs = await getUnpaidJobsService(req.profile.id);
  res.json(jobs);
};

export const payForJobController = async (req: CustomRequest, res: Response) => {
  try {
    const { job_id } = req.params;

    if (!job_id || isNaN(Number(job_id))) {
      return res.status(400).json({ error: 'Invalid job id' });
    }

    const data = await payForJobService(parseInt(job_id), req.profile.id);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};
