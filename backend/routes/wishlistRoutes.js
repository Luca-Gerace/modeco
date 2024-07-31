import express from 'express';
import Wishlist from '../models/Wishlist.js';

const router = express.Router();

// GET /wishlists
router.get('/', async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /wishlists/:id
router.get('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /wishlists
router.post('/', async (req, res) => {
  const wishlist = new Wishlist(req.body);
  try {
    const newWishlist = await wishlist.save();
    res.status(201).json(newWishlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /wishlists/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(updatedWishlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /wishlists/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedWishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedWishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json({ message: 'Wishlist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;