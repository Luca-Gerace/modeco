import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  website: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
}, {
  timestamps: true,
  collection: "brands"
});

export default mongoose.model("Brand", brandSchema);