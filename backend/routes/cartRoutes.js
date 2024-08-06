import express from 'express';
import Cart from '../models/Cart.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /cart (recupera il carrello dell'utente autenticato)
router.get('/', authMiddleware, async (req, res) => {
  try {    
    let cart = await Cart.findOne({ userId: req.user._id }).populate({
      path: 'items.productId',
      select: 'name price image'
    });

    // Se il carrello non esiste, creane uno vuoto
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }

    // Calcola totalPrice e totalQuantity
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

    res.json(cart);
  } catch (err) {
    console.error('Errore nel recupero del carrello:', err);
    res.status(500).json({ message: err.message });
  }
});

// PATCH /cart/:id (aggiorna la quantità di un articolo nel carrello)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }

    // Aggiorna gli articoli nel carrello
    const { items } = req.body;
    cart.items = items; // Aggiorna gli articoli
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /cart/:productId (rimuovi un articolo dal carrello)
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
    res.status(500).json({ message: err.message });
  }
});

export default router;