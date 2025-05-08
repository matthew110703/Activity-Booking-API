import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\d{10}$/, // Matches a 10-digit phone number
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

export type UserType = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};
export type UserDocument = mongoose.Document & UserType;
