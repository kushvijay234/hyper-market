import mongoose from "mongoose";

const dimensionSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String },

  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },

  price: { type: Number, required: true },
  discount: { type: Number },
  rating: { type: Number },
  stock: { type: Number, required: true },
  sku: { type: String, unique: true },
  weight: { type: Number },
  dimensions: dimensionSchema,
  availabilityStatus: { type: String, enum: ["In Stock", "Out of Stock", "Preorder"], default: "In Stock" },
  images: [{ type: String }],
  thumbnail: { type: String }
});

export default mongoose.model("Product", productSchema);
