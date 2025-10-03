import express from "express";
import Product from "../models/product.js";
import Category from "../models/category.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Products (with populated references)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("tags")
      .populate("brand");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




export default router;
