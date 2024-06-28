import { Op, col, fn, literal } from 'sequelize';
import { Profile, Job, Contract, sequelize } from '../models';

export const getBestProfessionService = async (start: Date, end: Date): Promise<{ profession: string, total: number } | null> => {
  const result = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [start, end]
      }
    },
    include: [{
      model: Contract,
      include: [{ model: Profile, as: 'Contractor' }]
    }],
    attributes: [
      [fn('sum', col('Job.price')), 'total'],
      [col('Contract.Contractor.profession'), 'profession']
    ],
    group: [col('Contract.Contractor.profession')],
    order: [[fn('sum', col('Job.price')), 'DESC']],
    limit: 1
  }) as any;

  if (result.length === 0) return null;

  const profession = result[0].get('profession');
  const total = result[0].get('total') as number;

  return { profession, total };
};

export const getBestClientsService = async (start: Date, end: Date, limit = 2): Promise<{ id: number, fullName: string, paid: number }[]> => {
  const result = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [start, end]
      }
    },
    include: [{
      model: Contract,
      include: [{ model: Profile, as: 'Client' }]
    }],
    attributes: [
      [col('Contract.Client.id'), 'id'],
      [literal('`Contract->Client`.firstName || " " || `Contract->Client`.lastName'), 'fullName'],
      [fn('sum', col('Job.price')), 'paid']
    ],
    group: ['Contract.Client.id', 'Contract.Client.firstName', 'Contract.Client.lastName'],
    order: [[fn('sum', col('Job.price')), 'DESC']],
    limit
  });

  // return result as any;
  return result.map(r => ({
    id: r.get('id') as number,
    fullName: r.get('fullName') as string,
    paid: r.get('paid') as any
  }));
};

