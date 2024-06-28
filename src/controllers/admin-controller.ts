import { Request, Response } from 'express';
import { getBestProfessionService, getBestClientsService } from '../services/admin-service';
import { parseDate } from '../utils';

export const getBestProfessionController = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ error: 'Please provide start and end dates' });
    }

    const startDate = parseDate(start as string);
    const endDate = parseDate(end as string);

    const data = await getBestProfessionService(startDate, endDate);
    res.json({ data });

  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message });
  }
};

export const getBestClientsController = async (req: Request, res: Response) => {
  try {
    const { start, end, limit } = req.query;

    if (!start || !end) {
      return res.status(400).json({ error: 'Please provide start and end dates' });
    }
    const limitValue = limit ? parseInt(limit as string) : 2;
    const startDate = parseDate(start as string);
    const endDate = parseDate(end as string);

    const data = await getBestClientsService(startDate, endDate, limitValue);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};
