import { Op } from 'sequelize';
import { Contract } from '../models';

export const getContractById = async (contractId: number, profileId: number): Promise<Contract | null> => {
  return Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [
        { ClientId: profileId },
        { ContractorId: profileId }
      ]
    }
  });
};

export const getContractsListByProfileId = async (profileId: number): Promise<Contract[]> => {
  return Contract.findAll({
    where: {
      [Op.or]: [
        { ClientId: profileId },
        { ContractorId: profileId }
      ],
      status: { [Op.not]: 'terminated' }
    }
  });
};