import express from 'express';
import Post from '../models/Post.js';
import cloudinaryUploader from '../config/cloudinaryConfig.js';

const router = express.Router();

// GET /posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /posts
router.post('/', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    const postData = req.body;

    if (req.file) {
      postData.image = req.file.path;
    }

    const newPost = new Post(postData);

    await newPost.save();

    res.status(201).json(newPost);

  } catch (err) {
    console.error('Post creation error', err);
    res.status(400).json({ message: err.message });
  }
});

// PATCH /posts/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /posts/:id/image
router.patch('/:id/image', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { image: req.file.path },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ image: updatedPost.image });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;