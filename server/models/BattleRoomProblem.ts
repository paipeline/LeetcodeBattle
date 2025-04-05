import mongoose, { Schema, Document } from 'mongoose';

export interface IBattleRoomProblem extends Document {
  battleRoomId: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  assignedAt: Date;
  required: boolean;
}

const battleRoomProblemSchema = new Schema({
  battleRoomId: { type: Schema.Types.ObjectId, ref: 'BattleRoom', required: true },
  problemId: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
  assignedAt: { type: Date, default: Date.now },
  required: { type: Boolean, default: false }
});

export const BattleRoomProblem = mongoose.model<IBattleRoomProblem>('BattleRoomProblem', battleRoomProblemSchema); 