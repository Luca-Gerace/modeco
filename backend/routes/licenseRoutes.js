import express from 'express';
import License from '../models/License.js';
import cloudinaryUploader from '../config/cloudinaryConfig.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /licenses
router.get('/', async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /licenses/:id
router.get('/:id', async (req, res) => {
  try {
    const license = await License.findById(req.params.id);
    if (!license) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json(license);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Auth middleware for the others routes
// router.use(authMiddleware);

// POST /licenses
router.post('/', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    const licenseData = req.body;

    if (req.file) {
      licenseData.image = req.file.path;
    }

    const newLicense = new License(licenseData);

    await newLicense.save();

    res.status(201).json(newLicense);

  } catch (err) {
    console.error('License creation error', err);
    res.status(400).json({ message: err.message });
  }
});

// PATCH /licenses/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedLicense = await License.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLicense) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json(updatedLicense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /licenses/:id/image
router.patch('/:id/image', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const updatedLicense = await License.findByIdAndUpdate(
      req.params.id,
      { image: req.file.path },
      { new: true }
    );

    if (!updatedLicense) {
      return res.status(404).json({ message: 'License not found' });
    }

    res.json({ image: updatedLicense.image });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /licenses/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedLicense = await License.findByIdAndDelete(req.params.id);
    if (!deletedLicense) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json({ message: 'License deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;