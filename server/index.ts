// /server/index.s
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { connectDB } from './db';
import { checkJwt, handleUser } from './auth';
import { Battle } from './models/Battle';
import { AuthResult } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import { Question } from './models/Question';
import { initializeSocket } from './socket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Initialize socket.io
initializeSocket(server);

// Middleware
app.use(express.json());

// Extend Request type to include user and auth
interface CustomRequest extends Request {
  auth?: AuthResult;
  user?: {
    _id: string;
    [key: string]: any;
  };
}

// Public routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Protected routes
app.get('/api/protected', 
  checkJwt, 
  (req: CustomRequest, res: Response) => {
    res.json({ message: 'Protected resource' });
});

app.post('/api/auth/verify', 
  checkJwt, 
  handleUser, 
  (req: CustomRequest, res: Response) => {
    res.json({ user: req.user });
});

app.get('/api/user/profile', 
  checkJwt, 
  handleUser, 
  (req: CustomRequest, res: Response) => {
    res.json({ user: req.user });
});

app.post('/api/battles/create', 
  checkJwt, 
  handleUser, 
  async (req: CustomRequest, res: Response) => {
    try {
      if (!req.user?._id) {
        throw new Error('User not authenticated');
      }
      
      const battle = await Battle.create({
        roomId: req.body.roomId,
        leftUser: req.user._id,
        rightUser: req.body.opponentId,
        state: 'pending'
      });
      res.json({ battle });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
});


app.get('/api/auth/test', checkJwt, async (req: CustomRequest, res: Response) => {
  try {
    const userInfo = {
      auth: req.auth?.payload,
      sub: req.auth?.payload.sub,
      email: req.auth?.payload.email,
      permissions: req.auth?.payload.permissions,
    };
    
    res.json({
      message: 'Auth0 connection successful',
      userInfo
    });
  } catch (error) {
    res.status(500).json({
      message: 'Auth0 test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Socket.IO setup
interface SocketWithAuth extends Socket {
  auth?: {
    token: string;
  };
}

io.use((socket: SocketWithAuth, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  // Verify token here
  next();
});

// Add these socket event types
interface MatchmakingUser {
  userId: string;
  skill?: string;
  timestamp: number;
}

// Add to your existing socket setup
io.on('connection', (socket: SocketWithAuth) => {
  let waitingUsers: MatchmakingUser[] = [];

  // User joins matchmaking queue
  socket.on('join_matchmaking', async (userData: { userId: string, skill?: string }) => {
    const user: MatchmakingUser = {
      userId: userData.userId,
      skill: userData.skill,
      timestamp: Date.now()
    };
    
    waitingUsers.push(user);
    
    // Check for match
    if (waitingUsers.length >= 2) {
      const [user1, user2] = waitingUsers.splice(0, 2);
      
      try {
        // Create a battle room
        const battle = await Battle.create({
          roomId: `battle_${Date.now()}`,
          leftUser: user1.userId,
          rightUser: user2.userId,
          state: 'active'
        });

        // Get a random question
        const question = await Question.findOne({ 
          difficulty: user1.skill || 'Easy' 
        });

        // Notify matched users
        io.to(user1.userId).emit('match_found', {
          battleId: battle._id,
          roomId: battle.roomId,
          opponent: user2.userId,
          question
        });
        
        io.to(user2.userId).emit('match_found', {
          battleId: battle._id,
          roomId: battle.roomId,
          opponent: user1.userId,
          question
        });
      } catch (error) {
        console.error('Match creation error:', error);
        // Return users to queue if error
        waitingUsers.push(user1, user2);
      }
    }
  });

  // Handle code updates
  socket.on('code_update', async (data: {
    battleId: string,
    userId: string,
    code: string
  }) => {
    try {
      const battle = await Battle.findById(data.battleId);
      if (!battle) return;

      // Update the appropriate user's code
      if (battle.leftUser.toString() === data.userId) {
        battle.leftContent = data.code;
      } else if (battle.rightUser.toString() === data.userId) {
        battle.rightContent = data.code;
      }

      await battle.save();

      // Broadcast update to opponent
      socket.to(battle.roomId).emit('opponent_code_update', {
        code: data.code,
        userId: data.userId
      });
    } catch (error) {
      console.error('Code update error:', error);
    }
  });

  // Handle battle completion
  socket.on('battle_complete', async (data: {
    battleId: string,
    userId: string,
    result: 'win' | 'lose' | 'draw'
  }) => {
    try {
      const battle = await Battle.findById(data.battleId);
      if (!battle) return;

      battle.state = 'completed';
      await battle.save();

      io.to(battle.roomId).emit('battle_ended', {
        winner: data.userId,
        result: data.result
      });
    } catch (error) {
      console.error('Battle completion error:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    // Remove user from waiting queue if they disconnect
    waitingUsers = waitingUsers.filter(u => u.userId !== socket.id);
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
