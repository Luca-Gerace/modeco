import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
}, {
  _id: false
});

const postSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: authorSchema, required: true },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
  collection: "posts"
});

export default mongoose.model("Post", postSchema);