import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { connectDB } from "../config/mongoose.js";
import productCollectionRoutes from "../routes/productCollectionRoutes.js";

const PORT = process.env.PORT;
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS;

const allowedOriginsArray = CORS_ALLOWED_ORIGINS.split(",").map((item) =>
  item.trim()
);

const app = express();

// Middlewares
app.use(
  cors({
    origin: allowedOriginsArray,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Routes
app.use("/api/productCollections", productCollectionRoutes);

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
