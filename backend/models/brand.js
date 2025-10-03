import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "Essence"
  logo: { type: String }, // optional - brand logo url
  country: { type: String }, // optional
  createdAt: { type: Date, default: Date.now }
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand ;