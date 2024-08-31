import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true }
}, {
  timestamps: true,
  collection: "brands"
});

export default mongoose.model("Brand", brandSchema);