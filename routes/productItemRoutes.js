import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  createProductItem,
  getAllProductItem,
  getProductItemById,
  updateProductItemById,
  deleteProductItemById,
} from "../controllers/productItemController.js";

const router = express.Router();

// /productItems
router.post("/", authenticate, createProductItem);
router.get("/", authenticate, getAllProductItem);
router.get("/:id", authenticate, getProductItemById);
router.put("/:id", authenticate, updateProductItemById);
router.delete("/:id", authenticate, deleteProductItemById);

export default router;
