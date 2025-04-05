import mongoose, { Schema, Document } from 'mongoose';

export interface IUserFriend extends Document {
  userId: mongoose.Types.ObjectId;
  friendId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

const userFriendSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  friendId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'blocked'], default: 'pending' }
}, { timestamps: true });

export const UserFriend = mongoose.model<IUserFriend>('UserFriend', userFriendSchema); 