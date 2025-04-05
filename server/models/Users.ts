// /server/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  auth0Id: { type: String, required: true, unique: true }, // Unique identifier from Auth0
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
