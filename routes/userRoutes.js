import express from "express";
import {
  getUserInfo,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

// /user
router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/logout", userLogout);
router.get("/info", authenticate, getUserInfo);

export default router;
