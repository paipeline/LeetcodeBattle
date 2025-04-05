import { auth } from 'express-openid-connect';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost8000',
    clientID: '80n98tYAgsGLc8FWyKnAZZCP6uvu5ETH',
    issuerBaseURL: 'https://dev-okuv7e4san8cqsx0.us.auth0.com'
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

export default router;
