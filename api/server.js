import "dotenv/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "../config/mongoose.js";
import { handleError } from "../middlewares/errorHandling.js";
import productCollectionRoutes from "../routes/productCollectionRoutes.js";
import productTemplateRoutes from "../routes/productTemplateRoutes.js";
import productItemRoutes from "../routes/productItemRoutes.js";
import userRoutes from "../routes/userRoutes.js";

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
app.use("/user", userRoutes);
app.use("/productCollections", productCollectionRoutes);
app.use("/productTemplates", productTemplateRoutes);
app.use("/productItems", productItemRoutes);

// Error Handler
app.use(handleError);

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
