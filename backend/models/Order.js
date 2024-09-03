import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  status: { 
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
    required: true
  },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true }
}, {
  timestamps: true,
  collection: "orders"
});

export default mongoose.model("Order", orderSchema);