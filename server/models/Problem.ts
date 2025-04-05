import mongoose, { Schema, Document } from 'mongoose';

export interface IProblem extends Document {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const problemSchema = new Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  acceptance: { type: Number, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export const Problem = mongoose.model<IProblem>('Problem', problemSchema); 