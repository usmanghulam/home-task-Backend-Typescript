import { Op } from 'sequelize';
import { Profile, Job, Contract } from '../models';

const parseDate = (dateStr: string): Date => new Date(dateStr);

export const getBestProfession = async (start: string, end: string) => {
  
  return 'nothing'
};

export const getBestClients = async (start: string, end: string, limit: number) => {
 
  return 'admin service'
};
