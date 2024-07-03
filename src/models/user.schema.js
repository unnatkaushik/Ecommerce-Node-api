import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Required"],
      minLength: [3, "Provide name with 3 char"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Required"],
      minLength: [6, "Enter at least 6 char"],
    },
    email: {
      type: String,
      required: [true, "Required"],
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      emun: ["admin", "user"],
    },
    forgetPasswordToken: String,
    forgetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("called");
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.IsComparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = model("User", userSchema);
