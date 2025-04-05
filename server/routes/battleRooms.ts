import { Router } from 'express';
import { BattleRoom, BattleRoomProblem, BattleRoomPlayer } from '../models';
import { requiresAuth } from 'express-openid-connect';

const router = Router();

// GET /battle_rooms
router.get('/', requiresAuth(), async (req, res) => {
  try {
    const rooms = await BattleRoom.find()
      .populate('creatorId', 'name email')
      .select('-__v');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch battle rooms' });
  }
});

// POST /battle_rooms
router.post('/', requiresAuth(), async (req, res) => {
  try {
    const room = await BattleRoom.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create battle room' });
  }
});

// GET /battle_rooms/:id/problems
router.get('/:id/problems', requiresAuth(), async (req, res) => {
  try {
    const problems = await BattleRoomProblem.find({ battleRoomId: req.params.id })
      .populate('problemId')
      .select('-__v');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch battle room problems' });
  }
});

// POST /battle_rooms/:id/players
router.post('/:id/players', requiresAuth(), async (req, res) => {
  try {
    const player = await BattleRoomPlayer.create({
      battleRoomId: req.params.id,
      ...req.body
    });
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add player' });
  }
});

export default router; 