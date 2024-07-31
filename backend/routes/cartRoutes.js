import express from 'express';
import Cart from '../models/Cart.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Auth middleware for the others routes
router.use(authMiddleware);

// GET /carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /carts/:id
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /carts
router.post('/', async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /carts/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /carts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;