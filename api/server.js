import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { connectDB } from "../config/mongoose.js";
import productCollectionRoutes from "../routes/productCollectionRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS;

const allowedOriginsArray = CORS_ALLOWED_ORIGINS.split(",").map((item) =>
  item.trim()
);

const app = express();

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOriginsArray,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/productCollections", productCollectionRoutes);
app.use("/user", userRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
