import { Request, Response } from 'express';
import { depositBalance } from '../services/profile-service';

export const depositBalanceController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { amount } = req.body;
  await depositBalance(parseInt(userId), parseFloat(amount));
  res.json({ success: true });
};
