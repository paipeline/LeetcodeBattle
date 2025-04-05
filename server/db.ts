import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/leetcodebattle';
    
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully');
    
    // Add connection error handler
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Add disconnection handler
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err; // Rethrow to be caught by startServer
  }
};
