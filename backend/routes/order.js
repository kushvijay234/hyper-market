import express from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { verifyToken } from "../utils/jwt.js";
import Stripe from "stripe";

const router = express.Router();
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn("STRIPE_SECRET_KEY is not set. Payments will not work.");
}

// GET order for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.user.id });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create Payment Intent
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  const { products } = req.body;
  console.log("Create Payment Intent Body:", JSON.stringify(req.body, null, 2));

  try {
    let totalAmount = 0;
    // Calculate price from DB to ensure security
    for (const item of products) {
      // item should have productId and quantity
      // Assuming item.productId is the ID. Checkout.jsx sends { productId: ..., quantity: ... }
      const pId = (item.productId || item.id)?.toString();

      // Validate MongoDB ObjectId format (24 hex chars)
      if (!pId || !pId.match(/^[0-9a-fA-F]{24}$/)) {
        console.warn(`Skipping invalid product ID: ${pId}`);
        continue;
      }

      const product = await Product.findById(pId);
      if (product) {
        console.log(`Found product: ${product.name}, Price: ${product.price}`);
        totalAmount += product.price * item.quantity;
      } else {
        console.warn(`Product not found in DB: ${pId}`);
      }
    }

    // Fallback if totalAmount is 0 (e.g. products not found)
    if (totalAmount === 0) {
      return res.status(400).json({ error: "Invalid order amount. No valid products found. Please clear your cart and add items again." });
    }

    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured on the server." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // cents
      currency: "usd",
      metadata: { userId: req.user.id },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create order (protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { ordernumber, products, totalAmount, paymentMethod, address } = req.body;
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
