import { Response } from 'express';
import { CustomRequest } from '../types';
import { getContractById, getContractsListByProfileId } from '../services/contract-service';

export const getUserContractById = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const profileId = req.profile?.id ?? '';
  const contract = await getContractById(parseInt(id), profileId);
  if (!contract) return res.status(404).json({ message: 'We apologize, but there is no contract available against your profile at this time.' }).end();
  res.json(contract);
};

export const getUserContractList = async (req: CustomRequest, res: Response) => {
  const profileId = req.profile?.id ?? '';
  if (profileId) {
    const contract = await getContractsListByProfileId(profileId);
    if (!contract) return res.status(404).json({ message: 'We apologize, but there are no contract available against your profile at this time.' }).end();
    res.json(contract);
  }
};
