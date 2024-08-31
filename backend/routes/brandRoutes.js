import express from 'express';
import Brand from '../models/Brand.js';
import cloudinaryUploader from '../config/cloudinaryConfig.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /brands/:id
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Auth middleware for the others routes
// router.use(authMiddleware);


// POST /brands
router.post('/', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    const brandData = req.body;

    if (req.file) {
      brandData.image = req.file.path;
    }

    const newBrand = new Brand(brandData);

    await newBrand.save();

    res.status(201).json(newBrand);

  } catch (err) {
    console.error('Brand creation error', err);
    res.status(400).json({ message: err.message });
  }
});

// PATCH /brands/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(updatedBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /brands/:id/image
router.patch('/:id/image', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      { image: req.file.path },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json({ image: updatedBrand.image });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /brands/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;