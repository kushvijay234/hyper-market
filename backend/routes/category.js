import express from "express";
import Category from "../models/category.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

// Create Category
router.post("/", isAdmin, verifyToken, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json("Category Create Successfully");
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});





export default router;
