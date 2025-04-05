import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRouter from './routes/auth';
import { MongoClient, ServerApiVersion } from 'mongodb';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Auth router
app.use(authRouter);

// Update MongoDB connection
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
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
