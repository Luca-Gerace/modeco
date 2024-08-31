import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true }
}, {
  timestamps: true,
  collection: "licenses"
});

export default mongoose.model("License", licenseSchema);