import express from "express";
import {
  getUserInfo,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";

const router = express.Router();

// /login
router.post("/login", userLogin);

// /register
router.post("/register", userRegister);

// /info
router.get("/info", getUserInfo);

// /logout
router.post("/logout", userLogout);

export default router;
