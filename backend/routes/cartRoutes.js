import express from 'express';
import Cart from '../models/Cart.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Auth middleware for the others routes
// router.use(authMiddleware);

// GET /cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate({
      path: 'items.productId',
      select: 'name price image'
    });
    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }
    const cartData = {
      _id: cart._id,
      items: cart.items.map(item => ({
        _id: item._id,
        quantity: item.quantity,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image
      })),
      totalPrice: cart.totalPrice
    };
    res.json(cartData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /cart (add to cart or update quantity if already exists)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /cart (update item quantity)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Articolo non trovato nel carrello' });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /cart/:productId (remove item from cart)
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const productId = req.params.productId;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;