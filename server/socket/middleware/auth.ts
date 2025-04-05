import { Socket } from 'socket.io';
import { auth } from 'express-oauth2-jwt-bearer';
import { User } from '../../models/Users';

export async function socketAuth(socket: Socket, next: (err?: Error) => void) {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication token required'));
    }

    // Verify Auth0 token
    const checkJwt = auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
      tokenSigningAlg: 'RS256'
    });

    // Get user from database
    const payload = await checkJwt(token);
    const user = await User.findOne({ auth0Id: payload.sub });
    
    if (!user) {
      return next(new Error('User not found'));
    }

    socket.data.user = user;
    next();
  } catch (error) {
    console.error('Socket authentication error:', error);
    next(new Error('Authentication failed'));
  }
} 