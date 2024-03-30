import express from "express";
import {
  createProductCollection,
  getAllProductCollection,
  getProductCollectionById,
  updateProductCollectionById,
  deleteProductCollectionById,
} from "../controllers/productCollectionController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

// /productCollections
router.post("/", authenticate, createProductCollection);

router.get("/:id", authenticate, getProductCollectionById);
router.get("/", authenticate, getAllProductCollection);

router.put("/:id", authenticate, updateProductCollectionById);

router.delete("/:id", authenticate, deleteProductCollectionById);

export default router;
