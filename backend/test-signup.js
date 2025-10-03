// Test script to verify signup functionality
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/users.js";
import bcrypt from "bcrypt";
import { generateToken } from "./utils/jwt.js";

dotenv.config();

const testSignup = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("✅ Database connected");

    // Test user data
    const testUser = {
      username: "testuser",
      name: "Test User",
      email: "test@example.com",
      password: "TestPass123!",
      role: "customer"
    };

    // Check if user already exists
    const exists = await User.findOne({ email: testUser.email });
    if (exists) {
      console.log("⚠️  User already exists, deleting...");
      await User.deleteOne({ email: testUser.email });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    console.log("✅ Password hashed");

    // Create user
    const user = new User({
      username: testUser.username,
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword,
      role: testUser.role,
    });

    await user.save();
    console.log("✅ User created successfully");

    // Generate token
    const token = generateToken(user);
    console.log("✅ Token generated");

    console.log("🎉 Signup test completed successfully!");
    console.log("User ID:", user._id);
    console.log("Token:", token.substring(0, 20) + "...");

    // Clean up
    await User.deleteOne({ email: testUser.email });
    console.log("✅ Test user cleaned up");

  } catch (error) {
    console.error("❌ Signup test failed:", error.message);
    console.error("Full error:", error);
  }
};

testSignup();


