import { Request, Response } from 'express';
import { getBestProfession, getBestClients } from '../services/admin-service';

export const getBestProfessionController = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Please provide start and end dates' });
    }
    const result = await getBestProfession(start as string, end as string);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getBestClientsController = async (req: Request, res: Response) => {
  try {
    const { start, end, limit } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Please provide start and end dates' });
    }
    const limitValue = limit ? parseInt(limit as string, 10) : 2;
    const result = await getBestClients(start as string, end as string, limitValue);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
