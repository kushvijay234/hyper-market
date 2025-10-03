import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["billing", "shipping"], required: true },
  name: { type: String, required: true },
  street: String,
  city: String,
  state: String,
  zip: String,
});

export default mongoose.model("Address", addressSchema);
