import express from "express";
import {
  getUserInfo,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

// /login
router.post("/login", userLogin);

// /register
router.post("/register", userRegister);

// /logout
router.post("/logout", userLogout);

// /info
router.get("/info", authenticate, getUserInfo);

export default router;
