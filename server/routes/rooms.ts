import { Router } from 'express';
import { BattleRoom, BattleRoomProblem, BattleRoomPlayer } from '../models';
import { requiresAuth } from 'express-openid-connect';

const router = Router();

/**
 * @swagger
 * /battle_rooms:
 *   get:
 *     summary: Retrieve all battle rooms
 *     tags: [Battle Rooms]
 *     responses:
 *       200:
 *         description: List of battle rooms
 */
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

/**
 * @swagger
 * /battle_rooms/{id}:
 *   get:
 *     summary: Retrieve a specific battle room
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', requiresAuth(), async (req, res) => {
  try {
    const room = await BattleRoom.findById(req.params.id)
      .populate('creatorId', 'name email');
    if (!room) return res.status(404).json({ error: 'Battle room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch battle room' });
  }
});

/**
 * @swagger
 * /battle_rooms:
 *   post:
 *     summary: Create a new battle room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               creator_id:
 *                 type: string
 *               difficulties:
 *                 type: string
 */
router.post('/', requiresAuth(), async (req, res) => {
  try {
    const room = await BattleRoom.create({
      name: req.body.name,
      creatorId: req.body.creator_id,
      difficulties: req.body.difficulties.split(',')
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create battle room' });
  }
});

/**
 * @swagger
 * /battle_rooms/{id}/problems:
 *   get:
 *     summary: Get all problems in a battle room
 */
router.get('/:id/problems', requiresAuth(), async (req, res) => {
  try {
    const problems = await BattleRoomProblem.find({ battleRoomId: req.params.id })
      .populate('problemId')
      .select('-__v');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

/**
 * @swagger
 * /battle_rooms/{id}/problems:
 *   post:
 *     summary: Add a problem to a battle room
 */
router.post('/:id/problems', requiresAuth(), async (req, res) => {
  try {
    const problem = await BattleRoomProblem.create({
      battleRoomId: req.params.id,
      problemId: req.body.problem_id,
      required: req.body.required
    });
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add problem' });
  }
});

/**
 * @swagger
 * /battle_rooms/{id}/players:
 *   get:
 *     summary: Get all players in a battle room
 */
router.get('/:id/players', requiresAuth(), async (req, res) => {
  try {
    const players = await BattleRoomPlayer.find({ battleRoomId: req.params.id })
      .populate('userId', 'name email score')
      .select('-__v');
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

/**
 * @swagger
 * /battle_rooms/{id}/players:
 *   post:
 *     summary: Add a player to a battle room
 */
router.post('/:id/players', requiresAuth(), async (req, res) => {
  try {
    const player = await BattleRoomPlayer.create({
      battleRoomId: req.params.id,
      userId: req.body.user_id,
      status: 'active'
    });
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add player' });
  }
});

/**
 * @swagger
 * /battle_rooms/{room_id}/players/{user_id}:
 *   put:
 *     summary: Update a player's status in a battle room
 */
router.put('/:room_id/players/:user_id', requiresAuth(), async (req, res) => {
  try {
    const player = await BattleRoomPlayer.findOneAndUpdate(
      { battleRoomId: req.params.room_id, userId: req.params.user_id },
      { status: req.body.status },
      { new: true }
    );
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update player status' });
  }
});

/**
 * @swagger
 * /battle_rooms/{room_id}/players/{user_id}:
 *   delete:
 *     summary: Remove a player from a battle room
 */
router.delete('/:room_id/players/:user_id', requiresAuth(), async (req, res) => {
  try {
    const player = await BattleRoomPlayer.findOneAndDelete({
      battleRoomId: req.params.room_id,
      userId: req.params.user_id
    });
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json({ message: 'Player removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove player' });
  }
});

export default router;
