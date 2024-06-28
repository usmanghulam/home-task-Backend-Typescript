import { Response } from 'express';
import { CustomRequest } from '../types';
import { getContractById, getContractsListByProfileId } from '../services/contract-service';

export const getUserContractById = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const contract = await getContractById(parseInt(id), req.profile?.id);
  if (!contract) return res.status(404).json({ message: 'We apologize, but there is no contract available against your profile at this time.' }).end();
  res.json(contract);
};

export const getUserContractList = async (req: CustomRequest, res: Response) => {
  const contract = await getContractsListByProfileId(req.profile.id);
  if (!contract) return res.status(404).json({ message: 'We apologize, but there are no contracts available against your profile at this time.' }).end();
  res.json(contract);
};
