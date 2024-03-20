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
    organizationName: {
      type: String,
      required: true,
    },
    accountStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "active"],
    },
  },
  {
    timestamps: true,
  }
);

// Static Login
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

  if (user.accountStatus !== "active") {
    throwError(
      401,
      "Your account has not been activated yet, please contact an administrator"
    );
  }

  return user;
};

// Static Register
userSchema.statics.register = async function (
  email,
  password,
  organizationName
) {
  if (!email || !password || !organizationName) {
    throwMissingFieldsError(["email", "password", "organizationName"], {
      email,
      password,
      organizationName,
    });
  }
  if (!validator.isEmail(email)) {
    throwError(400, "Please provide an email address");
  }
  if (
    !validator.isStrongPassword(password, {
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })
  ) {
    throwError(400, "Please provide a stronger password");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throwError(409, "This email is already in use");
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, organizationName });

  return user;
};

export const User = mongoose.model("User", userSchema);
