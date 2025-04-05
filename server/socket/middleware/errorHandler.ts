import { Socket } from 'socket.io';

export function socketErrorHandler(socket: Socket, error: Error) {
  console.error(`Socket error for ${socket.id}:`, error);
  
  // Emit error to client
  socket.emit('error', {
    message: error.message || 'An unexpected error occurred'
  });

  // Disconnect on critical errors
  if (error.message.includes('Authentication')) {
    socket.disconnect(true);
  }
} 