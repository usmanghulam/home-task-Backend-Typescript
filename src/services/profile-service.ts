import { Transaction } from 'sequelize';
import { Profile, sequelize } from '../models';
import { getUnpaidJobsService } from './job-service';

export const balanceDepositService = async (userId: number, amount: number): Promise<Profile | null> => {
  try {
    return sequelize.transaction(async (trManager: Transaction) => {
      const client = await Profile.findByPk(userId, { transaction: trManager, lock: trManager.LOCK.UPDATE });

      if (!client || client.type !== 'client') {
        throw new Error('Client Not Found or Not Authorized');
      }

      const unpaidJobs = await getUnpaidJobsService(userId);
      const totalUnpaidJobAmount = unpaidJobs.reduce((sum, job) => sum + job.price, 0);
      const maxDepositAmount = totalUnpaidJobAmount * 0.25;

      if (amount > maxDepositAmount) throw new Error('Deposit exceeds allowed limit');

      await client.update({ balance: client.balance + amount }, { transaction: trManager });

      return client;
    });
  } catch (error) {
    console.error('Error in Balance Deposit Service: ', error);
    throw error;
  }
};

