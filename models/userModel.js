import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import {
  throwError,
  throwMissingFieldsError,
} from "../middlewares/errorHandling.js";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// static login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throwMissingFieldsError(["email", "password"], { email, password });
  }

  const user = await this.findOne({ email });

  if (!user) {
    throwError(401, "Invalid login credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throwError(401, "Invalid login credentials");
  }

  return user;
};

// static register
userSchema.statics.register = async function (email, password) {
  if (!email || !password) {
    throwMissingFieldsError(["email", "password"], { email, password });
  }
  if (!validator.isEmail(email)) {
    throwError(400, "Please provide an email address");
  }
  if (!validator.isStrongPassword(password)) {
    throwError(400, "Please provide a strong password");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throwError(409, "This email is already in use");
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

export const User = mongoose.model("User", userSchema);
