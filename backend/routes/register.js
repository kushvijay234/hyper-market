import { Router } from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import { validateUserInput, validateSignin } from "../middleware/auth.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken, verifyToken } from '../utils/jwt.js'
import { OAuth2Client } from 'google-auth-library';

const router = Router();

router.post("/signup", validateUserInput, async (req, res) => {
  const { email } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "user already exists" });
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    await user.save();
    try {
      await sendEmail(
        email,
        "Welcome to Our App 🎉",
        `Hello,\n\nYour account has been created successfully.\n\nThank you for registering!`
      );
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr.message);
    }

    // generate JWT token
    const token = generateToken(user);

    return res.status(201).json({
      message: "User signed up successfully and Email sent",
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signin", validateSignin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not registered" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(200).json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    res.json({ message: "Profile fetched successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


let client;
if (process.env.GOOGLE_CLIENT_ID) {
  client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
} else {
  console.warn("GOOGLE_CLIENT_ID is not set. Google Auth will not work.");
}

router.post("/google", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        username: name,
        name: name,
        email,
        googleId: sub,
        profileImage: picture,
        role: "customer", // Default role
      });
      await user.save();
    } else if (!user.googleId) {
      // Link existing account
      user.googleId = sub;
      if (!user.profileImage) user.profileImage = picture;
      await user.save();
    }

    const appToken = generateToken(user);

    res.status(200).json({
      message: "Google Signin successful",
      token: appToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ error: "Google Signin failed" });
  }
});

export default router;
