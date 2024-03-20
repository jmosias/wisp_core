import express from "express";
import {
  createProductTemplate,
  getAllProductTemplate,
  getProductTemplateById,
  updateProductTemplateById,
  deleteProductTemplateById,
} from "../controllers/productTemplateController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

// /productTemplates
router.post("/", authenticate, createProductTemplate);
router.get("/", authenticate, getAllProductTemplate);
router.get("/:id", authenticate, getProductTemplateById);
router.put("/:id", authenticate, updateProductTemplateById);
router.delete("/:id", authenticate, deleteProductTemplateById);

export default router;
