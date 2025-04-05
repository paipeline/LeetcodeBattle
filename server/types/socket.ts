import { Socket } from 'socket.io';

export interface MatchmakingUser {
  userId: string;
  skill?: string;
  timestamp: number;
}

export interface SocketWithAuth extends Socket {
  auth?: {
    token: string;
  };
  userId?: string;
}

export interface CodeUpdateData {
  battleId: string;
  userId: string;
  code: string;
}

export interface BattleCompleteData {
  battleId: string;
  userId: string;
  result: 'win' | 'lose' | 'draw';
} 