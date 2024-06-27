import { Request as ExpressRequest } from 'express';
import { Profile } from '../models';

declare module 'express-serve-static-core' {
  interface Request {
    profile: Profile;
  }
}

export interface CustomRequest extends ExpressRequest {
  profile: Profile;
}
