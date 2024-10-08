import { Schema, model } from "mongoose";
import { IUser } from "@_types/types";

const userSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Please enter your nickname."],
      trim: true,
      maxLength: [20, "Your nickname must be between 2 and 20 characters long."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: [6, "Your password must be 6 characters or more."],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user", //or admin
    },
    rf_token: { type: String, select: false },
  },
  { timestamps: true }
);

//Model 생성
export default model<IUser>("user", userSchema);
