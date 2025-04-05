import mongoose, { Schema, Document } from 'mongoose';

export interface IBattleRoomPlayer extends Document {
  battleRoomId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  joinedAt: Date;
  status: 'active' | 'eliminated' | 'winner';
}

const battleRoomPlayerSchema = new Schema({
  battleRoomId: { type: Schema.Types.ObjectId, ref: 'BattleRoom', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'eliminated', 'winner'], default: 'active' }
});

export const BattleRoomPlayer = mongoose.model<IBattleRoomPlayer>('BattleRoomPlayer', battleRoomPlayerSchema); 