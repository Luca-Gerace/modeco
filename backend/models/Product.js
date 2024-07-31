import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  ecoPoints: { type: Number },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  sale: { type: Number, default: 0,  min: 0, max: 100 },
  image: { type: String, required: true },
  category: { 
    type: String,
    enum: ['clothes', 'cosmetics', 'food and beverage', 'second hand'],
    default: 'clothes',
    required: true
  },
  // Proprietà specifiche per 'clothes'
  color: { type: String, required: function() { return this.category === 'clothes' || this.category === 'second hand'; } },
  size: { type: String, required: function() { return this.category === 'clothes' || this.category === 'second hand'; } },
  // Proprietà specifiche per 'cosmetics'
  ingredients: { type: String, required: function() { return this.category === 'cosmetics'; } },
  expirationDate: { type: Date, required: function() { return this.category === 'cosmetics'; } },
  // Proprietà specifiche per 'food and beverage'
  nutritionFacts: { type: String, required: function() { return this.category === 'food and beverage'; } },
  expirationDate: { type: Date, required: function() { return this.category === 'food and beverage'; } }
}, {
  timestamps: true,
  collection: "products"
});

export default mongoose.model("Product", productSchema);