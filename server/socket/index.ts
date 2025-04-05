import { Server as HttpServer } from 'http';
import { createSocketServer } from './config';
import { socketAuth } from './middleware/auth';
import { BattleHandler } from './battleHandler';
import { SocketWithAuth } from '../types/socket';

export function initializeSocket(httpServer: HttpServer) {
  const io = createSocketServer(httpServer);
  const battleHandler = new BattleHandler(io);

  // Apply authentication middleware
  io.use(socketAuth);

  // Handle connection events
  io.on('connection', async (socket: SocketWithAuth) => {
    console.log(`User connected: ${socket.id}`);

    try {
      // Join user's personal room
      const userId = socket.data.user._id;
      await socket.join(userId.toString());

      // Handle battle events
      battleHandler.handleConnection(socket);

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
        battleHandler.handleDisconnect(socket);
      });

      // Handle errors
      socket.on('error', (error) => {
        console.error(`Socket error for user ${socket.id}:`, error);
      });

    } catch (error) {
      console.error('Error in socket connection:', error);
      socket.disconnect(true);
    }
  });

  // Global error handler
  io.engine.on('connection_error', (error) => {
    console.error('Socket.IO connection error:', error);
  });

  return io;
} 