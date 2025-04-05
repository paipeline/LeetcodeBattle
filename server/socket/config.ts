import { Server as HttpServer } from 'http';
import { Server, ServerOptions } from 'socket.io';

export const socketConfig: Partial<ServerOptions> = {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
};

export function createSocketServer(httpServer: HttpServer): Server {
  return new Server(httpServer, socketConfig);
} 