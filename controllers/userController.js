import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "30d" });
};

// POST login
export const userLogin = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    response.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 60 * 1000, // 30 days
    });

    response.status(200).json({ message: "Login Successful" });
  } catch (error) {
    return response.status(400).json({ message: error.message });
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
    return response.status(400).json({ message: error.message });
  }
};

// GET info
export const getUserInfo = async (request, response) => {
  try {
    const tokenCookie = request.cookies["jwt"];
    const claims = jwt.verify(tokenCookie, process.env.SECRET_TOKEN);

    if (!claims) {
      return response.status(401).send({
        message: "Unauthenticated",
      });
    }

    const user = await User.findOne({ _id: claims._id });

    // removes the password first
    const { password, ...userInfo } = await user.toJSON();

    response.send({ userInfo });
  } catch (error) {
    return response.status(401).send({
      message: "Unauthenticated",
    });
  }
};

// POST logout
export const userLogout = async (request, response) => {
  response.cookie("jwt", "", { maxAge: 0 });

  response.send({ message: "Logout Successful" });
};
