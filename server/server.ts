import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRouter from './routes/auth';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { connectDB } from './db';
import usersRouter from './routes/users';
import userFriendsRouter from './routes/userFriends';
import problemsRouter from './routes/problems';
import battleRoomsRouter from './routes/rooms';
import * as swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Auth router
mongoose.connect(process.env.MONGO_URI!, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
});
app.use('/auth', authRouter);

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/users-friends', userFriendsRouter);
app.use('/problems', problemsRouter);
app.use('/battle_rooms', battleRoomsRouter);

// Swagger docs route
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs, { explorer: true }));

// Update MongoDB connection
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(uri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
// Example: const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
