import { auth, AuthResult } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';
import { User, IUser } from './models/Users';
import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;

if (!audience || !domain) {
  throw new Error('Required Auth0 environment variables are missing');
}

// Extend the Request type to include auth and user
interface CustomRequest extends Request {
  auth?: AuthResult;
  user?: IUser;
}

export const checkJwt = auth({
  audience: audience,
  issuerBaseURL: `https://${domain}`,
  tokenSigningAlg: 'RS256'
});

export const handleUser = async (
  req: CustomRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const auth0Id = req.auth?.payload.sub;
    const email = req.auth?.payload.email as string;

    if (!auth0Id || !email) {
      res.status(401).json({ error: 'Invalid token payload' });
      return;
    }

    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = await User.create({
        auth0Id,
        email,
        name: req.auth?.payload.name || email.split('@')[0],
        avatar: req.auth?.payload.picture || ''
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}; 