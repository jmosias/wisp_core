import express from "express";
import {
  createProductCollection,
  getAllProductCollection,
  getProductCollectionById,
  updateProductCollectionById,
  deleteProductCollectionById,
} from "../controllers/productCollectionController.js";

const router = express.Router();

// /api/productCollections
router.post("/", createProductCollection);
router.get("/", getAllProductCollection);
router.get("/:id", getProductCollectionById);
router.put("/:id", updateProductCollectionById);
router.delete("/:id", deleteProductCollectionById);

export default router;
