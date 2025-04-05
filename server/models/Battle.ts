// /server/models/Battle.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IBattle extends Document {
  roomId: string;
  leftUser: mongoose.Types.ObjectId;
  rightUser: mongoose.Types.ObjectId;
  leftContent: string;
  rightContent: string;
  questionId: mongoose.Types.ObjectId;
  state: 'pending' | 'active' | 'completed';
  winner?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const battleSchema = new Schema({
  roomId: { type: String, required: true, unique: true },
  leftUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rightUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  leftContent: { type: String, default: '' },
  rightContent: { type: String, default: '' },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  state: { 
    type: String, 
    enum: ['pending', 'active', 'completed'], 
    default: 'pending' 
  },
  winner: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Battle = mongoose.model<IBattle>('Battle', battleSchema);
