import mongoose from "mongoose";
import User from './User.js';

const productSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'License' }],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  discount: { type: Number, default: 0 },
  onSale: { type: Boolean, default: false },
  image: { type: String, required: true },
  category: { 
    type: String,
    enum: ['clothes', 'cosmetics', 'food_and_beverage', 'second_hand'],
    default: 'clothes',
    required: true
  },
  type: { type: String, required: true },
  color: { 
    type: String, 
    required: function() { return this.category === 'clothes' || this.category === 'second_hand'; } 
  },
  size: { 
    type: [String], 
    required: function() { return this.category === 'clothes' || this.category === 'second_hand'; } 
  },
}, {
  timestamps: true,
  collection: "products"
});

productSchema.pre('save', function(next) {
  this.onSale = this.discount > 0;
  this.discountedPrice = this.getDiscountedPrice();
  next();
});

productSchema.methods.getDiscountedPrice = function() {
  if (this.discount > 0) {
    return this.price * (1 - this.discount / 100);
  }
  return this.price;
};

export default mongoose.model("Product", productSchema);