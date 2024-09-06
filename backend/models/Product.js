import mongoose from "mongoose";
import User from './User.js';

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  rate: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'License' }],
  ecoPoints: { type: Number },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { 
    type: String,
    enum: ['clothes', 'cosmetics', 'food_and_beverage', 'second_hand'],
    default: 'clothes',
    required: true
  },
  color: { 
    type: String, 
    required: function() { return this.category === 'clothes' || this.category === 'second_hand'; } 
  },
  size: { 
    type: [String], 
    required: function() { return this.category === 'clothes' || this.category === 'second_hand'; } 
  },
  type: { type: String, required: true },
  reviews: [reviewSchema],
  averageRate: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: "products"
});

export default mongoose.model("Product", productSchema);