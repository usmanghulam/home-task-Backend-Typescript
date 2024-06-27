import { Response, NextFunction } from 'express';
import { Profile } from '../models';
import { CustomRequest } from '../types';

export const getProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const message = 'You are not authorized to access this resource';
  const profileId = req.get('profile_id');
  if (!profileId) return res.status(401).json({ message }).end();

  const profile = await Profile.findOne({ where: { id: profileId } });
  if (!profile) return res.status(401).json({ message }).end();

  req.profile = profile;
  next();
};
