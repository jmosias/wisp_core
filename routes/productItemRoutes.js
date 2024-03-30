import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  createProductItem,
  getAllProductItem,
  getProductItemById,
  updateProductItemById,
  deleteProductItemById,
  updateProductItems,
} from "../controllers/productItemController.js";

const router = express.Router();

// /productItems
router.post("/", authenticate, createProductItem);

router.get("/:id", authenticate, getProductItemById);
router.get("/", authenticate, getAllProductItem);

router.put("/:id", authenticate, updateProductItemById);
router.put("/", authenticate, updateProductItems);

router.delete("/:id", authenticate, deleteProductItemById);

export default router;
