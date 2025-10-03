import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/register.js";
import tagRoutes from "./routes/tagRoutes.js";
import brandRoute from "./routes/brand.js";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";
import addressesRoute from "./routes/address.js";
import OrderRoute from "./routes/order.js";
import adminRoute from "./routes/admin.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Normal middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS config
app.use(
  cors({
    origin: "https://hyper-market-topaz.vercel.app", // your React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Mount normal routes
app.use("/api/auth", authRoute);
app.use("/api/tag", tagRoutes);
app.use("/api/brand", brandRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/addresses", addressesRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/admin", adminRoute);



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failure to connect Database:", error);
  });
