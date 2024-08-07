import express from 'express';
import cloudinaryUploader from '../config/cloudinaryConfig.js';
import Product from '../models/Product.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Auth middleware per le altre rotte
// router.use(authMiddleware);

// POST /products
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /products/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /products/:id/image
router.patch('/:id/image', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { image: req.file.path },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }

    res.json({ image: updatedProduct.image });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.json({ message: 'Prodotto eliminato' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;