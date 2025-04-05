import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProblem extends Document {
  userId: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  status: 'solved' | 'attempted' | 'unsolved';
  solutionLink?: string;
  solvedAt?: Date;
  updatedAt: Date;
}

const userProblemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
  status: { type: String, enum: ['solved', 'attempted', 'unsolved'], default: 'unsolved' },
  solutionLink: { type: String },
  solvedAt: { type: Date }
}, { timestamps: true });

export const UserProblem = mongoose.model<IUserProblem>('UserProblem', userProblemSchema); 