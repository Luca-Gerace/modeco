import express from 'express';
import Coupon from '../models/Coupon.js';

const router = express.Router();

// GET /coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /coupons/:id
router.get('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /coupons
router.post('/', async (req, res) => {
  const coupon = new Coupon(req.body);
  try {
    const newCoupon = await coupon.save();
    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /coupons/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json(updatedCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /coupons/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;