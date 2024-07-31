import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  totalPrice: { type: Number, required: true, default: 0 },
  discountedPrice: { type: Number },
  shippingCost: { type: Number, required: true, default: 0 },
  totalQuantity: { type: Number, required: true, default: 0 },
}, {
  timestamps: true,
  collection: "carts"
});

export default mongoose.model("Cart", cartSchema);