// /server/models/Question.js
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  testCases: string[];
  starterCode: string;
  solution: string;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
  testCases: [{ type: String }],
  starterCode: { type: String, default: '' },
  solution: { type: String, required: true },
}, { timestamps: true });

export const Question = mongoose.model<IQuestion>('Question', questionSchema);
