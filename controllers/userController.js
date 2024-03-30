import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "30d" });
};

// POST > Login
export const userLogin = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    response.cookie("jwt", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 60 * 1000, // 30 days
    });

    response.status(200).json({ message: "Login Successful" });
  } catch (error) {
    next(error);
  }
};

// POST > Register
export const userRegister = async (request, response, next) => {
  const { email, password, organizationName } = request.body;

  try {
    await User.register(email, password, organizationName);
    response.status(201).json({ message: "Registered Successfully" });
  } catch (error) {
    next(error);
  }
};

// POST > Logout
export const userLogout = async (request, response, next) => {
  try {
    await response.cookie("jwt", "", { maxAge: 0 });
    response.send({ message: "Logout Successful" });
  } catch (error) {
    next(error);
  }
};

// GET > Get the user info of the logged in user
export const getUserInfo = async (request, response, next) => {
  try {
    const user = await User.findOne({ _id: request.user._id });
    // remove the password
    const { password, ...userInfo } = await user.toJSON();

    response.send({ userInfo });
  } catch (error) {
    next(error);
  }
};
