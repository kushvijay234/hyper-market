import express from "express";
import Address from "../models/address.js";
import { verifyToken } from "../utils/jwt.js"; 

const router = express.Router();

// GET addresses for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST or update an address
router.post("/", verifyToken, async (req, res) => {
  try {
    const { type, name, street, city, state, zip } = req.body;

    if (!type || !name) {
      return res.status(400).json({ message: "Type and Name are required" });
    }

    let address = await Address.findOne({ user: req.user.id, type });

    if (address) {
      address.name = name;
      address.street = street;
      address.city = city;
      address.state = state;
      address.zip = zip;
      await address.save();
    } else {
      address = await Address.create({ user: req.user.id, type, name, street, city, state, zip });
    }

    // ✅ Return updated/created address
    return res.status(200).json({ address });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});



export default router;
