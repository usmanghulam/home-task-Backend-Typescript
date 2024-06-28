import { Request, Response } from 'express';
import { balanceDepositService } from '../services/profile-service';

export const balanceDepositController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    console.log(req.body, req.params)

    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount.' });
    }

    const data = await balanceDepositService(parseInt(userId), parseFloat(amount));
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};
