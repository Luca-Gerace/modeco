import express from 'express';
import cloudinaryUploader from '../config/cloudinaryConfig.js';
import User from '../models/User.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users
router.post('/', async (req, res) => {
  
  const user = new User(req.body);

  try {
    // Save new user in MongoDB
    const newUser = await user.save();

    // Remove user password from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /users/:id/avatar
router.patch('/:id/avatar', cloudinaryUploader.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { avatar: req.file.path },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ avatar: updatedUser.avatar });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
  try {
    // Find and update specific user in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete specific users in MongoDB
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;