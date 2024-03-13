import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "1d" });
};

// POST login
export const userLogin = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    response.status(200).json({ email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// POST register
export const userRegister = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.register(email, password);
    const token = createToken(user._id);
    response.status(201).json({ email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};
