import { Server } from 'socket.io';
import { SocketWithAuth, MatchmakingUser, CodeUpdateData, BattleCompleteData } from '../types/socket';
import { Battle } from '../models/Battle';
import { Question } from '../models/Questions';

export class BattleHandler {
  private connectedUsers: Map<string, SocketWithAuth> = new Map();
  private waitingUsers: Set<string> = new Set();
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  handleConnection(socket: SocketWithAuth): void {
    const userId = socket.data.user._id.toString();
    this.connectedUsers.set(userId, socket);

    socket.on('ready_to_match', async (data: { skill?: string }) => {
      this.waitingUsers.add(userId);
      await this.tryMatch(userId, data.skill);
    });

    socket.on('cancel_match', () => {
      this.waitingUsers.delete(userId);
    });

    this.setupBattleEvents(socket);
  }

  handleDisconnect(socket: SocketWithAuth): void {
    const userId = socket.data.user._id.toString();
    this.connectedUsers.delete(userId);
    this.waitingUsers.delete(userId);
    
    // Notify opponent if in battle
    // Add your logic here
  }

  private async tryMatch(userId: string, skill?: string): Promise<void> {
    // Find opponent with similar skill level
    const opponent = Array.from(this.waitingUsers)
      .find(id => id !== userId && this.connectedUsers.has(id));

    if (opponent) {
      this.waitingUsers.delete(userId);
      this.waitingUsers.delete(opponent);
      await this.createBattle(userId, opponent, skill);
    }
  }

  private async createBattle(user1Id: string, user2Id: string, skill?: string): Promise<void> {
    try {
      const battle = await Battle.create({
        roomId: `battle_${Date.now()}`,
        leftUser: user1Id,
        rightUser: user2Id,
        state: 'active'
      });

      const question = await Question.findOne({ 
        difficulty: skill || 'Easy' 
      });

      this.io.to(user1Id).emit('match_found', {
        battleId: battle._id,
        roomId: battle.roomId,
        opponent: user2Id,
        question
      });
      
      this.io.to(user2Id).emit('match_found', {
        battleId: battle._id,
        roomId: battle.roomId,
        opponent: user1Id,
        question
      });
    } catch (error) {
      console.error('Battle creation error:', error);
      // Return users to waiting queue
      this.waitingUsers.add(user1Id);
      this.waitingUsers.add(user2Id);
    }
  }

  private setupBattleEvents(socket: SocketWithAuth): void {
    socket.on('code_update', async (data: CodeUpdateData) => {
      try {
        const battle = await Battle.findById(data.battleId);
        if (!battle) return;

        if (battle.leftUser.toString() === data.userId) {
          battle.leftContent = data.code;
        } else if (battle.rightUser.toString() === data.userId) {
          battle.rightContent = data.code;
        }

        await battle.save();

        socket.to(battle.roomId).emit('opponent_code_update', {
          code: data.code,
          userId: data.userId
        });
      } catch (error) {
        console.error('Code update error:', error);
      }
    });

    socket.on('battle_complete', async (data: BattleCompleteData) => {
      try {
        const battle = await Battle.findById(data.battleId);
        if (!battle) return;

        battle.state = 'completed';
        await battle.save();

        this.io.to(battle.roomId).emit('battle_ended', {
          winner: data.userId,
          result: data.result
        });
      } catch (error) {
        console.error('Battle completion error:', error);
      }
    });
  }
} 