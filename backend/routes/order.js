import express from "express";
import Order from "../models/order.js";
import { verifyToken } from "../utils/jwt.js"; // your JWT utils

const router = express.Router();

// GET order for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.user.id });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Create order (protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { ordernumber, products, totalAmount, paymentMethod, address } = req.body;

    // ✅ userId comes from JWT
    const userId = req.user.id;

    if (!products || products.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    if (!address)
      return res.status(400).json({ message: "Shipping address is required" });

    const newOrder = new Order({
      userId,
      ordernumber,
      products,
      totalAmount,
      paymentMethod,
      address,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order saved", order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: "Error saving order", error: err });
  }
});

export default router;
