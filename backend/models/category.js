import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "beauty"
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;