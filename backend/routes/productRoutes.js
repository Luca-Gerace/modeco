import express from 'express';
import cloudinaryUploader from '../config/cloudinaryConfig.js';
import Product from '../models/Product.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('brand', 'name')
      .exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('brand', 'name')
      .populate('licenses', 'name')
      .exec();
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
router.post('/', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.image = req.file.path;
    }

    const newProduct = new Product(productData);

    // Save new product in MongoDB
    await newProduct.save();

    // const htmlContent = `
    //   <h1>Post published!</h1>
    //   <p>Hi</p>
    //   <p>This is your product: "${newProduct.brand}"</p>
    //   <p>thank you</p>
    // `

    // // Mailgun trigger
    // await sendEmail(newPost.author, 'post created!', htmlContent)

    res.status(201).json(newProduct);

  } catch (err) {
    console.error('Product creation error', err);
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