import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

const router = express.Router();

// /login
router.post("/login", userLogin);

// /register
router.post("/register", userRegister);

export default router;
