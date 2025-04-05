import mongoose, { Schema, Document } from 'mongoose';

export interface IBattleRoom extends Document {
  name: string;
  creatorId: mongoose.Types.ObjectId;
  difficulties: string[];
  createdAt: Date;
  updatedAt: Date;
}

const battleRoomSchema = new Schema({
  name: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  difficulties: [{ type: String }]
}, { timestamps: true });

export const BattleRoom = mongoose.model<IBattleRoom>('BattleRoom', battleRoomSchema); 