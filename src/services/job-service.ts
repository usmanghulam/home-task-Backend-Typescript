import { Op, Transaction } from 'sequelize';
import { Contract, Job, Profile, sequelize } from '../models';
import { CONTRACT_STATUSES } from '../types/constants';

export const getUnpaidJobsService = async (profileId: number) => {
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [
        { ClientId: profileId },
        { ContractorId: profileId }
      ],
      status: CONTRACT_STATUSES.IN_PROGRESS
    }
  });

  return Job.findAll({
    where: {
      ContractId: { [Op.in]: contracts.map(contract => contract.id) },
      paid: false
    }
  });
};

export const payForJobService = async (jobId: number, clientId: number): Promise<Job | null> => {
  try {
    return sequelize.transaction(async (trManager: Transaction) => {
      const job = await Job.findByPk(jobId, {
        include: [{
          model: Contract,
          include: [{ model: Profile, as: 'Client' }, { model: Profile, as: 'Contractor' }]
        }],
        transaction: trManager,
        lock: trManager.LOCK.UPDATE
      }) as any;

      if (!job || !job.Contract || job.paid) return null;

      const client = job.Contract.Client;
      const contractor = job.Contract.Contractor;

      if (!client || !contractor || client.id !== clientId) return null;

      if (client.balance < job.price) throw new Error('Insufficient balance');

      await client.update({ balance: client.balance - job.price }, { transaction: trManager });
      await contractor.update({ balance: contractor.balance + job.price }, { transaction: trManager });
      await job.update({ paid: true, paymentDate: new Date() }, { transaction: trManager });

      return job;
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Internel Server Error!');
  }
};

