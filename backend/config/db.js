import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

 const connectDB = async () => {
  if (!uri) {
    throw new Error("MongoBD URI is not define in .env");
  }

  try {
    await mongoose.connect(uri);
    
    console.log('Connect to Database');
  } catch (error) {
    console.error("Error connect to Database:", error);
  }
};

export default connectDB;