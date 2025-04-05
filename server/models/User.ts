import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;
  name: string;
  email: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  auth0Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema); 