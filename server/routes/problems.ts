import { Router } from 'express';
import { Problem } from '../models';
import { requiresAuth } from 'express-openid-connect';

const router = Router();

// GET /problems
router.get('/', requiresAuth(), async (req, res) => {
  try {
    const problems = await Problem.find().select('-__v');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// GET /problems/:id
router.get('/:id', requiresAuth(), async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).select('-__v');
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problem' });
  }
});

// POST /problems
router.post('/', requiresAuth(), async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create problem' });
  }
});

export default router; 