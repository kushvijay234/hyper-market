import express from "express";
import { verifyToken } from "../utils/jwt.js";
import { isAdmin } from "../middleware/admin.js";
import User from "../models/users.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";

const router = express.Router();

// Get admin dashboard stats
router.get("/stats", verifyToken, isAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Calculate total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin only)
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/admin/users/:id/role - Update user role
router.put('/users/:id/role', verifyToken, isAdmin, async (req, res) => {
  const { role } = req.body;
  if (!['admin', 'customer'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    res.json({ message: 'Role updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});



// Get all orders (admin only)
router.get("/orders", verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put("/orders/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products (admin only)
router.get("/products", verifyToken, isAdmin, async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("tags")
      .populate("brand");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product (admin only)
router.post("/products", verifyToken, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update product (admin only)
router.put("/products/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product (admin only)
router.delete("/products/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
router.get("/categories", verifyToken, isAdmin, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Update category by ID
router.put('/categories/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new category
router.post('/categories', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const newCategory = new Category({
      name: name.trim(),
      description: description?.trim() || '',
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// routes/adminCategory.js
router.delete('/categories/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





export default router;
