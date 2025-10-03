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
// Parse allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'https://hyper-market-eight.vercel.app'];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Enable credentials (cookies, authorization headers, etc.)
  })
);

// CORS error handler
app.use((err, req, res, next) => {
  if (err.message.includes('CORS')) {
    res.status(403).json({
      error: 'CORS Error',
      message: 'Origin not allowed'
    });
  } else {
    next(err);
  }
});

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
