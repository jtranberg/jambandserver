import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create user
router.post('/', async (req, res) => {
  const { name, username, email, bio, avatar } = req.body;
  try {
    const user = new User({ name, username, email, bio, avatar });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user
router.put('/:username', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users (public band profiles)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
