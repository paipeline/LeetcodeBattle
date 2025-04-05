import { connectDB } from '../db';
import { User, Problem, BattleRoom, UserFriend, UserProblem, BattleRoomProblem, BattleRoomPlayer } from '../models';

async function initCollections() {
  try {
    await connectDB();
    
    // Create collections if they don't exist
    await User.createCollection();
    await Problem.createCollection();
    await BattleRoom.createCollection();
    await UserFriend.createCollection();
    await UserProblem.createCollection();
    await BattleRoomProblem.createCollection();
    await BattleRoomPlayer.createCollection();

    console.log('Collections initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing collections:', error);
    process.exit(1);
  }
}

initCollections(); 