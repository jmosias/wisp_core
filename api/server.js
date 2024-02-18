import "dotenv/config.js";
import express from "express";
import { connectDB } from "../config/mongoose.js";

const PORT = process.env.PORT;

const app = express();

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
