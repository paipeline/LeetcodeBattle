import { Router } from 'express';
import { UserFriend } from '../models';
import { requiresAuth } from 'express-openid-connect';

const router = Router();

// GET /users/:userId/friends
router.get('/:userId/friends', requiresAuth(), async (req, res) => {
  try {
    const friends = await UserFriend.find({ userId: req.params.userId })
      .populate('friendId', 'name email score')
      .select('-__v');
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

// POST /users/:userId/friends
router.post('/:userId/friends', requiresAuth(), async (req, res) => {
  try {
    const friend = await UserFriend.create({
      userId: req.params.userId,
      ...req.body
    });
    res.status(201).json(friend);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add friend' });
  }
});

export default router; 